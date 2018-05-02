<template>
    <div id="music-list" class="j-container">
        <md-theme :md-name="theme">
            <headerBack :title="albumName"></headerBack>
            <backToTop @clickBack="backToTop"></backToTop>
            <search @searchSong="showResults"></search>
            <md-spinner :md-size="60" md-indeterminate v-if='spinnerFlag'></md-spinner>
            <md-list v-if="flag" v-show="!spinnerFlag">
                <md-list-item v-for="(music, index) in activeList" :key="index" @click='goPlay(index)'
                              :class="bgState[index]">
                    <md-avatar>
                        <img :src="music.album.picUrl" alt="People">
                    </md-avatar>
                    <span>{{music.name | getShortName}}/<span
                            id="duration">{{music.duration | formatTime}}</span></span>
                    <md-button class="md-icon-button md-list-action">
                        <md-icon class="md-primary md-theme-teal"><i :class="['iconfont', iconState[index]]"></i>
                        </md-icon>
                    </md-button>
                    <div class="progress" :style="{ 'width': audioProgress}" v-show="music.playing"></div>
                </md-list-item>
            </md-list>
            <md-list v-if="!flag" v-show="!spinnerFlag">
                <md-list-item v-for="(music, index) in searchList" :key="index" @click='goPlay(index)'
                              :class="bgState[index]">
                    <md-avatar>
                        <img :src="music.album.picUrl" alt="People">
                    </md-avatar>
                    <span>{{music.name | getShortName}}/<span
                            id="duration">{{music.duration | formatTime}}</span></span>
                    <md-button class="md-icon-button md-list-action">
                        <md-icon class="md-primary md-theme-teal"><i :class="['iconfont', iconState[index]]"></i>
                        </md-icon>
                    </md-button>
                    <div class="progress" :style="{ 'width': audioProgress}" v-show="music.playing"></div>
                </md-list-item>
            </md-list>
        </md-theme>
    </div>
