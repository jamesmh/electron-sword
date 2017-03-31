<template>
  <div>
    <div class="row books">
      <div class="col col-6" v-for="t in testaments">
          <div v-for="book in t" class="book-link">
            <list-transition tag="div">
              <div :key="book">
                <router-link :to="{ name: 'book', params: { bookId: book.id } }">{{ book.name }}</router-link>
              </div>
              </list-transition>
          </div>
      
      </div>
    </div>
  </div>
</template>

<script>
  let pullSearchHandler = null;
  let pullBooksHandler = null;
  const TestamentList = require('../../../app/models/testaments');

  export default {
    props: ['filter'],
    data() {
      return {
        testamentBooks: null,
        bookFilter: this.filter
      }
    },

    mounted() {
      pullSearchHandler = (e, filterFromSearch) => this.bookFilter = filterFromSearch;
      pullBooksHandler = (e, testamentBooks) => this.testamentBooks = testamentBooks;
      this.$ipc.on('pull-welcome-search', pullSearchHandler);
      this.$ipc.on('pull-books', pullBooksHandler);
    },

    destroyed() {
      this.$ipc.removeListener("pull-welcome-search", pullSearchHandler);
      this.$ipc.removeListener("pull-books", pullBooksHandler);
    },

    computed: {
      testaments() {
        if (this.testamentBooks) {
          console.log('in computed')
          console.log(this.testamentBooks)
          return TestamentList.filterByBookName(this.testamentBooks, this.bookFilter);
        } else {
          this.$ipc.send("push-books");
          return null;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .books {
    padding-left: 10%;
    padding-right: 10%;
    margin-bottom:20px;
  }
  
  .book-link {
    width: 50%;
    display: block;
    float:left;
    box-sizing: border-box;

    a {
      color: #5cb3fd;
      transition: all .6s;
      border-bottom: 3px solid transparent;
      text-decoration: none;
      padding: 0;
      margin: 0;
      font-size: 13px;
      
      &:hover {
        border-color: #5cb3fd;
      }
    }
  }
</style>