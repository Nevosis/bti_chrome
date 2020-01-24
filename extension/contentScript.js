var justInCase = 10;

let reportDom = $(
	`<div id='report-balancetoninfluence' class='report-balancetoninfluence' style='display:none; color:#c55e14; font-size:10px; font-weight:200; cursor:pointer'>0 reports</div>`
);
let reports = [];

function initModals() {
	window.onclick = function(event) {
		if (
			event.target.id == "balancetoninfluence-modal" ||
			event.target.id == "balancetoninfluence-modal-list"
		) {
			$("#balancetoninfluence-modal").css("display", "none");
			$("#balancetoninfluence-modal-list").css("display", "none");
			$("#balancetoninfluence-modal-comment").val("");
		}
	};

	$.get(chrome.extension.getURL("/modalList.html"), function(modalDom) {
		$("#content").append(modalDom);

		$(".balancetoninfluence-close").on("click", function() {
			$(".balancetoninfluence-modal").css("display", "none");
			$("#balancetoninfluence-modal-comment").val("");
		});
	});

	$.get(chrome.extension.getURL("/modal.html"), function(modalDom) {
		$("#content").append(modalDom);

		$(".balancetoninfluence-close").on("click", function() {
			$(".balancetoninfluence-modal").css("display", "none");
			$("#balancetoninfluence-modal-comment").val("");
		});

		$(".balancetoninfluence-modal-send").on("click", function() {
			let channelNode = $(
				"#upload-info > #channel-name > div > div > #text > a"
			);
			let commentNode = $("#balancetoninfluence-modal-comment");

			if (
				channelNode &&
				commentNode &&
				channelNode.length &&
				commentNode.length
			) {
				let channelName = channelNode[0].innerText;
				let channelUrl = channelNode[0].href;

				let comment = commentNode[0].value;

				// Send to background channelId to report
				chrome.runtime.sendMessage(
					{
						action: "sendReport",
						channelName,
						channelUrl,
						comment
					},
					response => {
						if (response.success) {
							$(".balancetoninfluence-modal-status").css(
								"color",
								"green"
							);
							$(".balancetoninfluence-modal-status").text(
								"Report sent"
							);
						} else {
							$(".balancetoninfluence-modal-status").css(
								"color",
								"red"
							);
							$(".balancetoninfluence-modal-status").text(
								response.message
							);
						}
					}
				);
			}
		});
	});
}

function getReport() {
	if (document.URL.includes("youtube.com/watch?")) {
		console.log("GET REPORT");

		$("#report-balancetoninfluence").css("display", "none");

		setTimeout(() => {
			let channelNode = $(
				"#upload-info > #channel-name > div > div > #text > a"
			);
			let channelName = channelNode[0].innerText;
			let channelUrl = channelNode[0].href;

			chrome.runtime.sendMessage(
				{
					action: "getReport",
					channelName,
					channelUrl
				},
				response => {
					if (
						response.action === "getReportSuccess" &&
						response.reports.length
					) {
						reports = response.reports;
						$("#report-balancetoninfluence").css(
							"display",
							"block"
						);
						$("#report-balancetoninfluence").text(
							response.reports.length + " reports"
						);
					} else {
						reports = [];
						$("#report-balancetoninfluence").css("display", "none");
						//$("#report-balancetoninfluence").text("none ON A DIT");
					}
				}
			);
		}, 500);
	}
}

window.addEventListener("yt-navigate-start", () => {
	console.log("yt-navigate-start");
});
window.addEventListener("yt-navigate-finish", () => {
	console.log("yt-navigate-finish");
	getReport();
});

function initClick() {
	$("#btn-balancetoninfluence").click(function() {
		console.log("Open modal");
		$("#balancetoninfluence-modal").css("display", "block");
	});
	$("#report-balancetoninfluence").click(() => {
		console.log("UNE FOIS");
		$(".balancetoninfluence-modal-comment-list").empty();
		for (var i = 0; i < reports.length; i++) {
			let newP = $("<p>" + reports[i].comment + "</p>");
			$(".balancetoninfluence-modal-comment-list").append(newP);
		}
		$("#balancetoninfluence-modal-list").css("display", "block");
	});
}

function initContentScript(first) {
	updateDom();
	console.log("initContentScript");

	let bloc = $("#container > #top-row");
	if (bloc && bloc[0]) {
		if (first) {
			getReport();
			initModals();
		}
		bloc.append(button);

		$("#upload-info > #channel-name > div > div > #text").append(reportDom);
		initClick();
		justInCase = 10;
	} else {
		// page still loading.
		justInCase--; // used to avoid infinite loop. Cast once every .5s for 5s
		if (justInCase > 0) {
			setTimeout(() => initContentScript(first), 500);
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
	console.log(request);
	if (request.action === "update") {
		let bloc = $("#btn-balancetoninfluence");
		if (!(bloc && bloc[0])) {
			initContentScript(false);
		}
		return;
	}
});

initContentScript(true);
