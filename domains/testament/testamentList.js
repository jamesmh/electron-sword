const _ = require('lodash');

class TestamentList {
    constructor(books) {
        this.testaments = _(books)
            .map(formatBooks)
            .orderBy("id")
            .groupBy("testament")
            .value()
    }

    toArray() {
        return this.testaments;
    }
}

TestamentList.fromFile = file => new TestamentList(JSON.parse(file).resultset.keys)

TestamentList.filterByBookName = (testaments, filter) => ({
    "OT": filterTestamentBooks(testaments.OT, filter),
    "NT": filterTestamentBooks(testaments.NT, filter)
})

/*----------*/
/* Privates */
/*----------*/

const formatBooks = book => {
    return {
        id: book.b,
        name: book.n,
        testament: book.t        
    }
}

const filterTestamentBooks = (testament, filter) => testament.filter(filterBookByName(filter))

const filterBookByName = filter => book => {
    if (filter && filter !== '') {
        return book.name.toUpperCase().indexOf(filter.toUpperCase()) > -1
    }
    return true;
}

module.exports = TestamentList;