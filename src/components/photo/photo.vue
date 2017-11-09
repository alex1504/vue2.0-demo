<template>
<div id="photo" class="j-container">
  <div class="j-content">
		<div class="m-gallery">
      <transition-group name="fade" tag="div">
        <div v-for="(photo,index) in photoLists" :key="photo" class="item" @click="getPhotoDetail(index)">
            <img class="animated bounceIn" :src="photo.url">
        </div>
      </transition-group>
    </div>
    <md-spinner :class="spinnerClass" :md-size="60" md-indeterminate v-show="spinnerFlag"></md-spinner>
  </div>
</div>
	
</template>
<script>

import axios from "axios"
import Store from "../../assets/js/storage.js"
export default {
  data(){
    return {
      scrContainer: null,
      scrContent: null,
      eleH: 0,
      spinnerFlag: true,
      photoLists: [],
      busy: false,
      page:1
    }
  },
  computed:{
    spinnerClass(){
      return this.$store.getters.SPINNER_CLASS
    }
  },
  mounted:function(){
    this.loadMore().then(function(){
      this.loadMore()
    }.bind(this));
    this.scrContainer = this.$el;
    this.scrContent = this.$el.querySelector(".j-content")
    this.eleH = this.scrContent.offsetHeight;
    this.scrContainer.addEventListener('scroll', function(e){
      if(this.isTouchScreenBtm(e)){
        this.loadMore();
      }
    }.bind(this))
  },
  watch: {
    photoLists: function(){
      setTimeout(function(){
        this.eleH = this.scrContent.offsetHeight;
      }.bind(this),1000)
    }
  },
  methods: {
    getPhotoDetail(index){
      this.$router.push({ name: 'photo-detail', params: {id:this.photoLists[index]._id}});
      // 存储一份到本地，进入图片详情页后刷新从本地获取
      var photoData = {'index':index, 'photoLists': this.photoLists};
      Store.set('photoData', photoData);
    },
    isTouchScreenBtm: function(e){
      var winH = window.innerHeight || document.documentElement.clientHeight;
      var navH = document.querySelector(".top-nav").offsetHeight * 2;
      var innerWinH = winH - navH + 168;
      var eleH = this.eleH;
      var scrT = this.scrContainer.scrollTop;
      if(scrT >= eleH - innerWinH){
        return true;
      }else{
        return false
      }
    },
    /*图片预加载*/
    preload: function(arr) {
        var newimages = [], loadedimages = 0;
        var postaction = function(){};
        var arr = (typeof arr != "object") ? [arr] : arr;

        function imageloadpost() {
            loadedimages++;
            if (loadedimages == arr.length) {
                //alert("图片已经加载完成");
                postaction(newimages);
            }
        }

        for (var i = 0; i < arr.length; i++) {
            newimages[i] = new Image();
            newimages[i].src = arr[i];

            if(newimages[i].complete){
              imageloadpost();
            }else{
              newimages[i].onload = function() {
                  imageloadpost();
              }
              newimages[i].onerror = function() {
                  imageloadpost();
              }
            }
        }

        return {
            done: function(f) {
                postaction = f || postaction;
            }
        }
    },
    loadMore: function() {
        if(this.busy){
           return;
        }
        var start = this.photoLists.length;
        this.busy = true;
        this.spinnerFlag = true;
        return axios.get('https://gank.io/api/data/福利/10/'+this.page)
        .then(function(res) {
          /*var arr = []
          res.data.results.forEach(photo=>{
            arr.push(photo.url)
          })
          this.preload(arr).done(function(){
            res.data.results.forEach(photo=>{
              this.photoLists.push(photo);
            })
          }.bind(this))*/
          res.data.results.forEach(photo=>{

              this.photoLists.push(photo);
          })
          this.busy = false;
          this.spinnerFlag = false;
          this.page++;
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      
      }
    }
    
}
</script>
<style scoped lang="scss">
	#photo{
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 0;
		text-align: center;
	}
  .content{
    margin: 0 auto
  }
  .j-container{
    text-align: center;
    height: 100vh;
    overflow-y: scroll
  }
  .j-content{
    min-height: 102vh;
    height: auto;
  }
  .m-gallery>div{
      display: flex; //采用flex布局
      flex-wrap: wrap;  //规定一行放不下flex元素时自动换行
  }
  .m-gallery .item{
      height: 100px;
      flex-grow:1;   //每个flex元素占的宽度相同
      margin: 2px;
  }
  .m-gallery  img{
      height: 100px;
      min-width: 100%;     
      max-width: 100%;
/*       background-color: red;
 */      object-fit: cover;      //使图片等比拉伸，可能会被裁减
      vertical-align: bottom;
  }
  @media (max-width: 1000px) and (min-width: 900px) {
    .m-gallery::after {
        content: '';
        flex-grow: 999999999;     //当最后一行图片太少的时候，比如只有一张，因为 grow 的关系，它将占满一整行，通过伪元素来占满剩余空间，防止图片拉伸
     }
  }
  @media (max-width: 1100px) and (min-width: 1000px) {
   .m-gallery::after {
        content: '';
        flex-grow: 999999999;
     }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>



