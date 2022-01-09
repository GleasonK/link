/*
* This is intended to be a client-side JS link tracker
* that uses google analytics to handle all the backend.
*
* There are two main problems to solve:
*  1. How to send the data to GA => Custom Events
*  2. What to do if GA fails => Have Timeouts in Place
*
*/

function getForwardUrl(url) {
	const defaultUrl = "https://kevingleason.me";
	const key = "l";

	// https://www.sitepoint.com/get-url-parameters-with-javascript/
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
    return urlParams.get('l') || defaultUrl;
}

function forwardUrl(url) {
	// Forward to correct location.
	// TODO: Do something with history?
	// 
    //window.location.href = url;
	alert("forward to " + url)
}

// https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#knowing_when_the_hit_has_been_sent
function createFunctionWithTimeout(callback, opt_timeout) {
	// Default timeout 1 second.
	var called = false;
	function fn() {
		if (!called) {
			called = true;
			callback();
		}
	}
	setTimeout(fn, opt_timeout || 1000);
	return fn;
}

// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
function handleLinkClicks(event) {
	const url = getForwardUrl();
	ga('send', 'event', 'link', 'click', url, {
		transport: 'beacon',
		nonInteraction: true,
		hitCallback: createFunctionWithTimeout(function(){
			alert("success.");
			forwardUrl(url);
		}),
	});
}

handleLinkClicks();
