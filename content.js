// Function to check if a given string is a URL
function isURL(text) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(text);
}

// Reading Data and saving to chrome local storage
document.addEventListener('copy', async (event) => {
    const copiedText = await navigator.clipboard.readText()
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (urlPattern.test(copiedText)) {
        chrome.storage.local.set({ key: copiedText })
    }
})
