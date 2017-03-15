const fs = require('fs')

module.exports = {
    From: filePath => JSON.parse(fs.readFileSync(filePath))
}