const { readPromise } = require('../file/file');
const path = require('path');
const { ipcMain } = require('electron')


module.exports = (event, args) => {
    if (global.Sword.books === undefined) {
        readPromise(path.join(__dirname, "..", "..", "static", "bibles", "books.json"))
            .then(books => {
                console.log(books)
                books = JSON.parse(books);
                console.log(books)
                global.Sword.books = books.resultset.keys;
                event.sender.send('books', books);
            })
    }
    else {
        event.sender.send('books', global.Sword.books);
    }
}