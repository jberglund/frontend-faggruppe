import { serve } from "bun";
import { compressContent } from "./utils/compress-content";

const server = serve({
  port: 3001,
  routes: {
    "/": async () => {
      const file = Bun.file("src/bad.html");
      return new Response(file);
    },

    "/bad": async () => {
      const file = Bun.file("src/bad.html");
      return new Response(file);
    },

    "/good": async () => {
      const file = Bun.file("src/good.html");
      return new Response(file);
    },

    // CSS
    "/styles.css": async (request) => {
      const file = Bun.file("src/styles.css");
      const [compressed, headers] = await compressContent(file, request);
      await new Promise((resolve) => setTimeout(resolve, 250));
      return new Response(compressed, {
        headers: {
          ...headers,
          "Cache-Control": "public, max-age=31536000",
        },
      });
    },

    // JavaScript
    "/app.js": async (request) => {
      const file = Bun.file("src/app.js");
      const [compressed, headers] = await compressContent(file, request);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return new Response(compressed, {
        headers: {
          ...headers,
          "Cache-Control": "public, max-age=31536000",
        },
      });
    },

    // Font files
    "/assets/fonts/*.ttf": async (request) => {
      const url = new URL(request.url);
      const filename = url.pathname.split("/").pop();

      const file = Bun.file(`src/assets/fonts/${filename}`);
      const [compressed, headers] = await compressContent(file, request);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      return new Response(compressed, {
        headers: {
          ...headers,
          "Cache-Control": "public, max-age=31536000, immutable",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },

    // Original images (large JPEG files)
    "/assets/images/original/*.jpg": async (request) => {
      const url = new URL(request.url);
      const filename = url.pathname.split("/").pop();
      const file = Bun.file(`src/assets/images/original/${filename}`);

      // Simulate slower loading for large images
      await new Promise((resolve) => setTimeout(resolve, 800));
      return new Response(file);
    },

    // Optimized images (WebP format)
    "/assets/images/optimized/*.webp": async (request) => {
      const url = new URL(request.url);
      const filename = url.pathname.split("/").pop();
      const file = Bun.file(`src/assets/images/optimized/${filename}`);

      await new Promise((resolve) => setTimeout(resolve, 200));
      return new Response(file, {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    },

    // Optimized images (AVIF format)
    "/assets/images/optimized/*.avif": async (request) => {
      const url = new URL(request.url);
      const filename = url.pathname.split("/").pop();
      const file = Bun.file(`src/assets/images/optimized/${filename}`);

      await new Promise((resolve) => setTimeout(resolve, 150));
      return new Response(file, {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    },
  },

  // Fallback for unmatched routes
  fetch(req) {
    const path = new URL(req.url).pathname;
    console.log(`❌ Route not found: ${path}`);
    return new Response("Page not found", { status: 404 });
  },
});

console.log("🚀 Server started on http://localhost:3001");
