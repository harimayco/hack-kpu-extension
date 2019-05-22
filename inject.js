/**
 * code in inject.js
 * added "web_accessible_resources": ["injected.js"] to manifest.json
 */
chrome.storage.sync.get(['mode_active', 'msg', 'jok', 'prab'], function(result) {
	window.localStorage['jok'] = result.jok;
	window.localStorage['prab'] = result.prab;
	window.localStorage['mode_active'] = result.mode_active;
});


var s = document.createElement('script');
s.src = chrome.extension.getURL('injected.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
