// Simple Performance Exercise Server - For Beginners
// This server serves static HTML, CSS, and JS files to demonstrate web performance

const server = Bun.serve({
  port: 3001,

  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    console.log(`📥 Request: ${path}`);

    // Route to different pages and resources
    if (path === "/" || path === "/bad" || path === "/bad.html") {
      console.log("🐌 Serving SLOW page (bad.html)");
      return await serveStaticFile("src/bad.html", "text/html", false);
    } else if (path === "/good" || path === "/good.html") {
      console.log("⚡ Serving FAST page (good.html)");
      return await serveStaticFile("src/good.html", "text/html", true);
    } else if (path.startsWith("/assets/") && path.endsWith(".ttf")) {
      const referer = request.headers.get("Referer") || "";
      const isGoodPractices = referer.includes("good");

      if (isGoodPractices) {
        console.log("🔤 Serving FONT (FAST - with aggressive caching)");
        // Simulate minimal delay for good practices
        await new Promise((resolve) => setTimeout(resolve, 300));
        return await serveStaticFile(`src${path}`, "font/ttf", true, true);
      } else {
        console.log("🔤 Serving FONT (SLOW - no caching, longer delay)");
        // Simulate longer delay for bad practices + no caching
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return await serveStaticFile(`src${path}`, "font/ttf", false, true);
      }
    } else if (path === "/styles.css") {
      const referer = request.headers.get("Referer") || "";
      const isGoodPractices = referer.includes("good");

      if (isGoodPractices) {
        console.log("📄 Serving CSS (FAST - with caching)");
        // Simulate shorter delay for good practices
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await serveStaticFile("src/styles.css", "text/css", true);
      } else {
        console.log("📄 Serving CSS (SLOW - no caching, longer delay)");
        // Simulate longer delay for bad practices
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return await serveStaticFile("src/styles.css", "text/css", false);
      }
    } else if (path === "/app.js") {
      const referer = request.headers.get("Referer") || "";
      const isGoodPractices = referer.includes("good");

      if (isGoodPractices) {
        console.log("⚙️ Serving JS (FAST - with caching)");
        // Simulate shorter delay for good practices
        await new Promise((resolve) => setTimeout(resolve, 800));
        return await serveStaticFile(
          "src/app.js",
          "application/javascript",
          true,
        );
      } else {
        console.log("⚙️ Serving JS (SLOW - no caching, longer delay)");
        // Simulate longer delay for bad practices
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return await serveStaticFile(
          "src/app.js",
          "application/javascript",
          false,
        );
      }
    } else {
      return new Response("Page not found", { status: 404 });
    }
  },
});

// Helper function to serve static files
async function serveStaticFile(
  filePath: string,
  contentType: string,
  useCache: boolean,
  isFont: boolean = false,
) {
  try {
    const file = Bun.file(filePath);
    const content = isFont ? await file.arrayBuffer() : await file.text();

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Content-Encoding": "gzip",
    };

    if (useCache) {
      // GOOD: Proper caching for better performance
      if (contentType === "text/html") {
        headers["Cache-Control"] = "public, max-age=300"; // 5 minutes for HTML
      } else if (isFont) {
        headers["Cache-Control"] = "public, max-age=31536000, immutable"; // 1 year for fonts
        headers["Access-Control-Allow-Origin"] = "*"; // Allow cross-origin font loading
      } else {
        headers["Cache-Control"] = "public, max-age=31536000"; // 1 year for CSS/JS
      }
    } else {
      // BAD: No caching - files download every time
      headers["Cache-Control"] = "no-cache";
      if (isFont) {
        headers["Access-Control-Allow-Origin"] = "*"; // Still need CORS for fonts
      }
    }

    return new Response(Bun.gzipSync(content, { level: 6 }), { headers });
    // return new Response(content, { headers });
  } catch (error) {
    console.error(`Error serving ${filePath}:`, error);
    return new Response("File not found", { status: 404 });
  }
}

console.log("🚀 Simple Performance Exercise Server Started!");
console.log("");
console.log("📁 Serving static files from the /src folder");
console.log("");
console.log("🐌 Slow page (bad practices):  http://localhost:3001/bad");
console.log("⚡ Fast page (good practices): http://localhost:3001/good");
console.log("❓ Help and instructions:      http://localhost:3001/help");
console.log("");
console.log("💡 Open Developer Tools → Network tab to see the difference!");
console.log("");
console.log("🎯 Key things to compare:");
console.log("   • Time to first content");
console.log("   • Resource loading waterfall");
console.log("   • Caching behavior on refresh");
console.log("   • Font loading strategy (FOIT vs FOUT)");
console.log("   • Variable font file sizes (~700KB total)");
