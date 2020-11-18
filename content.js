let rfiData = ''

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

// Gets RFI ID# & Project ID# from RFI Page URL - RFI ID# is [7] in the split URL string array, project ID# is [3]
const urlData = () => {
  const url = window.location.href
  return url.split('/')
}
const projectId = urlData()[3]
const rfiId = urlData()[7]

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
  const rfiInfo = document.getElementsByClassName('active')[0].innerText
  const textArea = document.getElementById('tab_communication_body_ifr').contentDocument.getElementById('tinymce')
  textArea.innerHTML = ''
  signatureEl.textContent = `${storedUserName}, ${storedCompany}`
  messageEl.textContent = `See response to ${rfiInfo} attached. Please advise of any cost impacts within (${storedCostDays}) business days.` 
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

// Creates new button for RFI download
if (window.location.href.includes('project/rfi/show/')){
  const sidebarDiv = document.querySelector("#main_sidebar_content > div > div > div")
  const printRfiButton = document.createElement('button')
  printRfiButton.setAttribute("style", "height: 35px; width: 237px;")
  printRfiButton.setAttribute("id", "procore-helper-print-btn")
  printRfiButton.innerText = "Print RFI"
  sidebarDiv.appendChild(printRfiButton)
}

// Creates iframe of RFI PDF and appends it to body of RFI page
const injectPdf = () => {
  const iframeRfi = document.createElement('iframe')
  iframeRfi.src = `https://app.procore.com/${projectId}/project/rfi/view_pdf.pdf?id=${rfiId}&only_official=false`
  iframeRfi.style.display = "none"
  document.body.appendChild(iframeRfi)

  const sidebarDiv = document.querySelector("#main_sidebar_content > div > div > div")
  const loadingGif = document.createElement('img')
  loadingGif.src = chrome.runtime.getURL("images/loading.gif") 
  loadingGif.setAttribute("id", "helperLoadImg")
  loadingGif.setAttribute("style", "height: 24px; width: 24px;")
  sidebarDiv.appendChild(loadingGif)

  iframeRfi.onload = () => {
    chrome.runtime.sendMessage({download: iframeRfi.src})
    document.getElementById('helperLoadImg').style.display='none';
  }
}

// Injects PDF (subject to change)
if (window.location.href.includes('project/rfi/show/')){
  document.getElementById('procore-helper-print-btn').addEventListener("click", function (){
    injectPdf()
  })
}


console.log('Procore Helper Enabled')