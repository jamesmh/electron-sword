import Welcome from './components/root/welcome.vue';
import ReadBook from './components/root/read-book.vue';

export default [
  { path: '/', name: 'home', component: Welcome },
  { path: '/book/:id', name: 'book', component: ReadBook, props: true }
]