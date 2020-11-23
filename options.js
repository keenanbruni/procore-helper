const customMessageCheckbox = document.querySelector("#customMessageBox")

// Renders saved username in options 
const renderUserName = () => {
    chrome.storage.sync.get("userName", (obj) => {
        document.querySelector("#setName.input").value = obj.userName
    })
}
renderUserName()

// Renders saved # of cost days in options
const renderCostDays = () => {
    chrome.storage.sync.get("costDays", (obj) => {
        document.querySelector("#setCosts.input").value = obj.costDays
    })
}
renderCostDays()

// Renders saved company name in options
const renderCompanyName = () => {
    chrome.storage.sync.get("companyName", (obj) => {
        document.querySelector("#setCompanyName.input").value = obj.companyName
    })
}
renderCompanyName()

// Render custom message
const renderCustomMessage = () => {
    chrome.storage.sync.get ("customMessage", (obj) => {
        document.querySelector("#setCustomMessage.input").value = obj.customMessage
    })
}
renderCustomMessage()

// Populates custom checkbox from storage & renders appropriate input fields
const populateCustomCheckbox = () => {
    chrome.storage.sync.get("customCheckboxStatus", (obj) => {
        customMessageCheckbox.checked = obj.customCheckboxStatus
        if (obj.customCheckboxStatus == true) {
            document.getElementById("options-form").style.display = "none"
            document.getElementById("custom-form").style.display = ""
        } else {
            document.getElementById("custom-form").style.display = "none"
            document.getElementById("options-form").style.display = ""
        }
    })
}
populateCustomCheckbox()


// Saves custom message checkbox status
const renderCustomCheckbox = () => {
    if (customMessageCheckbox.checked == true){
        chrome.storage.sync.set({'customCheckboxStatus' : true})
        renderCustomMessage()
        console.log("Custom Message Enabled")
    } else {
        chrome.storage.sync.set({'customCheckboxStatus' : false})
        console.log("Custom Message Disabled")
    }
}

// Checkbox event listener
customMessageCheckbox.addEventListener("change", (e) => {
    e.preventDefault()
    renderCustomCheckbox()
    populateCustomCheckbox()
})

// Custom message form submission
const customForm = document.getElementById('custom-form')
customForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const customMessage = e.target["0"].value
    chrome.storage.sync.set({"customMessage" : customMessage}, console.log('Custom message set!'))
    renderCustomMessage()
})

// Options form submission
const optionsForm = document.getElementById('options-form')
optionsForm.addEventListener('submit', (e) => {
    e.preventDefault();
 
    const userName = e.target["0"].value
    chrome.storage.sync.set({ 'userName': userName }, console.log('Username set!'))
    renderUserName()

    const costDays = e.target["1"].value;
    chrome.storage.sync.set({ 'costDays': costDays }, console.log('Cost days set!'))
    renderCostDays()

    const companyName = e.target["2"].value
    chrome.storage.sync.set({ 'companyName': companyName }, console.log('Company name set!'))
    renderCompanyName()
})