// Renders saved username in options form
const renderUserName = () => {
    chrome.storage.sync.get("userName", (obj) => {
        document.querySelector("#set-name > input").value = obj.userName
    })
}

renderUserName()

// Renders saved # of cost days in option form
const renderCostDays = () => {
    chrome.storage.sync.get("costDays", (obj) => {
        document.querySelector("#set-costs > input").value = obj.costDays
    })
}

renderCostDays()

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