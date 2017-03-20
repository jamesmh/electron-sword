import { shell } from 'electron';

export default (Vue) => {
  Vue.directive('browserLink', {
    inserted: function (el, binding) {
      el.addEventListener("click", function (e) {
        event.preventDefault();
        shell.openExternal(binding.value);
      })
    }
  })
}
