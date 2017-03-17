import Welcome from './components/welcome/welcome.vue';
import Reader from './components/read/reader.vue'

export default [
  { path: '/', name: 'home', component: Welcome },
  { path: '/book/:bookId', name: 'book', component: Reader, props: true }
]