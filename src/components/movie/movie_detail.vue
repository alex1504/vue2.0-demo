<template>
	<div id="movie-detail">
		<md-theme :md-name="theme">
			<headerBack :title="movieDetail.title"></headerBack>
			<md-spinner :md-size="60" md-indeterminate v-show='spinnerFlag'></md-spinner>
			<md-card class="card-movie-detail" v-show='!spinnerFlag'>
			 <md-card-area md-inset>
			   <md-card-media md-ratio="9:16">
			     <img :src="movieDetail.images ? movieDetail.images.large : ''" alt="Coffee House">
			   </md-card-media>
				
			   <md-card-header>
			     <h2 class="md-title">{{movieDetail.title}}</h2>
			     <div class="md-subhead">
			       <p>{{movieDetail.countries ? movieDetail.countries[0] : ''}}/<span v-for="genre in movieDetail.genres">{{genre}}</span></p>
			       <p>年份：{{movieDetail.year}}</p>
			     </div>
			   </md-card-header>
				
			   <md-card-content>
			     {{movieDetail.summary}}
			   </md-card-content>
			 </md-card-area> 
				
			 <md-card-content>
			   <h3 class="md-subheading">导演：{{movieDetail.directors ? movieDetail.directors[0].name : ''}}</h3>
			   <div class="card-reservation">
			     <md-avatar>
			         <img :src="movieDetail.directors ? movieDetail.directors[0].avatars.medium : ''" alt="director">
			     </md-avatar>
			    
			   </div>
			 </md-card-content>
			</md-card>
		</md-theme>  
	</div>
</template>
<script>
import headerBack from "../common/header_back.vue"
import axios from 'axios'
export default {
	data(){
		return{
			movieId: this.$route.params.id,
			movieDetail: {},
			spinnerFlag: true
		}
	},
	computed: {
		theme(){
	      return this.$store.getters.THEME_COLOR
	    }
	},
	mounted: function(){
		this.reqMovieDetail();
	},
	methods: {
		reqMovieDetail(){
			axios.get(API_PROXY+'https://api.douban.com/v2/movie/subject/'+this.movieId)
		        .then(function(res) {
		        	console.log(res);
		          this.movieDetail = res.data.id ? res.data : JSON.parse(res.request.response);
		          this.spinnerFlag = false;
		        }.bind(this))
		        .catch(function(error){
		          console.log(error);
		        });
		}
	},
	components: {
		headerBack
	}
}
</script>
<style lang="scss" scoped>
.card-movie-detail {
  margin-top: 72px;
  .md-subhead {
    .md-icon {
      $size: 16px;

      width: $size;
      min-width: $size;
      height: $size;
      min-height: $size;
      font-size: $size;
      line-height: $size;
    }

    span {
      vertical-align: middle;
    }
  }

  .card-reservation {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .md-icon {
      margin: 8px;
      color: rgba(#000, .54) !important;
    }

    .md-button {
      border-radius: 2px !important;
    }
  }
}
.md-spinner{
	margin-top: 72px;
}
</style>