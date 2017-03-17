<template>
    <slide-transition direction="down">
        <div>
            <p class="content" v-html="text"></p>
            <router-link to="/" class="home-link">Go Back Home</router-link>
            <router-link :to="{ name: 'book', params: { id: bookId + 1 } }" class="next">Next Chapter</router-link>
            <div v-if="bookId > 1">
                <router-link :to="{ name: 'book', params: { id: bookId - 1 } }" class="prev">Previous Chapter</router-link>
            </div>
        </div>
    </slide-transition>
</template>

<script>
let provideContentHandler = null;

export default {
    props: [ 'bookId' ],

    data() {
        return {
           content: ''
        }
    },

    mounted(){
        provideContentHandler = (e, content) => this.content = content;
        this.$ipc.on('provide-content', provideContentHandler);
    },

    destroyed () {
        this.$ipc.removeListener('provide-content', provideContentHandler);
    },

    computed: {
        text() {
            if(this.bookId !== undefined){                
                this.$ipc.send('fetch-content', { bookId: this.bookId, chapter: 1 });
            }
            return this.content;
        }
    }
}
</script>

<style scoped lang="scss">
    .home-link, .next, .prev {
        position: fixed;
        padding: 8px;
        border-radius: 8px;
        background-color: #333;
        border: 1px solid #333;
        color: #fff;
        opacity: .3;
        transition: .3s all;

        &:hover {
            opacity: 1;
            border-color: #5cb3fd;
            color: #5cb3fd;
        }
    }

    .home-link {
        top: 8px;
        right: 8px;      
    }

    .next {
        bottom: 8px;
        right:8px;
    }

    .prev {
        bottom: 8px;
        left: 8px;
    }

    .content {
        padding: 20px;
        font-size: 14px;
    }
</style>