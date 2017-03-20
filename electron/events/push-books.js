const { readPromise } = require('../file/file');
const path = require('path');
const { ipcMain } = require('electron')
const TestamentList = require('../../domains/testament/testamentList')
const booksFilePath = path.join(__dirname, "..", "..", "static", "bibles", "books.json")

module.exports = ({sender}, args) => {
    if (global.Sword.testamentBooks === undefined) {
        readPromise(booksFilePath)
            .then(file => {
                global.Sword.testamentBooks = TestamentList.fromFile(file).toArray();
                sender.send('pull-books',  global.Sword.testamentBooks);
            })
    }
    else {
        sender.send('pull-books', global.Sword.testamentBooks);
    }
}