import App from './App.vue'
import Welcome from './components/welcome/welcome.vue'
import BookSelectionSearch from './components/welcome/book-selection-search.vue'
import BookSelectionList from './components/welcome/book-selection-list.vue'
import SlideTransition from './transitions/slide.vue';
import Reader from './components/read/reader.vue';
import ListTransition from './transitions/list.vue';
import FadeTransition from './transitions/fade.vue';

export default Vue => {
    Vue.component('main-app', App);
    Vue.component('welcome', Welcome);
    Vue.component('book-selection-search', BookSelectionSearch);
    Vue.component('book-selection-list', BookSelectionList);
    Vue.component('slide-transition', SlideTransition);
    Vue.component('list-transition', ListTransition);
    Vue.component('fade-transition', FadeTransition);
    Vue.component('reader', Reader);
}