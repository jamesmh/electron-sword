<template>
    <div>
        <div class="row">
            <div class="col col-1" v-for="book in books">
                <p>{{ n }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    const {ipcRenderer} = require('electron')
    export default {
        data() {
            return {
                books: []
            }
        },

        mounted() {
            console.log('mounted')
            ipcRenderer.on('books', (event, books) => {
                 console.log("on books emitted")
               // this.books = books;
            });
            ipcRenderer.send("fetch-books");
        }
    }
</script>

<style scoped>
</style>