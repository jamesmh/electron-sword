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
        <div class="search">
            <book-selection-search></book-selection-search>
        </div>
        <book-selection-list></book-selection-list>
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
        padding-bottom: 80px;
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

    .search {
        position:fixed;
        bottom: 0;
        left:0;
        width:100vw;
        z-index: 500;
        background-color: #111;
        color: #fff;
        padding-top:4px;
    }
</style>