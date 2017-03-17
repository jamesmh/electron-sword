<template>
    <div>
        <div class="row books">
            <div class="col col-6" v-for="t in testaments"> 
                <list-transition tag="ul">                
                    <li v-for="book in t" :key="book" class="book-link">
                        <router-link :to="{ name: 'book', params: { id: book.id } }">{{ book.name }}</router-link>
                    </li>   
                </list-transition>           
            </div>
        </div>
    </div>
</template>

<script>
    import { formatAndFilterBooks } from '../services/bookService';
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
            this.$ipc.on('pull-books', provideBooksHandler);
        },

        destroyed () {
            this.$ipc.removeListener("pull-welcome-search", pullSearchHandler);
            this.$ipc.removeListener("pull-books", provideBooksHandler);
        },

        computed: {
            testaments() {
                if (this.books.length > 0) {
                    return formatAndFilterBooks(this.books, this.bookFilter); 
                } else {
                    this.$ipc.send("push-books");
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
    }   

    .book-link {
        padding: 0;
        list-style-type: none;
        margin:0;

        a {
            padding: 0;
            margin: 0;
            font-size: 12px;
        }
    }
</style>