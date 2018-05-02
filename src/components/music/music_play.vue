<template>
    <div id="music-play">
        <md-theme :md-name="theme">
            <headerBack :title="activeSong.albumName"></headerBack>
        </md-theme>
        <div class="container-wrap">
            <div class="container">
                <div class="lyric-wrap">
                    <img :src="activeSong.avatarUrl">
                    <div class="lyric-box">
                        <div class="lyric-content">
                            <p :class="['lyric', lineIndex === index ? 'active' : '']" v-for="(obj,index) in lyricData"
                               :data-time="obj.time" :key="index">{{obj.lyric}}</p>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <h2>{{activeSong.name}}</h2>
                    <p>{{activeSong.singer}}</p>
                    <div class="progress-wrap">
                        <div class="time play">{{curTime}}</div>
                        <div class="progress-bg">
                            <div class="progress" :style="{width: activePercent}">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                        <div class="time total">{{activeSong.duration | formatTime}}</div>
                    </div>
                    <div class="panel">
                        <i class="btn prev iconfont icon-prev" @click.prevent="playPrev()"></i>
                        <i :class="['btn play iconfont', iconState]" @click.prevent="togglePlay()"></i>
                        <i class="btn next iconfont icon-next" @click.prevent="playNext()"></i>
                    </div>
                </div>
            </div>
        </div>
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
                dis: 0,
                hArr: []
            };
        },
        computed: {
            songId() {
                return this.$store.state.music.activeSong.id || Store.get("activeSong").id
            },
            theme() {
                return this.$store.getters.THEME_COLOR
            },
            playList() {
                return this.$store.state.music.activeList || Store.get("music_list_" + Store.get('activeListId'))
            },
            activeIndex() {
                return this.$store.state.music.activeSong.activeIndex;
            },
            activeSong() {
                // 从本地获取歌曲数据
                /*var activeSongLocal = Store.get('activeSong');
                if (typeof activeSongLocal !== "undefined" && typeof activeSongLocal !== null) {
                    return {
                        id: this.id,
                        name: activeSongLocal.name,
                        singer: activeSongLocal.singer,
                        duration: activeSongLocal.duration
                    }
                }*/
                // 从vux获取歌曲数据
                var lists = this.playList;
                var index = this.$store.state.music.activeSong.activeIndex || Store.get('activeSong').activeIndex;
                return {
                    id: lists && lists[index] && lists[index].id || 0,
                    name: lists && lists[index] && lists[index].name || '',
                    singer: lists && lists[index] && lists[index].artists && lists[index].artists[0].name || '',
                    duration: this.$store.state.music.activeSong.duration,
                    avatarUrl: lists && lists[index] && lists[index].album.picUrl || '',
                    albumName: lists && lists[index] && "专辑：" + lists[index].album.name || ''
                }
            },
            playState() {
                return this.$store.state.music.playing
            },
            iconState() {
                return this.playState === true ? "icon-pause" : "icon-play"
            },
            curTime() {
                return this.$store.state.music.activeTime
            },
            activePercent() {
                return this.$store.state.music.activePercent
            },
            // 随机数用于判断是否音乐播放结束
            endNum() {
                return this.$store.state.music.endNum
            },
            // 歌词数据，为保存着time字段和lyric字段对象的数组
            lyricData() {
                return this.$store.state.music.activeSong.lyricData.lineArr
            },
            // 歌词高亮索引
            lineIndex(){
                return this.$store.state.music.activeSong.lyricData.lineIndex
            },
            // 歌词高亮类
            activeClass(index) {
                var state = [];
                for (var i = 0; i < this.lyricData.length; i++) {
                    state.push('active');
                }
                return state;
            }
        },
        watch: {
            // 当endNum变化自动播放下一首歌
            endNum() {
                this.playNext();
            },
            // 当高亮索引大于等于4之后每次变化向上滚动<p>标签的高度
            lineIndex() {
                if (this.lineIndex = -1) {
                    this.getLyricH();
                    document.querySelector(".lyric-content").style.transform = 'translateY(0px)';
                }
                if (this.lineIndex >= 4) {
                    this.dis += this.hArr[this.lineIndex - 4]
                    // var h = document.querySelector(".lyric").offsetHeight;
                    document.querySelector(".lyric-content").style.transform = 'translateY(-' + this.dis + 'px)';
                }
            }
        },
        mounted: function () {
            this.getLyric();
        },
        filters: {
            getShortName(val) {
                if (String(val.length) > 10)
                    return val.slice(0, 10) + "...";
                return val;
            },
            formatTime(val) {
                var m = Math.floor(val / 1000 / 60).toString();
                var s = Math.round(val / 1000 % 60).toString();
                m = (m.length == 1) ? 0 + m : m;
                s = (s.length == 1) ? 0 + s : s;
                return m + ":" + s;
            }
        },
        methods: {
            getLyricH() {
                var temp = [];
                document.querySelectorAll(".lyric").forEach(function (dom) {
                    var h = dom.offsetHeight;
                    temp.push(h);
                })
                this.hArr = temp;
            },
            getLyric() {
                axios.get('/api/netease/common/song/lyric?os=pc&lv=-1&kv=-1&tv=-1&id=' + this.songId)
                    .then(function (res) {
                        if (res.data.nolyric) {
                            this.$store.commit("LYRIC_DATA_CHANGE", {
                                'lyricData': [{
                                    time: '',
                                    lyric: '暂无歌词数据'
                                }]
                            });
                            return false;
                        }
                        var lyric = res.data && res.data.lrc.lyric;
                        var timeArr = [];
                        var lyricArr = [];
                        var lyricData = [];
                        // console.log(lyric);
                        lyric.split("\n").forEach(function (val, index) {
                            var timeTemp,
                                lyricTemp,
                                splitIndex;
                            var lyricDataTemp = {};
                            splitIndex = val.indexOf(']') + 1;
                            if (val.charAt(1).search(/\d/) === -1) {
                                /*排除这样的歌词行
                                [by:冰淇淋蛋黄派]
                                [ti:凉凉]
                                [ar:月狸&玄月]
                                [al:]
                                [by:冰淇淋蛋黄派]*/
                                return true;
                            }
                            timeTemp = val.slice(0, splitIndex);
                            lyricTemp = val.slice(splitIndex);
                            if (timeTemp) {
                                var m = parseInt(timeTemp.match(/\d+[\.]?\d+/g)[0]);
                                var s = parseFloat(timeTemp.match(/\d+[\.]?\d+/g)[1]);
                                var totalS = (60 * m + s).toFixed(3);
                                lyricDataTemp.time = totalS;
                            }
                            if (lyricTemp) lyricDataTemp.lyric = lyricTemp;
                            if (lyricDataTemp.time) lyricData.push(lyricDataTemp);
                        }.bind(this))
                        this.$store.commit("LYRIC_DATA_CHANGE", {
                            'lyricData': lyricData
                        });
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            togglePlay() {
                if (this.playState) {
                    this.$store.commit("PLAY_STATE_CHANGE", {
                        'playing': false
                    })
                } else {
                    this.$store.commit("PLAY_STATE_CHANGE", {
                        'playing': true
                    })
                }
            },
            playNext() {
                var index = ++this.activeIndex;
                index = index < 0 ? 0 : index;
                index = index > this.playList.length - 1 ? this.playList.length - 1 : index;
                /*提交MUSIC_SONG_CHANGE的mutation*/
                this.$store.commit('MUSIC_SONG_CHANGE', {
                    id: this.playList[index].id,
                    avatarUrl: this.playList[index].album.picUrl,
                    activeSrc: this.playList[index].mp3Url,
                    activeIndex: index,
                    duration: this.playList[index].duration,
                    playing: true
                })
                /*更改视图歌曲信息*/
                this.activeSong = {
                    id: this.playList[index].id,
                    name: this.playList[index].name,
                    singer: this.playList[index].artists[0].name,
                    avatarUrl: this.playList[index].album.picUrl,
                    duration: this.playList[index].duration,
                    activeIndex: index
                }
                /*更改本地歌曲信息*/
                Store.set('activeSong', {
                    id: this.playList[index].id,
                    name: this.playList[index].name,
                    singer: this.playList[index].artists[0].name,
                    avatarUrl: this.playList[index].album.picUrl,
                    duration: this.playList[index].duration,
                    activeIndex: index
                });
                /*重置高亮行数*/
                this.$store.commit("LYRIC_DATA_LINEINDEX_CHANGE", {
                    lineIndex: -1
                })
                /*重置LYRIC_DATA比较指针*/
                this.$store.commit("LYRIC_DATA_INDEX_CHANGE", {
                    index: 0
                })
                /*重置歌词移动距离dis*/
                this.dis = 0;
                //跳转
                /*this.$router.push({name:'music-play',params:{
                    songId: this.playList[index].id}
                })*/
                /*获取歌词*/
                this.getLyric();
            },
            playPrev() {
                var index = --this.activeIndex;
                index = index < 0 ? 0 : index;
                index = index > this.playList.length - 1 ? this.playList.length - 1 : index;
                /*提交MUSIC_SONG_CHANGE的mutation*/
                this.$store.commit('MUSIC_SONG_CHANGE', {
                    id: this.playList[index].id,
                    avatarUrl: this.playList[index].album.picUrl,
                    activeSrc: this.playList[index].mp3Url,
                    activeIndex: index,
                    duration: this.playList[index].duration,
                    playing: true
                })
                /*更改视图歌曲信息*/
                /*this.activeSong = {
                    id: this.playList[index].id,
                    name: this.playList[index].name,
                    singer: this.playList[index].artists[0].name,
                    avatarUrl: this.playList[index].album.picUrl,
                    duration: this.playList[index].duration,
                    activeIndex: index
                }*/
                /*更改本地歌曲信息*/
                Store.set('activeSong', {
                    id: this.playList[index].id,
                    name: this.playList[index].name,
                    singer: this.playList[index].artists[0].name,
                    avatarUrl: this.playList[index].album.picUrl,
                    duration: this.playList[index].duration,
                    activeIndex: index
                });
                /*重置高亮行数*/
                this.$store.commit("LYRIC_DATA_LINEINDEX_CHANGE", {
                    lineIndex: -1
                })
                /*重置LYRIC_DATA比较指针*/
                this.$store.commit("LYRIC_DATA_INDEX_CHANGE", {
                    index: 0
                })
                /*重置歌词移动距离dis*/
                this.dis = 0;
                /*跳转*/
                /*this.$router.push({name:'music-play',params:{
                    songId: this.playList[index].id}
                })*/
                this.getLyric();
            }
        }
    }
</script>
<style scoped lang="scss">
    h2 {
        font-size: 1.6rem;
    }

    div,
    p {
        font-size: 1rem;
        color: #fff;
    }

    .md-toolbar .md-title {
        font-size: 1.2rem !important;
    }

    #music-play {
        min-height: 100vh;
        box-sizing: border-box;
        padding: 64px 0 0 0;
        text-align: center;
    }

    .container-wrap {
        height: 100vh;
        box-sizing: border-box;
        padding-top: 64px;
        margin-top: -64px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #545863;
    }

    .container {
        width: 90%;
        height: 95%;
        box-shadow: 0px 0px 10px 0px #2a2c33;
        .lyric-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            position: relative;
            height: 60%;
            img {
                width: 100%;
                height: 100%;
                opacity: 0.5;
                -webkit-filter: blur(6px);
                filter: blur(6px);
            }
            &::after {
                content: "";
                position: absolute;
                z-index: 1;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: rgba(58, 58, 58, 0.75);
            }
            .lyric-box {
                position: absolute;
                box-sizing: border-box;
                padding: 0 20px;
                width: 100%;
                height: 80%;
                overflow: hidden;
                .lyric-content {
                    position: relative;
                    overflow: hidden;
                    z-index: 2;
                    width: 100%;
                    transition: all 1s;
                    transform: translateY(0px);
                }
                .lyric {
                    transition: all .3s;
                    font-size: 1.6rem;
                    color: #bdbdbd;
                    line-height: 2.2;
                    &.active {
                        transform: scale(1.1);
                        font-weight: bold;
                        color: #009688 !important;
                    }
                }
            }
        }
        .main {
            position: relative;
            height: 40%;
            box-sizing: border-box;
            padding: 6% 0;
            h2 {
                margin: 10px 0;
                line-height: 1.0;
            }
        }
    }

    .progress-wrap {
        margin: 4% 0;
        display: flex;
        align-items: center;
        .time {
            flex: 2
        }
        .progress-bg {
            position: relative;
            height: 4px;
            background-color: #757575;
            flex: 8;
            .progress {
                position: absolute;
                height: 100%;
                left: 0;
                background-color: #fff;
                .progress-bar {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: #fff;
                    left: 100%;
                    top: 50%;
                    margin-top: -6px;
                }
            }
        }
    }

    .panel {
        height: 60px;
        display: flex;
        align-items: center;
        .btn {
            color: #fff;
            font-size: 40px;
        }
        .prev,
        .next {
            flex: 4;
        }
        .play {
            font-size: 80px;
            flex: 2;
        }
    }

    @media screen and (max-width: 640px) {
        .panel .btn {
            font-size: 34px;
        }
        .panel .play {
            font-size: 60px;
        }
    }

    @media screen and (max-width: 320px) {
        .container .lyric-wrap .lyric-box .lyric {
            font-size: 1.2rem;
        }
    }
</style>



