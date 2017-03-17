const Register = (ipcMain) => {
    for (key in events) {
        ipcMain.on(key, events[key]);
    }
}


const events = {
    "push-books": require('../events/push-books'),
    "push-content": require("../events/push-content"),
    "push-welcome-search": require("../events/push-welcome-search")
}

module.exports = {
    Register
}