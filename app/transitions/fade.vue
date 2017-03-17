<template>
    <transition
    name="fade"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
    >
        <slot></slot>
    </transition>
</template>

<style scoped>
    .animated {
        animation-duration: .3s;
    }
</style>