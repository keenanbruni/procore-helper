// Renders saved username in options 
const renderUserName = () => {
    chrome.storage.sync.get("userName", (obj) => {
        document.querySelector("#set-name > input").value = obj.userName
    })
}

renderUserName()

// Renders saved # of cost days in options
const renderCostDays = () => {
    chrome.storage.sync.get("costDays", (obj) => {
        document.querySelector("#set-costs > input").value = obj.costDays
    })
}

renderCostDays()

// Renders saved company name in options
const renderCompanyName = () => {
    chrome.storage.sync.get("companyName", (obj) => {
        document.querySelector("#set-companyName > input").value = obj.companyName
    })
}

renderCompanyName()

// Username form
const nameForm = document.getElementById('set-name')

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = e.target["0"].value
    chrome.storage.sync.set({'userName' : userName}, console.log('Username Set!'))
    renderUserName()
})

// Costs form
const costsForm = document.getElementById('set-costs')

costsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const costDays = e.target["0"].value;
    chrome.storage.sync.set({'costDays' : costDays}, console.log('Cost Days Set!'))
        renderCostDays()
})

// Company form
const companyForm = document.getElementById('set-companyName')

companyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const companyName = e.target["0"].value
    chrome.storage.sync.set({'companyName' : companyName}, console.log('Company name set!'))
    renderCompanyName()
})