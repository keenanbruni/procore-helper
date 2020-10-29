// Gets username from chrome storage
let storedUserName = ''
chrome.storage.sync.get("userName", (obj) => {
  storedUserName = obj.userName
})

// Gets # of days for cost notification from chrome storage
let storedCostDays = ''
chrome.storage.sync.get("costDays", (obj) => {
  storedCostDays = obj.costDays
})

// Gets company name from chrome storage
let storedCompany = ''
chrome.storage.sync.get("companyName", (obj) => {
  storedCompany = obj.companyName
})

// Store RFI data for PDF processing 
const storeRFI = () => {
  const x = document.getElementsByClassName('RfiFormHeader_title__3sRF0').item(0);
  const rfiTitle = x.innerHTML.split(':')[1].trim().replace("&amp;", "&").replace("/", " ").replace(/["']/g, "").replace("%", " ").replace("*", " ").replace(":", " ").replace("|", " ").replace("?", " ").replace(">", " ").replace("<", " ")
  const rfiNumberUnsplit = x.innerHTML.split(':')[0]
  const rfiNumber = rfiNumberUnsplit.split('#')[1]
  rfiData = [{rfiNumber}, {rfiTitle}]
  chrome.runtime.sendMessage({rfi: rfiData}, function(response) {
  });
}

// Autofill RFI email text. Only want this to fire on the email page.
const setRfiMessage = () => {
  const messageEl = document.createElement('p')
  const emptyParagraph = document.createElement('br')
  const signatureEl = document.createElement('p')
  const rfiData = document.getElementsByClassName('active')[0].innerText
  const textArea = document.getElementById('tab_communication_body_ifr').contentDocument.getElementById('tinymce')
  textArea.innerHTML = ''
  signatureEl.textContent = `${storedUserName}, ${storedCompany}`
  messageEl.textContent = `See response to ${rfiData} attached. Please advise of any cost impacts within (${storedCostDays}) business days.` 
  textArea.appendChild(messageEl)
  textArea.appendChild(emptyParagraph)
  textArea.appendChild(signatureEl)
}

// Triggers 'storeRFI' on the main RFI page
document.addEventListener('click', () => {
  if (window.location.href.includes('project/rfi/show/')){
    storeRFI();
  }
});

// Triggers 'setRfiMessage' on the rfi email page
if (window.location.href.includes('subtab=email')){
  setTimeout(function(){setRfiMessage()}, 3000);
}

// Injects PDF iframe upon message from popup
// chrome.runtime.onMessage.addListener(
//   function(message, callback) {
//     if (message == “injectPdf”){
//       chrome.tabs.executeScript({
//         file: 'rfiDownloadScript.js'
//       });
//     }
//  });

console.log('Procore Helper Enabled')