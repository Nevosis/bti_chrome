

setTimeout(function() {
	// Timeout used because page may complete rendering after extension is loaded
	$(".title").css("font-size", "15px");
	$(".title").css("font-family", '"Comic Sans MS"');

	let r = $('<paper-button	noink=""	class="style-scope ytd-subscribe-button-renderer"	role="button"	tabindex="0"	animated=""	elevation="0"	aria-disabled="false"	aria-label="S\'abonner à Kyle Robinson Young. 26&nbsp;k&nbsp;abonnés"	><!--css-build:shady-->	<yt-formatted-string class="style-scope ytd-subscribe-button-renderer"		>S\'abonner</yt-formatted-string></paper-button>');
	//$(".title").append(r);
	$(".title").append(button);
}, 20);