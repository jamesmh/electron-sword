import App from './App.vue'
import Welcome from './components/welcome/welcome.vue'
import WelcomeSearch from './components/welcome/welcome-search.vue'
import BookList from './components/welcome/book-list.vue'
import SlideTransition from './transitions/slide.vue';
import Reader from './components/read/reader.vue';
import ListTransition from './transitions/list.vue';
import FadeTransition from './transitions/fade.vue';

export default Vue => {
    Vue.component('main-app', App);
    Vue.component('welcome', Welcome);
    Vue.component('welcome-search', WelcomeSearch);
    Vue.component('book-list', BookList);
    Vue.component('slide-transition', SlideTransition);
    Vue.component('list-transition', ListTransition);
    Vue.component('fade-transition', FadeTransition);
    Vue.component('reader', Reader);
}