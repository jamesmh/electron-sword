const { readPromise } = require('../file/file');
const path = require('path');
const { ipcMain } = require('electron')
const TestamentList = require('../../domains/testament/testamentList')


module.exports = ({sender}, args) => {
    if (global.Sword.testamentBooks === undefined) {
        readPromise(path.join(__dirname, "..", "..", "static", "bibles", "books.json"))
            .then(file => {
                console.log('try')
                global.Sword.testamentBooks = TestamentList.fromFile(file).toArray();
                console.log('after')
                sender.send('pull-books',  global.Sword.testamentBooks);
            })
    }
    else {
        sender.send('pull-books', global.Sword.testamentBooks);
    }
}