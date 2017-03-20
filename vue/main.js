import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './App.vue'
import registerComponents from './registerComponents';
import registerGlobals from './registerGlobals';
import registerDirectives from './registerDirectives';
import "../static/sass/styles.scss";

Vue.prototype.$globals = registerGlobals();
Vue.prototype.$ipc = require('electron').ipcRenderer;
registerComponents(Vue);
registerDirectives(Vue);

Vue.use(VueRouter)
const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});