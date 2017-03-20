<template>
  <transition-group
    name="list-transition"
    :tag="tag"
     enter-active-class="animated bounceIn"
    leave-active-class="animated bounceOut"
    mode="out-in"
  >
  <slot></slot>
  </transition-group>
</template>

<script>
export default {
    props: ["tag"]
}
</script>

<style scoped>
    .animated {
        animation-duration: .6s;
    }
</style>