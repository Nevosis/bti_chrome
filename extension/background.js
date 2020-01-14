// TODO : je crois que c est useless, to remove.
chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({ color: "#3aa757" }, function() {
		console.log("The color is green.");
	});
});



chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
  	console.log("background on updated");
  	console.log(changeInfo);
      chrome.tabs.sendMessage( tabId, {
      	action: 'update',
        message: 'Url updated',
        url: changeInfo.url
      })
    }
  }
);