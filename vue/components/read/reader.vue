<template>
    <div>
        <div class="chapters">
            <div class="form-group">
                <select class="form-control" @change="fetchChapter" :value="this.chapter">                 
                    <option v-for="chapterOption in numberOfChapters" :value="chapterOption" :disabled="chapterOption === this.chapter">
                        Chapter: {{ chapterOption }}
                    </option>
                 </select>
            </div>
        </div>
        <div class="navigation">
            <router-link to="/" class="home-link"><i class="fa fa-home" aria-hidden="true"></i></router-link>

            <div class="row">
                <div class="col col-6 prev-col">
                    <a v-if="!this.isFirstChapter" @click="prevChapter" class="prev"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                </div>
                <div class="col col-6 next-col">
                    <a v-if="!this.isLastChapter" @click="nextChapter" class="next"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
        
        <div class="content" v-html="text"></div>
    </div>
</template>

<script>
    let provideContentHandler = null;
    const Chapter = require('../../../app/models/chapter');

    export default {
        props: ['bookId'],

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

        mounted() {
            this.registerFetchContent();
            this.fetchContent();
        },

        destroyed() {
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

            fetchChapter(e) {
                console.log('selected chapter ' + e.target.value);
                this.chapter = Number(e.target.value);
                this.fetchContent();
            },

            fetchContent() {
                console.log(`bookID: ${this.currentBookId}, chapter: ${this.chapter}`)
                this.$ipc.send('push-content', this.currentBookId, this.chapter);
            },

            registerFetchContent() {
                provideContentHandler = (e, content, numberOfChapters, isFirstChapter, isLastChapter) => {
                    this.content = new Chapter(content).toHtml();
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
    .home-link,
    .next,
    .prev {
        padding: 8px;
        border: 1px solid #333;
        color: #fff;
        transition: .3s all;
        display: block;
        text-decoration: none;
        cursor: pointer;
        text-align: center;
        &:hover {
            border-color: #5cb3fd;
            background-color: #5cb3fd;
            color: #fff;
        }
    }
    
    .content {
        position: absolute;
        right: 0;
        width: 90%;
        padding-right:40px;
        padding-top: 120px;
        font-size: 20px;
        font-weight: 300;
        line-height: 1.5;      
    }
    
    .navigation {
        background-color: #333;
        height:auto;
        width: 120px;
        position: fixed;
        left: 4px;
        top: 4px;
        border: 4px solid transparent;
        transition: all .3s;
        z-index: 500;

        &:hover {
            border-color: #5cb3fd;
        }

        .prev-col {
            padding-right: 0;
        }
        .next-col {
            padding-left: 0;
        }
    }
    
    .chapters {
        height:auto;
        width: 160px;

        background-color: #333;
        padding:8px;
        position: absolute;
        top: 4px;
        right: 4px;
        border: 4px solid transparent;
        transition: all .3s;
        z-index: 500;

        &:hover, &:active {
            border-color: #5cb3fd;
        }

        select {
            margin-top:12px;
            font-size: 12px;
            font-weight: 500;
            color: #5cb3fd;
            border-color: #5cb3fd;
            background-color: transparent;
        }
    }
</style>