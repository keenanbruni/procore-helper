const renderUserName = () => {
    chrome.storage.sync.get("userName", (obj) => {
        document.querySelector("#set-name > input").value = obj.userName
    })
}

renderUserName()

const nameForm = document.getElementById('set-name')

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = e.target["0"].value
    chrome.storage.sync.set({'userName' : userName}, console.log('Username Set!'))
    renderUserName()
})