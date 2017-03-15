const Register = (ipcMain) => {
        for (key in events) {
            ipcMain.on(key, events[key]);
        }
    }


const events = {
    //"get-resources": require('../events/get-resources')
}

module.exports = {
    Register
}