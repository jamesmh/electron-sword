<template>
    <div class="main">        
        <h1 class="welcome">Welcome!</h1>
        <p class="instructions">
            {{ instructions }}
        </p>

        <div class="gap"></div>
        <welcome-search></welcome-search>
        <book-list></book-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                instructions: this.$globals.resources.welcome.instructions
            }
        }
    }
</script>

<style scoped>
    .main {
        text-align: center;
    }
    .welcome {
        margin-top:80px;
    }
    
    .instructions {
        font-size: 14px;
        width: 80%;
        margin: 0 auto;
        font-weight: 200;
    }
    
    .gap {
        margin-top: 60px;
    }
</style>