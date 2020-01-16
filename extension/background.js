var userEmail = "";
var userId = "";

// Init users credentials
chrome.identity.getProfileUserInfo(identity => {
	console.log(identity);
	userEmail = identity.email;
	userId = identity.id;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	let reportObj = { ...request, userEmail, userId };
	console.log(reportObj);
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
