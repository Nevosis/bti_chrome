var userEmail = "";
var userId = "";

// Init users credentials
chrome.identity.getProfileUserInfo(identity => {
	console.log(identity);
	userEmail = identity.email;
	userId = identity.id;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	const { channelName, channelUrl } = request;

	$.post(
		"http://5.135.184.31:3001/report",
		{
			reporterId: userId,
			reporterMail: userEmail,
			reportedName: channelName,
			reportedId: channelUrl
		},
		resp => {
			console.log(resp);
		}
	);

	// DEBUG
	let reportObjDebug = { ...request, userEmail, userId };
	console.log(reportObjDebug);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	// read changeInfo data and do something with it
	// like send the new url to contentscripts.js
	if (changeInfo.url) {
		chrome.tabs.sendMessage(tabId, {
			action: "update",
			message: "Url updated",
			url: changeInfo.url,
			userEmail,
			userId
		});
	}
});
