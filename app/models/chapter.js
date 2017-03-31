class Chapter {
    constructor(content) {
        this.content = content;
    }

    toHtml() {
        return this.content.map(verse => `<span chapter="${verse.chapter}" verse="${verse.verse}">${verse.text}</span>`)
            .join("");
    }       
}

module.exports = Chapter;