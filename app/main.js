import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './App.vue'
import registerComponents from './registerComponents';
import registerGlobals from './registerGlobals';
import "../static/sass/styles.scss";

Vue.prototype.$globals = registerGlobals();
registerComponents(Vue);

Vue.use(VueRouter)
const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});