let contentPort = chrome.runtime.connect({
    name: 'text-content'
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if(message.action === 'GET_CONTENT') {
        contentPort.postMessage({
            type: 'TEXT',
            payload: {
                content: document.getElementsByTagName("p")[0].innerHTML
            }
        })
    }
})