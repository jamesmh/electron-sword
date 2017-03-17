<template>
  <transition-group
    name="list-transition"
    :tag="tag"
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
    .list-transition-move {
        transition: transform .4s;
    }
</style>