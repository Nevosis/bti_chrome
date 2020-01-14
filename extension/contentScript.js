$(".btn-balancetoninfluence").click(function() {
	alert("Handler for .click() called.");
});

function updateDom() {
	// overide css of existing dom element
	$(".title").css("font-size", "15px");
	$(".title").css("font-family", '"Comic Sans MS"');
}

// Trigger script on tab update / change url
// chrome tabs api only usable in background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("request");
	console.log(request);
	if (
		request.action === "update" &&
		request.url.includes("youtube.com/watch?")
	) {
		updateDom();
	}
});

// Timeout used because page may complete rendering after extension is loaded
//setTimeout(updateDom, 20);
