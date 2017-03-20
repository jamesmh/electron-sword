const { readPromise } = require('../file/file');
const path = require('path');
const { ipcMain } = require('electron')
const _ = require('lodash');
const BookContentList = require('../../domains/book/bookContentList');

module.exports = ({ sender }, bookId, chapter) => {
    if (global.Sword.bible === undefined) {
        fetchKjv()
            .then(file => {                
                global.Sword.bible = new BookContentList(file);      
                const selectedBook = global.Sword.bible.getBookById(bookId);
                sendProvideContentEvent(sender, selectedBook, chapter);
            })
    }
    else {
        const selectedBook = global.Sword.bible.getBookById(bookId);
        sendProvideContentEvent(sender, selectedBook, chapter);
    }
}

const fetchKjv = _ => readPromise(path.join(__dirname, "..", "..", "static", "bibles", "kjv.json"))

const sendProvideContentEvent = (sender, selectedBook, selectedChapter) => {
    const chapterDetails = getFirstAndLastChapter(selectedBook, selectedChapter);
    const numberOfChapters = getNumberOfChapters(selectedBook);
    const chapterContent = getSelectedChapter(selectedBook, selectedChapter);
    sender.send('pull-content', chapterContent, numberOfChapters, chapterDetails.isFirst, chapterDetails.isLast);
}

const getSelectedChapter = (book, currentChapter) => book.filter(verse => verse.chapter === currentChapter)

const getFirstAndLastChapter = (book, currentChapter) => {
    return {
        isFirst: book[0].chapter === currentChapter,
        isLast: book[book.length - 1].chapter === currentChapter
    }
}

const getNumberOfChapters = book => _.uniqBy(book, ({chapter}) => chapter).length;