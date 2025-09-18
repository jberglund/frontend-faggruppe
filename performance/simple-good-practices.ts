// SIMPLE GOOD PRACTICES - Easy to understand performance solutions
// This file shows how to fix common performance issues in simple terms

export function serveSimpleGoodPage() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fast Website - Good Practices</title>

  <!-- GOOD: Tell the browser what's important -->
  <link rel="preload" href="/css/styles.css" as="style">

  <!-- GOOD: Load CSS normally (it's critical for layout) -->
  <link rel="stylesheet" href="/css/styles.css">

  <!-- GOOD: Better font loading - shows fallback text first -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">

  <style>
    body {
      /* GOOD: Fallback font shows immediately */
      font-family: 'Roboto', Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .header {
      background: linear-gradient(45deg, #27ae60, #2ecc71);
      color: white;
      padding: 40px;
      text-align: center;
      border-radius: 10px;
    }

    .content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <!-- This content shows immediately! -->
  <div class="header">
    <h1>This Website Loads Quickly ⚡</h1>
    <p>Content appears right away, JavaScript loads in the background</p>
  </div>

  <div class="content">
    <div class="card">
      <h3>Solution 1: Smart CSS Loading</h3>
      <p>We preload important CSS and let the page render while other resources load.</p>
    </div>

    <div class="card">
      <h3>Solution 2: JavaScript at the Bottom</h3>
      <p>JavaScript loads after the content, so it doesn't block the page from showing.</p>
    </div>

    <div class="card">
      <h3>Solution 3: Better Font Loading</h3>
      <p>Text shows immediately with a fallback font, then swaps to the custom font.</p>
    </div>

    <div class="card">
      <h3>Solution 4: Proper Caching</h3>
      <p>Files are cached so they don't need to download again on repeat visits.</p>
    </div>
  </div>

  <footer style="text-align: center; margin-top: 40px;">
    <p>Notice how much faster this feels! 🚀</p>
    <p><a href="/simple-bad">Compare with slow version</a></p>
  </footer>

  <!-- GOOD: JavaScript loads after content -->
  <script defer src="/js/app.js"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      // GOOD: Cache the HTML for faster repeat visits
      "Cache-Control": "public, max-age=300", // 5 minutes
    },
  });
}

// Serve CSS with better caching (but still show the difference in timing)
export async function serveFastCSS() {
  // Still add some delay, but shorter
  await new Promise(resolve => setTimeout(resolve, 500));

  const css = `
/* This CSS loads faster and is cached */
/* The page can start showing content while this loads */

body {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.card:hover {
  transform: translateY(-5px);
  transition: transform 0.2s ease;
}

/* Optimized styles load efficiently */
.extra-styles {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}
`;

  return new Response(css, {
    headers: {
      "Content-Type": "text/css",
      // GOOD: Cache CSS files for 1 year
      "Cache-Control": "public, max-age=31536000",
    },
  });
}

// Serve JavaScript that doesn't block the page
export async function serveFastJS() {
  // Shorter delay since it doesn't block rendering
  await new Promise(resolve => setTimeout(resolve, 800));

  const js = `
// This JavaScript loads in the background
// It doesn't block the page from showing content!
console.log("JavaScript loaded without blocking the page!");

// Since we use 'defer', this runs after the DOM is ready
console.log("Page content is already visible to users");

// Add interactivity after page is shown
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', function() {
    const title = this.querySelector('h3').textContent;
    alert('Card clicked: ' + title);
  });
});

// Show that the page is interactive
console.log("All functionality is now ready!");
`;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript",
      // GOOD: Cache JavaScript files for 1 year
      "Cache-Control": "public, max-age=31536000",
    },
  });
}
