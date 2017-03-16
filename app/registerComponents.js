import App from './App.vue'
import Welcome from './components/root/welcome.vue'
import WelcomeSearch from './components/welcome-search.vue'
import BookList from './components/book-list.vue'
import SlideTransition from './transitions/slide.vue';
import Reader from './components/reader.vue';
import ReadBook from './components/root/read-book.vue';

export default Vue => {
    Vue.component('main-app', App);
    Vue.component('welcome', Welcome);
    Vue.component('welcome-search', WelcomeSearch);
    Vue.component('book-list', BookList);
    Vue.component('slide-transition', SlideTransition);
    Vue.component('reader', Reader);
    Vue.component('read-book', ReadBook);
}