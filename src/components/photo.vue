<template>
<div id="photo" class="j-container">
  <div class="j-content">
		<div class="m-gallery">
      <transition-group name="fade" tag="div">
        <div v-for="photo in photoLists" :key="photo" class="item">
            <img class="animated bounceIn" :src="photo.url">
        </div>
      </transition>
    </div>
    <md-spinner :md-size="60" md-indeterminate v-show="spinnerFlag"></md-spinner>
  </div>
</div>
	
</template>
<script>
import axios from "axios"
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
    loadMore: function() {
        if(this.busy){
           return;
        }
        var start = this.photoLists.length;
        this.busy = true;
        this.spinnerFlag = true;
        return axios.get('https://gank.io/api/data/福利/10/'+this.page)
        .then(function(res) {
          res.data.results.forEach(photo=>{
            this.photoLists.push(photo)
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
      object-fit: cover;      //使图片等比拉伸，可能会被裁减
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



