<template>
    <div class="main">
        <h2 class="title">
            <span class="icon rounded-circle" style="background-image: url('./static/img/sword.png')"></span>
            {{ title }}
        </h2>
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
                title: this.$globals.resources.welcome.title,
                instructions: this.$globals.resources.welcome.instructions
            }
        }
    }
</script>

<style scoped lang="scss">
    .main {
        text-align: center;
    }

    .title {
        margin-top:30px;
        margin-bottom: 10px;

        .icon {
            height: 40px;
            width: 40px;
            background-size: contain;
            display: inline-block;
            vertical-align: sub;
            box-shadow: #fff 0 0 6px;
        }
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