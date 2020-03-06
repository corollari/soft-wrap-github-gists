'use strict';
// Define references to DOM elements
const enabled = document.getElementById('enabled');

// Listen for clicks on the input elements, and send the appropriate message
// to the content script in the page.
function eventHandler(e) {
	// Send message to content script to color lines
	function apply(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			command: "apply"
		});
	}

	// Send message to content script to reset lines
	function reset(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			command: "reset"
		});
	}

	// Just log the error to the console.
	function reportError(error) {
		console.error(`${error}`);
	}

	// Store attributes into local storage
	chrome.storage.local.set({
		enabled: enabled.checked,
	});

	// Dispatch depending on checkbox enabled state
	if (enabled.checked) {
		try {
			chrome.tabs.query({ active: true, currentWindow: true }, apply);
		} catch (e) { reportError(e); }
	} else {
		try {
			chrome.tabs.query({ active: true, currentWindow: true }, reset);
		} catch (e) { reportError(e); }
	}
}

// Load settings from local storage, or use these defaults
chrome.storage.local.get({
	enabled: true
}, function(result) {
	enabled.checked = result.enabled;
})

// Register event listeners to update page when options change
document.getElementById("enabled").addEventListener("change", eventHandler);
