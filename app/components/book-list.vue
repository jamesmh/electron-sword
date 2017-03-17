<template>
    <div>
        <div class="row books">
            <div class="col col-6" v-for="t in testaments"> 
                <list-transition tag="ul">                
                    <li v-for="book in t" :key="book">
                        <router-link :to="{ name: 'book', params: { id: book.id } }">{{ book.name }}</router-link>
                    </li>   
                </list-transition>           
            </div>
        </div>
    </div>
</template>

<script>
    import { formatAndFilterBooks } from '../service/bookService';
    let pullSearchHandler = null;
    let provideBooksHandler = null;

    export default {
        props: ['filter'],
        data() {
            return {
                books: [],
                bookFilter: this.filter
            }
        },

        mounted() {
            pullSearchHandler = (e, filterFromSearch) => this.bookFilter = filterFromSearch;
            provideBooksHandler = (e, books) => this.books = books;
            this.$ipc.on('pull-welcome-search', pullSearchHandler);
            this.$ipc.on('provide-books', provideBooksHandler);
        },

        destroyed () {
            this.$ipc.removeListener("pull-welcome-search", pullSearchHandler);
            this.$ipc.removeListener("provide-books", provideBooksHandler);
        },

        computed: {
            testaments() {
                if (this.books.length > 0) {
                    debugger;
                    return formatAndFilterBooks(this.books, this.bookFilter);
 
                } else {
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