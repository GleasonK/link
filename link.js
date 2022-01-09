/*
* This is intended to be a client-side JS link tracker
* that uses google analytics to handle all the backend.
*
* There are two main problems to solve:
*  1. How to send the data to GA => Custom Events
*  2. What to do if GA fails => Have Timeouts in Place
*
* Google analytics can fail if a browser plug-in blocks analytics requests.
* These requests will be forwarded after 1 second.
*/

// CHANGE THE CONFIG: At a minimum, set your Google Analytics ID in the `gaID` field.
// Note: The 404 can be updated to provide a default landing page for invalid requests.
const config = {
	gaID: 'UA-46933211-3', // CHANGE ME: Google Analytics ID (https://support.google.com/analytics/answer/1008080)
	repoName: "link",      // The name of the github repository
	queryParam: "l",       // The query parameter with forward URL: `me.com/link/?l=url
	url404: "404.html",    // The 404 page to forward to: `404.hmtl?badAttemptHref`
	timeout: 1000,         // Timeout until redirect, used if GA is blocked by browser (default 1s)
};

function getCurrentUrlNoQuery() {
	const currHref = window.location.href;
	const repoFolder = "/"+config.repoName;
	const idx = currHref.indexOf(repoFolder) + repoFolder.length;
	return currHref.substring(0, idx); 
}

function get404Link() {
	// Return 404.html/?l=https://kevingleaosn.me/link/?l=badlink
	const badHref = encodeURI(window.location.href);
	return `${getCurrentUrlNoQuery()}/${config.url404}?${config.queryParam}=${badHref}`;
}

function getQueryParam(param, opt_url) {
	const url = opt_url || window.location;

	// https://www.sitepoint.com/get-url-parameters-with-javascript/
	const queryString = url.search;
	const urlParams = new URLSearchParams(queryString);
    return urlParams.get(config.queryParam);
}

function getForwardUrl(url) {
	return getQueryParam(config.queryParam) || get404Link();
}

function wrapInHttpIfNeeded(url) {
	if (url.indexOf("http://") != 0 && url.indexOf("https://") != 0) {
        url = "http://" + url;
    }
    return url;
}

function forwardUrl(url) {
	// https://stackoverflow.com/questions/200337/whats-the-best-way-to-automatically-redirect-someone-to-another-webpage
	// Forward to correct location.
	// Use replace to avoid redirects when a user clicks "back" in their browser
	window.location.replace(wrapInHttpIfNeeded(url));
}

// https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#knowing_when_the_hit_has_been_sent
function createFunctionWithTimeout(callback) {
	// Default timeout 1 second.
	var called = false;
	function fn() {
		if (!called) {
			called = true;
			callback();
		}
	}
	setTimeout(fn, config.timeout);
	return fn;
}

// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
function handleLinkClicks(event) {
	const url = getForwardUrl();
	ga('send', 'event', 'link', 'click', url, {
		transport: 'beacon',
		nonInteraction: true,
		hitCallback: createFunctionWithTimeout(function(){
			forwardUrl(url);
		}),
	});
}
