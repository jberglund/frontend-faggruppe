# Web Performance Exercise

A demonstration server that showcases the difference between bad and good web performance practices. This project is structured to clearly separate performance anti-patterns from best practices, featuring real variable fonts (~700KB) to demonstrate font loading strategies.

## Project Structure

```
performance/
├── server.ts           # Main server entry point with routing
├── bad-practices.ts    # Performance anti-patterns and issues
├── good-practices.ts   # Performance optimizations and solutions
├── utils.ts           # Shared utilities and helper functions
├── src/               # Static files version with variable fonts
│   ├── bad.html       # Bad practices with FOIT font loading
│   ├── good.html      # Good practices with FOUT font loading
│   ├── styles.css     # Shared CSS file
│   ├── app.js         # Shared JavaScript file
│   └── assets/        # Variable font files (~700KB total)
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## File Organization

### `server.ts`

- Main server entry point
- Route handling and request processing
- Performance logging and monitoring
- Determines which implementation to use based on the route

### `bad-practices.ts`

- Contains examples of common performance mistakes:
  - Render-blocking CSS and JavaScript
  - Poor font loading strategies (FOIT)
  - No caching headers
  - Artificial delays without optimization
  - Missing resource preloading

### `good-practices.ts`

- Demonstrates performance best practices:
  - Resource preloading and optimization
  - Proper caching strategies
  - Font display swap to prevent FOIT with variable fonts
  - Variable font preloading strategies
  - Deferred JavaScript loading
  - Optimized CSS loading techniques

### `utils.ts`

- Shared utility functions:
  - Resource caching with TTL
  - Performance timing utilities
  - HTTP header constants
  - Logging functionality

## Getting Started

1. Install Bun if you haven't already:

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. Start the development server:

   ```bash
   # Full-featured server with TypeScript modules
   bun run dev

   # Simple server with static HTML/CSS/JS files
   bun run simple
   ```

3. Visit the pages:
   **Full Server (TypeScript):**
   - **Bad Practices**: http://localhost:3000/
   - **Good Practices**: http://localhost:3000/good
   - **Performance Logs**: http://localhost:3000/performance-logs

   **Simple Server (Static Files):**
   - **Bad Practices**: http://localhost:3001/bad
   - **Good Practices**: http://localhost:3001/good
   - **Help**: http://localhost:3001/help

## What to Observe

### Network Tab Comparison

Open your browser's Developer Tools and compare the Network tab between the two pages:

**Bad Practices Page (`/`)**:

- Render-blocking CSS and JS in `<head>`
- Long delays for resource loading
- No caching headers (resources reload every time)
- Font loading causes FOIT

**Good Practices Page (`/good`)**:

- Resource preloading including variable fonts
- Non-critical CSS loads without blocking
- Proper caching headers (1 year for fonts)
- Variable font loading with swap display and fallbacks
- Font preloading with crossorigin attribute
- JavaScript deferred to bottom

### Performance Metrics

- Time to First Contentful Paint (FCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)
- Resource loading waterfall

## Key Performance Concepts Demonstrated

### 1. Render-Blocking Resources

- **Problem**: CSS and JS in `<head>` blocks rendering
- **Solution**: Preload critical resources, defer non-critical ones

### 2. Font Loading Strategy

- **Problem**: Variable fonts (~700KB) cause Flash of Invisible Text (FOIT) without optimization
- **Solution**: Use `font-display: swap`, preload critical fonts, provide fallback font stacks

### 3. Caching Strategy

- **Problem**: No caching forces re-download of static resources
- **Solution**: Implement appropriate cache headers for different resource types

### 4. Resource Prioritization

- **Problem**: All resources loaded with same priority, large fonts block text rendering
- **Solution**: Preload critical fonts, use proper font-display values, comprehensive fallback stacks

## Educational Value

This project helps developers understand:

- How different loading strategies affect user experience
- The impact of proper HTTP caching
- Font loading strategies with real variable fonts
- Resource prioritization techniques
- Performance measurement and monitoring
- Real-world performance optimization strategies

## Running Performance Tests

Use tools like Lighthouse, WebPageTest, or browser DevTools to measure:

- Core Web Vitals (especially CLS from font swaps)
- Resource loading times (including 700KB+ fonts)
- Caching effectiveness
- JavaScript execution timing
- Font loading and swap behavior

The difference between the two implementations should be clearly visible in these metrics.
