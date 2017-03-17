const { readPromise } = require('../file/file');
const path = require('path');
const { ipcMain } = require('electron')


module.exports = ({sender}, args) => {
    if (global.Sword.books === undefined) {
        readPromise(path.join(__dirname, "..", "..", "static", "bibles", "books.json"))
            .then(books => {
                books = JSON.parse(books);
                global.Sword.books = books.resultset.keys;
                sender.send('pull-books', books);
            })
    }
    else {
        sender.send('pull-books', global.Sword.books);
    }
}