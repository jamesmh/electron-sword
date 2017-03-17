module.exports = ({ sender }, filter) => {
    sender.send('pull-welcome-search', filter);
}