</template>
<script>
    import Search from "./search_music.vue"
    import BackToTop from "../common/backToTop.vue"
    import axios from "axios"
    import Store from "../../assets/js/storage.js"
    import HeaderBack from "../common/header_back.vue"

    export default {
        components: {
            search: Search,
            backToTop: BackToTop,
            headerBack: HeaderBack
        },
        data() {
            return {
                id: this.$route.params.listId,
                flag: true,
                searchList: [],
                spinnerFlag: false
            };
        },
        computed: {
            theme() {
                return this.$store.getters.THEME_COLOR
            },
            albumName() {
                const mapAlbum = {
                    19723756: "飙升榜",
                    3779629: "新歌榜",
                    2884035: "原创榜",
                    21845217: "KTV麦榜",
                    4395559: "华语金曲榜",
                    98833242: "我的专辑",
                }
                return mapAlbum[this.id]
            },
            activeList() {
                return this.$store.state.music.activeList
            },
            activeListId() {
                return this.$store.state.music.activeListId
            },
            audioProgress() {
                return this.$store.state.music.activePercent
            },
            iconState() {
                var temp = [];
                var state = '';
                this.activeList.forEach(obj => {
                    state = (obj.playing === true) ? 'icon-pause' : 'icon-play';
                    temp.push(state)
                })
                return temp;
            },
            bgState() {
                var temp = [];
                var state = '';
                this.activeList.forEach(obj => {
                    state = (obj.playing === true) ? 'active' : '';
                    temp.push(state)
                })
                return temp;
            },
            searchListIconState() {
                var temp = [];
                var state = '';
                this.searchList.forEach(obj => {
                    state = (obj.playing === true) ? 'icon-pause' : 'icon-play';
                    temp.push(state)
                })
                return temp;
            }
        },
        mounted: function () {
            // 这里注意this.$route.params.id获取的类型是Number，所以用==等号比较
            if (typeof this.activeList !== "undefined" && this.activeListId == this.id) {
                this.spinnerFlag = false;
                return;
            }
            this.getList();
        },
        filters: {
            getShortName(val) {
                if (String(val.length) > 10)
                    return val.slice(0, 10) + "...";
                return val;
            },
            formatTime(val) {
                if (typeof val === 'undefined') {
                    return '未知长度';
                }
                var m = Math.floor(val / 1000 / 60).toString();
                var s = Math.round(val / 1000 % 60).toString();
                m = (m.length == 1) ? 0 + m : m;
                s = (s.length == 1) ? 0 + s : s;
                return m + ":" + s;
            }
        },
        methods: {
            showResults(songs) {
                if (songs) {
                    this.searchList = songs;
                    this.flag = false
                } else {
                    this.flag = true;
                    this.getList();
                }
            },
            formatTime(val) {
                if (typeof val === 'undefined') {
                    return '未知长度';
                }
                var m = Math.floor(val / 1000 / 60).toString();
                var s = Math.round(val / 1000 % 60).toString();
                m = (m.length == 1) ? 0 + m : m;
                s = (s.length == 1) ? 0 + s : s;
                return m + ":" + s;
            },
            getList() {
                this.spinnerFlag = true;
                axios.get('/api/netease/common/playlist/detail?id=' + this.id)
                    .then(function (res) {
                        var playList = res.data.result.tracks;
                        // 为当前playList的每项增加一个playing状态用于指示歌曲是否正在播放
                        playList.forEach(function (obj) {
                            obj.playing = false;
                        })
                        // 提交MUSIC_LISTS_CHANGE的mutation
                        this.$store.commit('MUSIC_LISTS_CHANGE', {
                            'activeList': playList,
                            'activeListId': this.id
                        });
                        // 存储当前列表到本地
                        Store.set('music_list_' + this.$route.params.id, res.data.result.tracks);
                        // 隐藏加载图标
                        this.spinnerFlag = false;
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            showList: function () {
                this.flag = true
            },
            backToTop() {
                let timer = requestAnimationFrame(function fn(){
                    let oTop = document.body.scrollTop || document.documentElement.scrollTop;
                    if(oTop > 0){
                        document.body.scrollTop = document.documentElement.scrollTop = oTop - 200;
                        timer = requestAnimationFrame(fn);
                    }else{
                        cancelAnimationFrame(timer);
                    }
                });
            },
            goPlay(index) {
                // 如果为搜索列表
                if (!this.flag) {
                    /*存储当前歌曲数据到本地*/
                    Store.set("activeSong", {
                        id: this.searchList[index].id,
                        albumName: this.searchList[index].album.name,
                        avatarUrl: this.searchList[index].album.picUrl,
                        name: this.searchList[index].name,
                        singer: this.searchList[index].artists[0].name,
                        duration: this.formatTime(this.searchList[index].duration),
                        activeIndex: index
                    })
                    /*提交MUSIC_SONG_CHANGE的mutation*/
                    this.$store.commit('MUSIC_SONG_CHANGE', {
                        id: this.searchList[index].id,
                        albumName: this.searchList[index].album.name,
                        avatarUrl: this.searchList[index].album.picUrl,
                        activeSrc: this.searchList[index].audio,
                        activeIndex: index,
                        duration: this.searchList[index].duration,
                    })
                }
                // 如果为专辑列表
                else {
                    /*存储当前歌曲数据到本地*/
                    Store.set("activeSong", {
                        id: this.activeList[index].id,
                        albumName: this.activeList[index].album.name,
                        avatarUrl: this.activeList[index].album.picUrl,
                        name: this.activeList[index].name,
                        singer: this.activeList[index].artists[0].name,
                        duration: this.formatTime(this.activeList[index].duration),
                        activeIndex: index
                    })
                    /*提交MUSIC_SONG_CHANGE的mutation*/
                    this.$store.commit('MUSIC_SONG_CHANGE', {
                        id: this.activeList[index].id,
                        albumName: this.activeList[index].album.name,
                        avatarUrl: this.activeList[index].album.picUrl,
                        activeSrc: this.activeList[index].mp3Url,
                        activeIndex: index,
                        duration: this.activeList[index].duration,
                    })
                }
                /*音乐播放状态改变*/
                this.$store.commit('PLAY_STATE_CHANGE', {
                    playing: true
                })
                /*重置高亮行数*/
                this.$store.commit("LYRIC_DATA_LINEINDEX_CHANGE", {
                    lineIndex: -1
                })
                /*重置LYRIC_DATA比较指针*/
                this.$store.commit("LYRIC_DATA_INDEX_CHANGE", {
                    index: 0
                })
                /*跳转*/
                this.$router.push({
                    name: 'music-play',
                    params: {
                        songId: this.activeList[index].id
                    }
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    #music-list {
        min-height: 100vh;
        box-sizing: border-box;
        padding: 64px 0 0 0;
        text-align: center;
    }

    .progress {
        position: absolute;
        height: 2px;
        left: 0;
        bottom: 0px;
        background-color: rgba(0, 128, 128, .5)
    }

    .active {
        background-color: rgba(218, 218, 218, 0.57);
    }
</style>



