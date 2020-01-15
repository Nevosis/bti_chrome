function initContentScript() {
	updateDom();
	return;
	// Add clickable button to title
	$(".title .ytd-video-primary-info-renderer").append(button);
	$(".btn-balancetoninfluence").click(function() {
		alert("Handler for .click() called.");
	});
}

function updateDom() {
	// overide css of existing dom element
	$(".title .ytd-video-primary-info-renderer").css(
		"font-family",
		'"Comic Sans MS"'
	);

}

// Trigger script on tab update / change url
// chrome tabs api only usable in background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (
		request.action === "update" &&
		request.url.includes("youtube.com/watch?")
	) {
		updateDom();
	}
});

// Timeout used because page may complete rendering after extension is loaded
setTimeout(initContentScript, 50);
