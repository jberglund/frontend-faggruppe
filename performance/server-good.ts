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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
  },

  // Fallback for unmatched routes
  fetch(req) {
    const path = new URL(req.url).pathname;
    console.log(`❌ Route not found: ${path}`);
    return new Response("Page not found", { status: 404 });
  },
});

console.log("🚀 Server started on http://localhost:3001");
