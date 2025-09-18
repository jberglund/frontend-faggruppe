# Web Performance for Beginners 🚀

A simple demonstration that shows the difference between fast and slow websites. Perfect for learning the basics of web performance!

## What You'll Learn

- Why some websites feel slow vs fast
- How CSS and JavaScript can block your page
- Font loading strategies (FOIT vs FOUT)
- Variable font performance with real 700KB+ files
- Simple fixes that make a huge difference
- How to use browser tools to see performance

## Quick Start

1. **Install Bun** (if you don't have it):

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Start the simple server**:

   ```bash
   bun run simple-server.ts
   ```

3. **Open your browser** and visit:
   - 🐌 **Slow page**: http://localhost:3001/simple-bad
   - ⚡ **Fast page**: http://localhost:3001/simple-good
   - ❓ **Help**: http://localhost:3001/help

## What to Do

1. **Open Developer Tools** (Press F12 or right-click → Inspect)
2. **Go to the Network tab**
3. **Visit the slow page** - notice how nothing shows until everything loads
4. **Visit the fast page** - see how content appears immediately
5. **Compare the timing** in the Network tab

## The Big Differences (Simple Version)

### 🐌 Slow Page Problems

- **CSS in the head** → Blocks everything until it loads
- **JavaScript in the head** → Also blocks everything
- **Bad font loading** → Text is invisible while variable fonts download (FOIT)
- **No font preloading** → Large 500KB+ variable fonts load without hints
- **No caching** → Downloads 700KB+ of fonts every time

### ⚡ Fast Page Solutions

- **CSS loads smarter** → Page can start showing while CSS loads
- **JavaScript at the bottom** → Doesn't block the page
- **Better font loading** → Shows fallback text immediately, then swaps to variable fonts (FOUT)
- **Font preloading** → Critical variable fonts start downloading immediately
- **Proper caching** → Variable fonts cached for 1 year with `immutable`

## What You'll See in Developer Tools

### Network Tab Differences

- **Slow page**: Long bars including ~700KB fonts, nothing shows until all bars finish
- **Fast page**: Fonts preloaded, content shows with fallbacks before custom fonts finish

### Visual Differences

- **Slow page**: Invisible text (FOIT), then sudden font appearance
- **Fast page**: Readable fallback text immediately, then smooth font swap (FOUT)

## The 5 Key Lessons

### 1. 📄 CSS Placement Matters

```html
<!-- BAD: Blocks everything -->
<head>
  <link rel="stylesheet" href="styles.css" />
</head>

<!-- GOOD: Tells browser what's important -->
<head>
  <link rel="preload" href="styles.css" as="style" />
  <link rel="stylesheet" href="styles.css" />
</head>
```

### 2. ⚙️ JavaScript Should Load Later

```html
<!-- BAD: Blocks the page -->
<head>
  <script src="app.js"></script>
</head>

<!-- GOOD: Loads after content -->
<body>
  <!-- content here -->
  <script defer src="app.js"></script>
</body>
```

### 3. 🔤 Font Loading Strategy

```html
<!-- BAD: Invisible text while loading -->
<link href="fonts.css?display=block" rel="stylesheet" />

<!-- GOOD: Shows fallback text first -->
<link href="fonts.css?display=swap" rel="stylesheet" />
```

### 4. 🔤 Variable Font Loading

```html
<!-- BAD: No preload, no font-display, no fallbacks -->
@font-face { font-family: "Inter Variable"; src: url("Inter-Variable.ttf"); }

<!-- GOOD: Preload + swap + fallbacks -->
<link rel="preload" href="Inter-Variable.ttf" as="font" crossorigin />
@font-face { font-family: "Inter Variable"; src: url("Inter-Variable.ttf");
font-display: swap; } body { font-family: "Inter Variable", system-ui,
sans-serif; }
```

### 5. 💾 Caching Headers

```javascript
// BAD: No caching
"Cache-Control": "no-cache"

// GOOD: Cache static files
"Cache-Control": "public, max-age=31536000"
```

## Try This Yourself

1. **Compare loading times**: Use the Network tab's timing
2. **Throttle your connection**: DevTools → Network → Slow 3G
3. **Watch the waterfall**: See how resources load in sequence
4. **Check the timeline**: Notice when content first appears
5. **Monitor font swaps**: Look for FOIT vs FOUT behavior
6. **Check font file sizes**: Notice the ~700KB of variable fonts

## Next Steps

Once you understand these basics:

- Learn about Core Web Vitals (LCP, FID, CLS)
- Explore image optimization
- Study critical CSS techniques
- Learn about service workers and advanced caching

## Common Beginner Questions

**Q: Why does the slow page show nothing at first?**
A: CSS and JavaScript in the `<head>` tell the browser "don't show anything until I'm ready!" Plus fonts without `font-display: swap` hide text until they load.

**Q: How much difference does this really make?**
A: On slow connections, the difference can be 3-5 seconds of invisible text vs immediate readable content!

**Q: Is the fast page actually loading faster?**
A: The total time might be similar, but users see readable text immediately instead of waiting for 700KB of fonts.

**Q: What's the most important font fix?**
A: Using `font-display: swap` with proper fallback fonts - shows text immediately then enhances with custom fonts!

**Q: Why use variable fonts if they're so large?**
A: Variable fonts replace multiple font files and give design flexibility. With proper loading strategy, they enhance rather than block the experience.

## File Structure

```
performance/
├── simple-server.ts           # Easy-to-understand server
├── simple-bad-practices.ts    # Examples of what NOT to do
├── simple-good-practices.ts   # Examples of what TO do
└── BEGINNER-README.md         # This file
```

## Advanced Version

Ready for more complex examples? Check out:

- `server.ts` - Full-featured server with monitoring
- `good-practices.ts` - Advanced optimization techniques
- `bad-practices.ts` - More complex performance issues

---

**Remember**: Web performance isn't about making your code perfect - it's about making your users happy! 😊
