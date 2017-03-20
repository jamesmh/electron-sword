const Promise = require('es6-promise').Promise;
const fs = require('fs');

const readPromise = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, contents) => resolve(contents));
    });
}

const readJsonPromise = filePath => {
    return readPromise(filePath).then(file => JSON.parse(file));
}

const loadJsonSync = filePath => JSON.parse(fs.readFileSync(filePath))

module.exports = {
    readPromise: readPromise,
    readJsonPromise: readJsonPromise,
    loadJsonSync: loadJsonSync
}

