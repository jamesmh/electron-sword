<template>
    <div>
        <div class="row books">
            <div class="col col-6" v-for="t in testaments">      
                <ul v-for="book in t">
                    <li>
                        <router-link :to="{ name: 'book', params: { id: book.id } }">{{ book.name }}</router-link>
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
                        id: book.b,
                        name: book.n,
                        testament: book.t
                    }))
                    .orderBy("id")
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

<style scoped lang="scss">
    .books {
        padding-left:10%;
        padding-right:10%;  

        ul li {
            list-style: none;
            margin-top: 2px;
            margin-bottom: 2px;
            padding-top: 2px;
            padding-bottom: 2px;

            &:active {
                color: #5cb3fd;
            }
        } 
    }   
</style>