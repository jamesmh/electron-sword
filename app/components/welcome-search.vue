<template>
    <div class="row">
        <div class="col col-2"></div>
        <div class="col col-8">
            <div class="form-group">
                <label for="welcome-serach-input">{{ label }}</label>
                <input id="welcome-search-input" type="text" v-on:input="welcomeSearch" v-model="userInput" :placeholder="inputPlaceholder" class="form-control"/>
            </div>
        </div>
        <div class="col col-2"></div>
    </div>
</template>

<script>
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
                this.$ipc.send('push-welcome-search', e.target.value);
            }
        }
    }
</script>

<style scoped lang="scss">
    .form-group input {
        background-color: transparent;
        color: #eee;

        &:active {
            border-color: #5cb3fd;
        }          
    }  
    
</style>