const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const getContent = (bible, bookId, chapter) => {
    const book = bible[bookId];
    return book.map(field => {
        if (field.chapter === chapter)
            return `<span chapter="${chapter}" verse="${field.verse}">${field.text}</span>`;
        return "";
    }).join("");
}

const file = fs.readFileSync(path.join(__dirname, "static", "bibles", "kjv.json"));
debugger;
const fileJson = JSON.parse(file).resultset.row;
const b = _(fileJson)
    .map(({ field }) => ({ bookId: field[1], chapter: field[2], verse: field[3], text: field[4] }))
    .groupBy("bookId")
    .value();
 console.log(getContent(b, 1, 1));
