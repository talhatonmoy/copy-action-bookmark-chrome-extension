// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyLink") {
    const copiedLink = document.URL;
    chrome.runtime.sendMessage({ action: "addLink", link: copiedLink });
  }
});
