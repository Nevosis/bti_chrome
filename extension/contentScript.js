var justInCase = 10;

function initClick() {
	$(".btn-balancetoninfluence").click(function() {
		console.log("Report called");

		let channelNode = $("#channel-name > div > div > #text > a");
		if (channelNode && channelNode.length) {
			let channelName = channelNode[0].innerText 
			let channelUrl = channelNode[0].href
			alert(`REPORTING DE :\n${channelName}\n${channelUrl}`);
			console.log(channelNode[0].innerText);
			console.log(channelNode[0].href);
		}
	});
}

function initContentScript() {
	console.log("initContentScript")
	updateDom();

	let bloc = $("#container > #top-row");
	if (bloc && bloc[0]) {
		bloc.append(button);
		initClick();
		justInCase = 10;
	} else {
		justInCase--;
		if (justInCase > 0) {
			setTimeout(initContentScript, 500);
		}
	}
}

// overide css of existing dom element
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
		updateDom();

		let bloc = $("#btn-balancetoninfluence");
		if (!(bloc && bloc[0])) {
			initContentScript();
		}
		return;
	}
});

initContentScript();
