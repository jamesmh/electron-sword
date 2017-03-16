<template>
    <transition
    name="slide"
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeOutLeft"
    >
        <slot></slot>
    </transition>
</template>

<style scoped>
    .animated {
        animation-duration: .4s;
    }
</style>