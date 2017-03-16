const { readPromise } = require('../file/file');
const path = require('path');
const { ipcMain } = require('electron')


module.exports = ({sender}, args) => {
    if (global.Sword.books === undefined) {
        readPromise(path.join(__dirname, "..", "..", "static", "bibles", "books.json"))
            .then(books => {
                books = JSON.parse(books);
                global.Sword.books = books.resultset.keys;
                sender.send('provide-books', books);
            })
    }
    else {
        sender.send('provide-books', global.Sword.books);
    }
}