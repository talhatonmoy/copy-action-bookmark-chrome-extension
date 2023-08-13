// Getting elements
const inputUrl = document.getElementById('url');
const inputLabel = document.getElementById('label');
const addBtn = document.getElementById('add');
const ol = document.getElementById('ol');
const clearBtn = document.getElementById('clear')
const tabBtn = document.getElementById('tab')
const exportBtn = document.getElementById('export')
const ptag = document.getElementById('dummy')


// Retrieve existing data from local storage if available
let storedData = JSON.parse(localStorage.getItem('storedData')) || [];

// Add New Data
addBtn.addEventListener('click', addData);
function addData() {
  saveData(inputUrl.value, inputLabel.value);
}



// Display Function
setInterval(display, 500)
function display() {
  let allLinksFromStorage = localStorage.getItem('storedData')
  let allLinks = JSON.parse(allLinksFromStorage);
  renderArray(allLinks)

}

// Capturing Currently active tab url
tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0].url;
    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i;
    const matches = activeTab.match(domainRegex);
    let domainName = ''
    if (matches && matches[1]) {
      domainName = matches[1];
    } else {
      domainName = 'Dummy'
    }

    saveData(activeTab, domainName)

  })
})


// Clear storage
clearBtn.addEventListener('click', function () {
  const confirmation = confirm('Do you want to clear all data?')
  if (confirmation) {
    localStorage.removeItem('storedData');
  }
  ol.innerHTML = '<p>Nothing Found</p>'
})


// Exporting urls
exportBtn.addEventListener('click', downloadCSV);
function downloadCSV() {
  const rawdata = JSON.parse(localStorage.getItem('storedData'))
  const newData = toCSV(rawdata);
  downloadTrigger(newData)
}




/**
 * Helping Functions
 */

// Rendering array
function renderArray(allLinks) {
  let html = '';
  if (allLinks) {
    allLinks.forEach((link, index) => {
      const itemNumber = index + 1;
      html += `<li class="mb-2">${itemNumber}. <a href="${link.url}">${link.label}</a></li>`
      ol.innerHTML = html
    })
  }
}

// Convert to csv
function toCSV(data) {
  const rows = data.map((item) => Object.values(item).map((value) => `"${value}"`).join(','))
  return [...rows].join('\n')
}

// Function to check if a given string is a URL
function isURL(text) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(text);
}


// Download Trigger
function downloadTrigger(csvData) {
  // Create a Blob from the CSV data
  const blob = new Blob([csvData], { type: 'text/csv' });

  // Create a URL for the Blob
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element for downloading
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = 'data.csv'; // Specify the desired file name

  // Simulate a click event on the link to initiate download
  downloadLink.click();

  // Clean up by revoking the Blob URL
  URL.revokeObjectURL(blobUrl);
}

/**
 * Save Data To Local Storge
 */
function saveData(link, label) {
  let dataObj = {
    url: link,
    label: label
  };

  storedData.push(dataObj);

  const textToWrite = JSON.stringify(storedData);
  inputUrl.value = '';
  inputLabel.value = '';

  localStorage.setItem('storedData', textToWrite);
}


/**
 * Development tools 
 */
function printData(data) {
  if (data) {
    ptag.innerHTML = data;
  } else {
    ptag.innerHTML = "No Data Found"
  }
}

/**
 * Getting Copied url and save to local storage
 */
chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
  const url = result.key;
  let firstName = ''
  if (url.includes("www.linkedin.com")) {
    const regex = /https:\/\/www\.linkedin\.com\/in\/(\w+)/;
    const matches = url.match(regex);

    if (matches && matches.length > 1) {
      firstName = matches[1];
    } else {
      console.log("No match found.");
    }
  } else {
    console.log("URL does not contain www.linkedin.com");
  }

  saveData(url, firstName)

});
