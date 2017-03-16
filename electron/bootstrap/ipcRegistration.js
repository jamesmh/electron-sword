const Register = (ipcMain) => {
    for (key in events) {
        ipcMain.on(key, events[key]);
    }
}


const events = {
    "fetch-books": require('../events/fetch-books')
}

module.exports = {
    Register
}