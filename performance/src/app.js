// Shared JavaScript file for both good and bad examples

// Simulate some processing time to make the file bigger
for (let i = 0; i < 1000; i++) {
  // Simulation of larger JavaScript bundle processing
  if (i % 100 === 0) {
    // Some fake calculations
    Math.random() * Math.PI;
  }
}
console.time("Processing time");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded is ready, adding interactivity");
});

// Add a simple performance indicator
window.addEventListener("load", () => {
  const loadTime = performance.now();
  console.log(`Page fully loaded in ${loadTime.toFixed(2)}ms`);

  // Show load time in footer if possible
  const footer = document.querySelector("footer");
  if (footer) {
    const loadTimeElement = document.createElement("p");
    loadTimeElement.textContent = `Page loaded in ${loadTime.toFixed(0)}ms`;
    loadTimeElement.style.fontSize = "0.8rem";
    loadTimeElement.style.color = "#666";
    loadTimeElement.style.fontStyle = "italic";
    footer.appendChild(loadTimeElement);
  }
});
