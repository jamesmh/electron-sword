<template>
    <div>
        <h1>Read</h1>
        <p class="content" v-html="text"></p>
        <router-link to="/" class="home-link">Go Back Home</router-link>
    </div>
</template>

<script>
export default {
    props: [ 'bookId' ],

    data() {
        return {
           content: ''
        }
    },

    mounted(){
        this.$ipc.on('provide-content', (event, content) => {
            console.log('content provided');
            this.content = content;
        });
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
    .home-link {
        position: fixed;
        top: 8px;
        right: 8px;
        padding: 4px;
        background-color: #999;
        border-radius: 8px;
    }

    .content {
        padding: 40px;
        font-size: 12px;
    }
</style>