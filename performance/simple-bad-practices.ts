// SIMPLE BAD PRACTICES - Easy to understand performance mistakes
// This file shows the most common web performance issues in simple terms

export function serveSimpleBadPage() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slow Website - Bad Practices</title>

  <!-- BAD: CSS blocks the page from showing anything -->
  <link rel="stylesheet" href="/css/styles.css">

  <!-- BAD: JavaScript blocks the page from loading -->
  <script src="/js/app.js"></script>

  <!-- BAD: Font loading makes text invisible at first -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=block" rel="stylesheet">

  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .header {
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
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
  <!-- This content won't show until ALL CSS and JS loads -->
  <div class="header">
    <h1>This Website Loads Slowly</h1>
    <p>Everything is blocked until CSS and JavaScript finish downloading</p>
  </div>

  <div class="content">
    <div class="card">
      <h3>Problem 1: Blocking CSS</h3>
      <p>The CSS file in the head stops the browser from showing anything until it downloads completely.</p>
    </div>

    <div class="card">
      <h3>Problem 2: Blocking JavaScript</h3>
      <p>The JavaScript file also blocks rendering, even though we don't need it right away.</p>
    </div>

    <div class="card">
      <h3>Problem 3: Bad Font Loading</h3>
      <p>The font makes all text invisible until it loads (Flash of Invisible Text).</p>
    </div>

    <div class="card">
      <h3>Problem 4: No Caching</h3>
      <p>Every time you refresh, everything downloads again because there's no caching.</p>
    </div>
  </div>

  <footer style="text-align: center; margin-top: 40px;">
    <p>Open DevTools → Network tab to see the problems!</p>
    <p><a href="/simple-good">See the fast version →</a></p>
  </footer>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      // BAD: No caching means slower repeat visits
      "Cache-Control": "no-cache",
    },
  });
}

// Serve CSS with intentional slowness to demonstrate the problem
export async function serveSlowCSS() {
  // Make it slow so you can see the blocking effect
  await new Promise(resolve => setTimeout(resolve, 2000));

  const css = `
/* This CSS takes 2 seconds to load */
/* While it loads, the page shows nothing (white screen) */

body {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.card:hover {
  transform: translateY(-5px);
  transition: transform 0.2s ease;
}

/* More CSS to make the file bigger */
.extra-styles {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}
`;

  return new Response(css, {
    headers: {
      "Content-Type": "text/css",
      // BAD: No caching
      "Cache-Control": "no-cache",
    },
  });
}

// Serve JavaScript with intentional slowness
export async function serveSlowJS() {
  // Make it slow to show blocking
  await new Promise(resolve => setTimeout(resolve, 1500));

  const js = `
// This JavaScript takes 1.5 seconds to load
// It blocks the page even though we don't need it immediately
console.log("JavaScript finally loaded after blocking the page!");

// Simple functionality that could be loaded later
document.addEventListener('DOMContentLoaded', function() {
  console.log("Page is ready");

  // Add some interactivity
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      alert('Card clicked: ' + this.querySelector('h3').textContent);
    });
  });
});

// Fake some processing to make the file bigger
for(let i = 0; i < 1000; i++) {
  // Simulation of larger JavaScript bundle
}
`;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript",
      // BAD: No caching
      "Cache-Control": "no-cache",
    },
  });
}
