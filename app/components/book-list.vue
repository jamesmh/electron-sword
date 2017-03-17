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
        props: [ 'filter' ],
        data() {
            return {
                books: []
            }
        },

        mounted(){
            this.$ipc.on('pull-welcome-search', (e, filter) => this.filter = filter);
            this.$ipc.on('provide-books', (event, books) => this.books = books); 
        },

        computed: {
            testaments() {
                if(this.books.length > 0) {
                    return _(this.books).map(book => ({
                        id: book.b,
                        name: book.n,
                        testament: book.t
                    }))
                    .filter(book => { 
                        if(this.filter && this.filter != '')
                            return book.name.toUpperCase().indexOf(this.filter.toUpperCase() > -1)
                        return true;
                    })
                    .orderBy("id")
                    .groupBy("testament")
                    .value();
                }
                else {                                           
                    this.$ipc.send("fetch-books");
                    return [];
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