<template>
    <div>
        <div class="side-pane">
            <router-link to="/" class="home-link"><i class="fa fa-home" aria-hidden="true"></i></router-link>

            <div class="row chapter-nav">
                <div class="col col-6 prev-col">
                    <a v-if="!this.isFirstChapter" @click="prevChapter" class="prev"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                </div>
                <div class="col col-6 next-col">
                    <a v-if="!this.isLastChapter" @click="nextChapter" class="next"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <div class="chapters">
                <div class="row">
                    <div v-for="forChapter in numberOfChapters" class="col col-6 chapter">
                        <a @click="fetchChapter(forChapter)">{{ forChapter }}</a>
                        <i v-if="forChapter === this.chapter" class="fa fa-thumb-tack" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>

        <p class="content" v-html="text"></p>
    </div>
</template>

<script>
let provideContentHandler = null;

export default {
    props: [ 'bookId' ],

    data() {
        return {
            currentBookId: this.bookId,
            content: '',
            chapter: 1,
            isLastChapter: false,
            isFirstChapter: false,
            numberOfChapters: 0
        }
    },

    mounted(){
        this.registerFetchContent();
        this.fetchContent();
    },

    destroyed () {
        this.$ipc.removeListener('pull-content', provideContentHandler);
    },

    computed: {
        text() {             
            return this.content;
        }
    },

    methods: {
        nextChapter() {
            this.chapter++;
            this.fetchContent();
        },
        prevChapter() {
            this.chapter--;
            this.fetchContent();
        },
        fetchContent() {
            this.$ipc.send('push-content', this.currentBookId, this.chapter );
        },
        fetchChapter(selectedChapter) {
            this.chapter = selectedChapter;
        },
        registerFetchContent() {
            provideContentHandler = (e, content, numberOfChapters, isFirstChapter, isLastChapter) => {
                debugger;
                this.content = content;
                this.numberOfChapters = numberOfChapters;
                this.isFirstChapter = isFirstChapter;
                this.isLastChapter = isLastChapter;
            };
            this.$ipc.on('pull-content', provideContentHandler);
        }
    }
}
</script>

<style scoped lang="scss">
    .home-link, .next, .prev {
        padding: 8px;
        background-color: #333;
        border: 1px solid #333;
        color: #fff;
        transition: .3s all;
        display:block;
        text-decoration: none;
        cursor: pointer;
        text-align: center;

        &:hover {
            border-color: #5cb3fd;
            background-color: #5cb3fd;
            color: #fff;
        }
    }

    .chapter-nav {
        .prev-col {
            padding-right: 0;
        }
        .next-col {
            padding-left: 0;
        }
    }

    .content {
        position: absolute;
        right: 0;
        width:90%;
        padding: 10%;
        font-size: 18px;
    }

    .side-pane {
        position: fixed;
        left:0;
        width:10%;
        height:100%;
        border-right: 1px solid #5cb3fd;
        transition: all .3s;

        &:hover {
            box-shadow:rgba(#5cb3fd, .5) 1px 0px 10px;
        }
    }

    .chapters {
        padding: 10px;

        .chapter {
            font-size: 12px;
            cursor: pointer;
            transition: all .6;

            &:hover {
                transform: scale(1.2);
            }
        }


    }
</style>