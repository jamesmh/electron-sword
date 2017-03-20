<template>
    <transition
    name="slide"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    mode="out-in"
    >
        <slot></slot>
    </transition>
</template>

<script>
export default {
    props: [ 'direction' ],

    data(){
        return {
            enterClass: `animated fadeIn${this.animationDirection()}`,
            leaveClass: `animated fadeOut${this.animationDirection()}`,
        }
    },

    methods: {
        animationDirection() {
            if(!this.direction){
                return 'Left'
            }
            else {
                return this.direction[0].toUpperCase() + this.direction.slice(1)
            }
        }
    }
}
</script>

<style scoped>
    .animated {
        animation-duration: .6s;
    }
</style>