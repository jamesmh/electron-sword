const Register = (ipcMain) => {
    for (key in events) {
        ipcMain.on(key, events[key]);
    }
}


const events = {
    "fetch-books": require('../events/fetch-books'),
    "fetch-content": require("../events/fetch-content"),
    "push-welcome-search": require("../events/push-welcome-search")
}

module.exports = {
    Register
}