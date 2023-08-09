// background.js

const linksArray = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addLink") {
    linksArray.push(message.link);
    console.log(linksArray);
  } else if (message.action === "getLinks") {
    sendResponse({ links: linksArray });
  }
});
