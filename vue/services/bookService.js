import * as _ from 'lodash';

export const formatAndFilterBooks = (unformattedBooks, filter) => {
return _(unformattedBooks)
            .map(formatBooks)
            .filter(filterBooksByName(filter))
            .orderBy("id")
            .groupBy("testament")
            .value()
    }

const formatBooks = book => {
    return {
        id: book.b,
        name: book.n,
        testament: book.t        
    }
}

const filterBooksByName = filter => book => {
    if (filter && filter !== '') {
        return book.name.toUpperCase().indexOf(filter.toUpperCase()) > -1
    }
    return true;
}