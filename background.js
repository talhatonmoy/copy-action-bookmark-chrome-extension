const copiedDataArray = [];

chrome.runtime.onInstalled.addListener(() => {
  // Initialize the copiedDataArray from storage if needed
});

chrome.clipboard.onClipboardDataChanged.addListener(() => {
  chrome.clipboard.readText((copiedText) => {
    if (copiedText) {
      const copiedData = {
        label: '',
        // url: window.location.href // Assuming you want to store the current URL
        url: copiedText
      };
      copiedDataArray.push(copiedData);

      // Store the updated array in local storage
      chrome.storage.local.set({ copiedDataArray });
      console.log(copiedDataArray)
    } else (
      console.log('problem')
    )
  });
});
