const { readPromise } = require('../file/file');
const path = require('path');
const { ipcMain } = require('electron')
const _ = require('lodash');


module.exports = ({ sender }, args) => {
    const { bookId, chapter } = args;


    if (global.Sword.bible === undefined) {
        readPromise(path.join(__dirname, "..", "..", "static", "bibles", "kjv.json"))
            .then(file => {
                const fileJson = JSON.parse(file).resultset.row;
                global.Sword.bible = _(fileJson)
                    .map(({ field }) => ({ bookId: field[1], chapter: field[2], verse: field[3], text: field[4] }))
                    .groupBy("bookId")
                    .value();
                sender.send('provide-content', getFormattedHtml(global.Sword.bible, bookId, chapter));
            })
    }
    else {
        sender.send('provide-content', getFormattedHtml(global.Sword.bible, bookId, chapter));
    }
}

const getFormattedHtml = (bible, bookId, chapter) => {
    const book = bible[bookId];
    return book.map(field => {
        if (field.chapter === chapter)
            return `<span chapter="${chapter}" verse="${field.verse}">${field.text}</span>`;
        return "";
    }).join("");
}