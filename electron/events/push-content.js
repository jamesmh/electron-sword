const { readPromise } = require('../file/file');
const path = require('path');
const { ipcMain } = require('electron')
const _ = require('lodash');


module.exports = ({ sender }, bookId, chapter) => {
    if (global.Sword.bible === undefined) {
        fetchKjv()
            .then(file => {
                const fileJson = JSON.parse(file).resultset.row;
                global.Sword.bible = _(fileJson)
                    .map(formatVerses)
                    .groupBy("bookId")
                    .value();
                
                sendProvideContentEvent(sender, global.Sword.bible[bookId], chapter);
            })
    }
    else {
        sendProvideContentEvent(sender, global.Sword.bible[bookId], chapter);
    }
}

const fetchKjv = _ => readPromise(path.join(__dirname, "..", "..", "static", "bibles", "kjv.json"))

const sendProvideContentEvent = (sender, selectedBook, chapter) => {
    const firstAndLastChapter = getFirstAndLastChapter(selectedBook);
    const isFirstChapter = chapter === firstAndLastChapter.first;
    const isLastChapter = chapter === firstAndLastChapter.last;
    sender.send('pull-content', getFormattedHtml(selectedBook, chapter), getNumberOfChapters(selectedBook), isFirstChapter, isLastChapter);
}

const formatVerses = ({ field }, index, originalArray) => ({
    bookId: field[1],
    chapter: field[2],
    verse: field[3],
    text: field[4]
})

const getFormattedHtml = (book, chapter) => {
    return book.map(verse => {
        if (verse.chapter === chapter)
            return `<span chapter="${verse.chapter}" verse="${verse.verse}">${verse.text}</span>`;
        return "";
    }).join("");
}

const getFirstAndLastChapter = (book) => {
    return {
        first: book[0].chapter,
        last: book[book.length - 1].chapter
    }
}

const getNumberOfChapters = book => _.uniqBy(book, ({chapter}) => chapter).length;