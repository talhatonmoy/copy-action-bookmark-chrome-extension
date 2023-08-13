
// Function to check if a given string is a URL
function isURL(text) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(text);
}


document.addEventListener('copy', async (event) => {
    console.log('Copy event detected!');

    //Reading copied text
    const copiedText = await navigator.clipboard.readText()
    
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (urlPattern.test(copiedText)) {
        //Setting copied text to storage
        chrome.storage.local.set({ key: copiedText })
    }
        
})


// document.addEventListener('copy', async event => {
//     console.log('Copy event detected!');

//     // Read the copied text from the clipboard
//     const copiedText = await navigator.clipboard.readText();

//     // Set the copied text as the value with key "key" in storage
//     chrome.storage.local.set({ key: copiedText }). then( () => {
//         console.log("Value is set");
//     });
// });


/**
 * Helpers
 */











