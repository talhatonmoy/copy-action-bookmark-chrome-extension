chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveCopiedText') {
        const copiedText = message.text;

        
    }
});