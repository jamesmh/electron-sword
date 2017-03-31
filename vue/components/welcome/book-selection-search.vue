<template>
    <div class="form-group row">
        <div class="col col-2">
            <label for="welcome-serach-input">{{ label }}</label>
        </div>
        <div class="col-10">
            <input id="welcome-search-input" type="text" v-on:input="welcomeSearch" v-model="userInput" :placeholder="inputPlaceholder" class="form-control"/>
        </div>
    </div>
</template>

<script>
    const _ = require('lodash');
    let pushSearchTimeout = null;

    export default {
        data() {
            return {
                userInput: '',
                label: this.$globals.resources["welcome-search"].label,
                inputPlaceholder: this.$globals.resources["welcome-search"].placeholder
            }
        },

        methods: {
            welcomeSearch(e) {
                clearTimeout(pushSearchTimeout);
                pushSearchTimeout = setTimeout(_ => this.$ipc.send('push-welcome-search', e.target.value), 300);
            }
        }
    }
</script>

<style scoped lang="scss">
    .form-group {
        padding-left: 10px;
        padding-right:40px;

        label {
            font-size:14px;
            color:#888;
            position: absolute;
            left:20%;
            bottom: -2px;
        }

        input {
            font-family: 'Lato', sans-serif;
            background-color: transparent;
            font-weight: 300;
            border: none;
            outline: none;    
            border-bottom: 1px solid #333; 
            border-radius: 0;  
            transition: all .3s ease-in;       

            &:focus {
                color: #fff;
                border-bottom: 8px solid #5cb3fd;
                font-size: 24px;
            }
        }  
    }
    
</style>