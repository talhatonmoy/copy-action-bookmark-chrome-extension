// Getting elements
const inputUrl = document.getElementById('url');
const inputLabel = document.getElementById('label');
const addBtn = document.getElementById('add');
const ol = document.getElementById('ol');
const clearBtn = document.getElementById('clear')
const tabBtn = document.getElementById('tab')
const exportBtn = document.getElementById('export')
const ptag = document.getElementById('dummy')

addBtn.addEventListener('click', saveData);

// Retrieve existing data from local storage if available
let storedData = JSON.parse(localStorage.getItem('storedData')) || [];
function saveData() {
  let dataObj = {
    url: inputUrl.value,
    label: inputLabel.value
  };

  storedData.push(dataObj);

  const textToWrite = JSON.stringify(storedData);
  inputUrl.value = '';
  inputLabel.value = '';

  localStorage.setItem('storedData', textToWrite);
  console.log('Data added/updated in local storage:', storedData);
}



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




setInterval(display, 500)
function display() {
  let allLinksFromStorage = localStorage.getItem('storedData')
  let allLinks = JSON.parse(allLinksFromStorage);
  renderArray(allLinks)

}

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

    dataObj = {
      url: activeTab,
      label: domainName
    }
    storedData.push(dataObj);

    const textToWrite = JSON.stringify(storedData);
    inputUrl.value = '';
    inputLabel.value = '';

    localStorage.setItem('storedData', textToWrite);

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


// Convert to csv
function toCSV(data) {
  const rows = data.map((item) => Object.values(item).map((value) => `"${value}"`).join(','))
  return [...rows].join('\n')
}

// Extracting Json Data from stringyfy Json string
function extractJsonData(inputString) {
  const startIndex = inputString.indexOf('\'') + 1;
  const endIndex = inputString.lastIndexOf('\'');
  const arrOfObjects = inputString.substring(startIndex, endIndex);

  // return JSON.parse(arrOfObjects);
  return arrOfObjects;
}

function donloadTrigger(csvData) {
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

// Exporting urls
exportBtn.addEventListener('click', downloadCSV);
function downloadCSV() {
  const rawdata = JSON.parse(localStorage.getItem('storedData'))
  const newData = toCSV(rawdata);
  donloadTrigger(newData)
}

