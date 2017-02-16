<template>
<div id="book">
    <swipe class="my-swipe">
      <swipe-item class="slide1"></swipe-item>
      <swipe-item class="slide2"></swipe-item>
      <swipe-item class="slide3"></swipe-item>
    </swipe>
    <md-list class="custom-list md-triple-line">
      <md-list-item v-for="item in books">
        <md-avatar>
          <img :src="item.book.image" alt="bookPoster">
        </md-avatar>

        <div class="md-list-text-container">
          <span>{{item.book.title}}</span>
          <p>作者：{{item.book.author_intro | captureAuthor}}</p>
        </div>  

        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-brown"><i class="iconfont icon-chakan"></i></md-icon>
        </md-button>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>
    <md-spinner :class="spinnerClass" :md-size="60" md-indeterminate v-show='flag'></md-spinner>
</div>
	
</template>
<script>
import axios from "axios"
import { Swipe, SwipeItem } from 'vue-swipe';
Swipe.auto= false;
export default {
  components: {
  	Swipe,
    SwipeItem
  },
  data() {
  	 return {
       books: [],
       flag: true
  	 }
  },
  computed:{
    spinnerClass(){
      return this.$store.getters.SPINNER_CLASS
    }
  },
  mounted:function(){
    this.loadMore()
  },
  methods: {
    loadMore: function() {
        axios.get(API_PROXY+'https://api.douban.com/v2/book/user/alex1504/collections')
        .then(function(res) {
          this.books = res.data.collections;
          this.flag = false;
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  filters:{
    captureAuthor: function(val){
      return val ? val.slice(0,20)+"..." : "未知"
    }
  }
}
</script>
<style scoped lang="scss">
	#book{
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 0;
		text-align: center;
	}
  .md-list{
    padding: 0;
  }

  .my-swipe {
    width: 100%;
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    
    .mint-swipe-item{
      height: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }
  .mint-swipe-items-wrap{
      height: 100% !important;
  }

  .slide1 {
    background: url('https://img3.doubanio.com/lpic/s27102925.jpg');
    color: #fff;
  }

  .slide2 {
    background: url('https://img3.doubanio.com/lpic/s6989253.jpg');
    color: #000;
  }

  .slide3 {
    background: url('https://img3.doubanio.com/lpic/s24468373.jpg');
    color: #fff;
  }
</style>



