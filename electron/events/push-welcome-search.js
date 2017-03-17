module.exports = ({ sender }, filter) => {
    console.log(`Filter: ${filter}`)
    sender.send('pull-welcome-search', filter)
}