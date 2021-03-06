const _ = require('lodash');

class BibleBooks {
    constructor(unparsedJsonFile) {      
        this.books = _(JSON.parse(unparsedJsonFile).resultset.row)
            .map(formatVerses)
            .groupBy("bookId")
            .value();
    }

    getBookById(id) {
        return this.books[id];
    }
}
module.exports = BibleBooks;


/*----------*/
/* Privates */
/*----------*/
const formatVerses = ({ field }, index, originalArray) => ({
    bookId: field[1],
    chapter: field[2],
    verse: field[3],
    text: field[4]
});

