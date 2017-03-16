<template>
    <div>
        <div class="row books">
            <div class="col col-6" v-for="t in testaments">      
                <ul v-for="book in t">
                    <li>
                        <a>{{ book.name }}</a>
                    </li>  
                </ul>            
            </div>
        </div>
    </div>
</template>

<script>
    const _ = require('lodash');

    export default {
        data() {
            return {
                books: []
            }
        },

        computed: {
            testaments() {
                if(this.books.length > 0) {
                    return _(this.books).map(book => ({
                        order: book.b,
                        name: book.n,
                        testament: book.t
                    }))
                    .orderBy("order")
                    .groupBy("testament")
                    .value();
                }
                else {
                    this.$ipc.on('provide-books', (event, books) => this.books = books);                        
                    this.$ipc.send("fetch-books");
                }                   
            }
        }
    } 
</script>

<style scoped>
    .books {
        padding-left:20%;
        padding-right:20%;   
        overflow-y: scroll;
    }

    .books ul li {
        list-style: none;
        margin-top: 6px;
        margin-bottom: 6px;
    }
</style>