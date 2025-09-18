// Shared JavaScript file for both good and bad examples
// This JavaScript takes time to load to demonstrate the blocking effect

console.log("JavaScript is loading...");

// Simulate some processing time to make the file bigger
for (let i = 0; i < 1000; i++) {
	// Simulation of larger JavaScript bundle processing
	if (i % 100 === 0) {
		// Some fake calculations
		Math.random() * Math.PI;
	}
}

console.log("JavaScript finished loading!");

// Main functionality - runs when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM is ready, adding interactivity");

	// Add click handlers to all cards
	const cards = document.querySelectorAll(".card");
	cards.forEach((card, index) => {
		card.addEventListener("click", function () {
			const title = this.querySelector("h3").textContent;
			alert("Card clicked: " + title);
		});

		// Add some visual feedback on hover
		card.addEventListener("mouseenter", function () {
			this.style.cursor = "pointer";
			this.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
		});

		card.addEventListener("mouseleave", function () {
			this.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
		});
	});

	// Add some animation to the header
	const header = document.querySelector(".header");
	if (header) {
		setTimeout(() => {
			header.style.transform = "scale(1.02)";
			header.style.transition = "transform 0.3s ease";

			setTimeout(() => {
				header.style.transform = "scale(1)";
			}, 300);
		}, 500);
	}

	// Simulate some analytics or tracking code
	function trackPageLoad() {
		console.log("Page load tracked at:", new Date().toISOString());

		// Fake analytics data
		const analytics = {
			page: window.location.pathname,
			timestamp: Date.now(),
			userAgent: navigator.userAgent,
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight,
			},
		};

		console.log("Analytics data:", analytics);
	}

	// Track page load
	trackPageLoad();

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

	// Simulate some third-party widget loading
	function loadFakeWidget() {
		console.log("Loading fake third-party widget...");

		// Simulate async loading
		setTimeout(
			() => {
				console.log("Fake widget loaded");

				// Add widget indicator
				const widgetDiv = document.createElement("div");
				widgetDiv.innerHTML = "📊 Widget Loaded";
				widgetDiv.style.position = "fixed";
				widgetDiv.style.bottom = "10px";
				widgetDiv.style.right = "10px";
				widgetDiv.style.background = "#28a745";
				widgetDiv.style.color = "white";
				widgetDiv.style.padding = "5px 10px";
				widgetDiv.style.borderRadius = "3px";
				widgetDiv.style.fontSize = "12px";
				widgetDiv.style.zIndex = "9999";

				document.body.appendChild(widgetDiv);

				// Remove after 3 seconds
				setTimeout(() => {
					document.body.removeChild(widgetDiv);
				}, 3000);
			},
			Math.random() * 2000 + 1000,
		); // 1-3 seconds
	}

	// Load the fake widget
	loadFakeWidget();
});

// Some utility functions to make the JS file larger
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

function throttle(func, limit) {
	let inThrottle;
	return function () {
		const args = arguments;
		
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

// Add scroll performance indicator
const scrollHandler = throttle(() => {
	const scrollPercent =
		(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
	console.log(`Scrolled ${scrollPercent.toFixed(1)}%`);
}, 100);

window.addEventListener("scroll", scrollHandler);

console.log("JavaScript setup complete - all event listeners added");
