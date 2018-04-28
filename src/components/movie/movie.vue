<template>
    <div id="movie">
        <backToTop @clickBack="backToTop"></backToTop>
        <md-theme md-name="blue">
            <md-tabs md-fixed :class="{'wrap-fixed': isScrollDown}" @change="onTabChange">
                <md-tab md-label="top250" id="top">
                    <movieListTop250></movieListTop250>
                </md-tab>
                <md-tab md-label="正在热映" id="hot">
                    <movieListHot></movieListHot>
                </md-tab>
                <md-tab md-label="即将上映" id="comming">
                    <movieListComing></movieListComing>
                </md-tab>
            </md-tabs>
        </md-theme>
    </div>
</template>

<script>
    import Util from "../../util/util.js"
    import movieListTop250 from "./movie_list_top250.vue"
    import movieListHot from "./movie_list_hot.vue"
    import movieListComing from "./movie_list_coming.vue"
    import backToTop from "../common/backToTop.vue"

    export default {
        data() {
            return {
                isScrollDown: false,
                activeTab: 0
            };
        },
        mounted: function () {
        },
        methods: {
            onTabChange(index){
                this.activeTab = index;
            },
            backToTop() {
                cancelAnimationFrame(timer);
                let fn = ()=>{
                    let oTop = this.$el.querySelectorAll(".j-container")[this.activeTab].scrollTop;
                    if(oTop > 0){
                        this.$el.querySelectorAll(".j-container")[this.activeTab].scrollTop = oTop - 200;
                        timer = requestAnimationFrame(fn);
                    }else{
                        cancelAnimationFrame(timer);
                    }
                };
                let timer = requestAnimationFrame(fn);
            }
        },
        components: {
            movieListTop250,
            movieListHot,
            movieListComing,
            backToTop
        }
    }
</script>
<style lang="scss">
    #movie {
        min-height: 100vh;
        box-sizing: border-box;
        padding: 64px 0;
    }

    .md-tabs {
        position: fixed;
        width: 100%;
        top: 64px;
        left: 0;
    }

    .md-tabs.wrap-fixed > .md-tabs-navigation {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
    }
</style>



