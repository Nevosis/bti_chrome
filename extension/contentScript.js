var justInCase = 10;

function initClick() {
	$(".btn-balancetoninfluence").click(function() {
		console.log("Report called");

		let channelNode = $("#channel-name > div > div > #text > a");
		if (channelNode && channelNode.length) {
			let channelName = channelNode[0].innerText;
			let channelUrl = channelNode[0].href;

			// Send to background channelId to report
			chrome.runtime.sendMessage({ channelName, channelUrl });
		}
	});
}

function initContentScript() {
	updateDom();
	console.log("initContentScript");

	let bloc = $("#container > #top-row");
	if (bloc && bloc[0]) {
		bloc.append(button);
		initClick();
		justInCase = 10;
	} else {
		// page still loading.
		justInCase--; // used to avoid infinite loop. Cast once every .5s for 5s
		if (justInCase > 0) {
			setTimeout(initContentScript, 500);
		}
	}
}

// overide css of existing dom element
// Comic Sans MS MASTERRACE
function updateDom() {
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
		let bloc = $("#btn-balancetoninfluence");
		if (!(bloc && bloc[0])) {
			initContentScript();
		}
		return;
	}
});

initContentScript();
