const Register = (ipcMain) => {
    for (key in events) {
        ipcMain.on(key, events[key]);
    }
}


const events = {
    "fetch-books": require('../events/fetch-books'),
    "fetch-content": require("../events/fetch-content")
}

module.exports = {
    Register
}