function softwrap(enabled){
	document.getElementById("line-wrap-mode").selectedIndex=enabled? 1 : 0;
}

chrome.runtime.onMessage.addListener((message) => {
	if (message.command === "apply") {
		softwrap(true);
	} else if (message.command === "reset") {
		softwrap(false);
	}
});

chrome.storage.local.get({
		enabled: true
	}, function(result) {
		softwrap(result.enabled);
	}
);
