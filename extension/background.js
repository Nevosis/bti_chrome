var userEmail = "";
var userId = "";

// Init users credentials
chrome.identity.getProfileUserInfo(identity => {
	userEmail = identity.email;
	userId = identity.id;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	const { channelName, channelUrl, comment } = request;
	if (request.action === "sendReport") {
		$.post(backendUrl + "/report", {
			reporterId: userId,
			reporterMail: userEmail,
			reportedName: channelName,
			reportedId: channelUrl,
			comment
		})
			.done(resp => {
				console.log("success send report");
				console.log(resp);
				sendResponse({success:true, message:resp.responseText})
			})
			.fail(err => {
				console.log("error send report");
				console.log(err);
				sendResponse({success:false, message:err.responseText})
			});
	} else if (request.action === "getReport") {
		$.post(`${backendUrl}/report/${channelName}`, {
			channelId: channelUrl
		})
			.done(reports => {
				console.log("success GET report");
				console.log(reports);
				sendResponse({
					action: "getReportSuccess",
					reports
				});
			})
			.fail(err => {
				console.log("error GET report");
				console.log(err);
			});
	}

	// DEBUG
	let reportObjDebug = { ...request, userEmail, userId };
	console.log(reportObjDebug);

	return true;
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
