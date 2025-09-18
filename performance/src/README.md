# Static Files Version - Web Performance for Beginners 📁

This folder contains the simplified version of the performance exercise using plain HTML, CSS, and JavaScript files. Perfect for beginners who want to understand the basics without complex server logic!

## Files Overview

```
src/
├── bad.html      # Slow website with performance issues
├── good.html     # Fast website with optimizations
├── styles.css    # Shared CSS file (same for both pages)
├── app.js        # Shared JavaScript file (same for both pages)
└── README.md     # This file
```

## Key Learning Points

### 🐌 bad.html - What NOT to do:

- **CSS in head**: Blocks rendering until CSS loads
- **JavaScript in head**: Blocks the entire page
- **Bad font loading**: No `font-display: swap`, causes Flash of Invisible Text (FOIT)
- **No font preloading**: Large variable fonts (~700KB) load without hints
- **No fallback fonts**: Text invisible until custom fonts load
- **No caching**: Font files re-download every time

### ⚡ good.html - What TO do:

- **Preload critical fonts**: `<link rel="preload" as="font">` starts download immediately
- **Font-display swap**: Shows fallback text first, then swaps to custom font
- **Proper fallback stack**: System fonts display while variable fonts load
- **Aggressive font caching**: Variable fonts cached for 1 year with `immutable`
- **JavaScript with defer**: Loads after content
- **Same CSS/JS files**: But loaded with better strategy

## How to Run

### Option 1: Simple Server (Recommended)

```bash
bun run simple
```

Then visit:

- http://localhost:3001/bad (slow version)
- http://localhost:3001/good (fast version)

### Option 2: Any Web Server

Since these are static files, you can use any web server:

```bash
# Python
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# Or just open the HTML files directly in your browser
```

## What You'll Observe

### In the Network Tab:

1. **bad.html**: Long waterfall, nothing renders until CSS/JS/fonts finish
2. **good.html**: Content appears immediately, fonts enhance progressively
3. **Font loading**: Notice ~700KB of variable fonts and caching behavior
4. **Timeline**: Text visibility vs font swap timing

### Visually:

1. **bad.html**: Invisible text (FOIT) → sudden font appearance
2. **good.html**: Fallback text immediately → smooth font swap (FOUT)
3. **Font behavior**: System fonts → variable fonts seamlessly
4. **Performance**: Content readable throughout loading process

## The Magic is in Font Loading Strategy

### Bad Font Loading:

```html
<!-- No preload hints -->
<style>
  @font-face {
    font-family: "Inter Variable";
    src: url("assets/Inter-VariableFont_opsz,wght.ttf");
    /* No font-display - defaults to 'auto' (FOIT) */
  }
  body {
    font-family: "Inter Variable"; /* No fallbacks */
  }
</style>
```

### Good Font Loading:

```html
<!-- Preload critical fonts -->
<link
  rel="preload"
  href="assets/Inter-VariableFont_opsz,wght.ttf"
  as="font"
  type="font/ttf"
  crossorigin
/>
<style>
  @font-face {
    font-family: "Inter Variable";
    src: url("assets/Inter-VariableFont_opsz,wght.ttf");
    font-display: swap; /* Shows fallback first */
  }
  body {
    font-family:
      "Inter Variable",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Arial,
      sans-serif; /* Comprehensive fallbacks */
  }
</style>
```

## Experiments to Try

1. **Throttle your connection**: DevTools → Network → Slow 3G
2. **Watch font swaps**: Notice FOIT vs FOUT behavior
3. **Check font file sizes**: Inter (~500KB), Geist Mono (~200KB)
4. **Test caching**: Refresh and see which fonts re-download
5. **Compare text rendering**: When does text first appear?
6. **Timeline analysis**: Use Performance tab to see font swap events

## Key Takeaways

- **Font loading strategy is critical**: Variable fonts are heavy (~700KB total)
- **FOIT vs FOUT**: Invisible text vs visible fallback text
- **Preload + font-display**: Essential for good font performance
- **Caching matters**: Large fonts should be cached aggressively
- **Fallback fonts**: Always provide system font alternatives
- **Progressive enhancement**: Show readable text first, enhance with custom fonts

## Next Steps

Once you understand font loading:

1. Learn about font subsetting and unicode-range
2. Explore variable font optimization
3. Study Web Font Loader and FontFace API
4. Understand Cumulative Layout Shift (CLS) from font swaps
5. Learn about Critical CSS and above-the-fold optimization

## Beginner-Friendly Tips

- **Font loading first**: It has the biggest visual impact
- **Use system font stacks**: They're fast and look great
- **Always use font-display: swap**: Never leave it as 'auto'
- **Preload critical fonts**: But don't over-preload
- **Test on slow connections**: Font loading issues are more obvious
- **Watch for font swaps**: Minimize layout shifts during swaps

Remember: The goal isn't perfect code - it's happy users! 😊
