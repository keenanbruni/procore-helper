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

// Options Form
const optionsForm = document.getElementById('options-form')

optionsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userName = e.target["0"].value
    chrome.storage.sync.set({'userName' : userName}, console.log('Username Set!'))
    renderUserName()

    const costDays = e.target["1"].value;
    chrome.storage.sync.set({'costDays' : costDays}, console.log('Cost Days Set!'))
    renderCostDays()

    const companyName = e.target["2"].value
    chrome.storage.sync.set({'companyName' : companyName}, console.log('Company name set!'))
    renderCompanyName()
})