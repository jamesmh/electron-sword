import App from './App.vue'
import Welcome from './components/welcome.vue';
import WelcomeSearch from './components/welcome-search.vue';

export default Vue => {
    Vue.component('main-app', App);
    Vue.component('welcome', Welcome);
    Vue.component('welcome-search', WelcomeSearch);
}