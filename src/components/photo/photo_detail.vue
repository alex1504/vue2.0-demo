<template>
<div id="photo-detail">
  <md-theme :md-name="theme">
    <transition name="slideT">
      <div class="login-tip" v-show="tipFlag" v-text="tip"></div>
    </transition>
    <headerBack title="photo"></headerBack>
    <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
      <img :src="photoList[index]['url']">
    </v-touch>
  </md-theme>  
</div>
	
</template>
<script>
import headerBack from "../common/header_back.vue"
import Store from "../../assets/js/storage.js"
export default {
  data(){
    return{
      localData: Store.get('photoData'),
      tip:'',
      tipFlag: false
    }
  },
  computed:{
    theme(){
      return this.$store.getters.THEME_COLOR
    },
    index(){
      return this.localData.index
    },
    photoList(){
      return this.localData.photoLists
    }
  },
  mounted:function(){
  },
  watch: {
    
  },
  methods: {
    onSwipeLeft(){
      if(this.localData.index === this.photoList.length-1){
        this.tip="这是最后一张图"
        this.tipFlag = true;
        setTimeout(function(){
          this.tipFlag = false;
        }.bind(this),2000)
        return;
      } 
      this.localData.index++;
    },
    onSwipeRight(){
      if(this.localData.index === 0){
        this.tip="这是第一张图"
        this.tipFlag = true;
        setTimeout(function(){
          this.tipFlag = false;
        }.bind(this),2000)
        return;
      } 
      this.localData.index--;
    }
  },
  components:{
    headerBack
  }
}
</script>
<style scoped lang="scss">
#photo-detail{
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center
}
#photo-detail img{
  max-width: 100%;
  max-height: 100%;
}
.login-tip{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 64px;
  line-height: 64px;
  text-align: center;
  background-color: #3f51b5;
  color: #fff;
}
.slideT-enter-active, .slideT-leave-active {
  transition: all .5s
}
.slideT-enter-active{
  transform: translateY(0);
}
.slideT-enter, .slideT-leave-active {
  transform: translateY(100%);
}

</style>



