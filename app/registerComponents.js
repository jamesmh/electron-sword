import App from './App.vue'
import Welcome from './components/welcome.vue'
import WelcomeSearch from './components/welcome-search.vue'
import BookList from './components/book-list.vue'

export default Vue => {
    Vue.component('main-app', App);
    Vue.component('welcome', Welcome);
    Vue.component('welcome-search', WelcomeSearch);
    Vue.component('book-list', BookList);
}