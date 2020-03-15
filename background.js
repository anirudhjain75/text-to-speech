chrome.runtime.onInstalled.addListener(function () {
    var synth = window.speechSynthesis;
    
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo , tab) {
        if (tab.status == "complete") {
            console.log(tab);
            var utterThis = new SpeechSynthesisUtterance("Opening " + tab.url);
            synth.speak(utterThis);
            chrome.tabs.sendMessage(tabId, {action: 'GET_CONTENT'});
        }
    })
    let contentPort
    chrome.runtime.onConnect.addListener(function (postFrom) {
        if (postFrom.name === 'text-content') {
            postFrom.onMessage.addListener(function (message) {
                console.log(message.payload.content);
                var utterThis = new SpeechSynthesisUtterance(message.payload.content);
                synth.speak(utterThis)
            })
        }
    })
})