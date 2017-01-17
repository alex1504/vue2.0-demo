import Mock from 'mockjs';
import Util from '../util/util'
/*API-Login-登录接口模拟*/
var login = Mock.mock("/api/login",{
  "msg":"登录成功",          //登录成功过信息
  "code": 0,                 //正常
  "token": Util.getToken(),            
  "time": 240000              //有效期4分钟
})

/*API-movie*/
var movie = Mock.mock("/api/movie",{
  "rating": {
    "max": 10,
    "average": 9.6,
    "stars": "50",
    "min": 0
  },
  "genres": [
    "犯罪",
    "剧情"
  ],
  "title": "肖申克的救赎",
  "casts": [
    {
      "alt": "https://movie.douban.com/celebrity/1054521/",
      "avatars": {
        "small": "https://img3.doubanio.com/img/celebrity/small/17525.jpg",
        "large": "https://img3.doubanio.com/img/celebrity/large/17525.jpg",
        "medium": "https://img3.doubanio.com/img/celebrity/medium/17525.jpg"
      },
      "name": "蒂姆·罗宾斯",
      "id": "1054521"
    },
    {
      "alt": "https://movie.douban.com/celebrity/1054534/",
      "avatars": {
        "small": "https://img3.doubanio.com/img/celebrity/small/34642.jpg",
        "large": "https://img3.doubanio.com/img/celebrity/large/34642.jpg",
        "medium": "https://img3.doubanio.com/img/celebrity/medium/34642.jpg"
      },
      "name": "摩根·弗里曼",
      "id": "1054534"
    },
    {
      "alt": "https://movie.douban.com/celebrity/1041179/",
      "avatars": {
        "small": "https://img1.doubanio.com/img/celebrity/small/5837.jpg",
        "large": "https://img1.doubanio.com/img/celebrity/large/5837.jpg",
        "medium": "https://img1.doubanio.com/img/celebrity/medium/5837.jpg"
      },
      "name": "鲍勃·冈顿",
      "id": "1041179"
    }
  ],
  "collect_count": 1009293,
  "original_title": "The Shawshank Redemption",
  "subtype": "movie",
  "directors": [
    {
      "alt": "https://movie.douban.com/celebrity/1047973/",
      "avatars": {
        "small": "https://img3.doubanio.com/img/celebrity/small/230.jpg",
        "large": "https://img3.doubanio.com/img/celebrity/large/230.jpg",
        "medium": "https://img3.doubanio.com/img/celebrity/medium/230.jpg"
      },
      "name": "弗兰克·德拉邦特",
      "id": "1047973"
    }
  ],
  "year": "1994",
  "images": {
    "small": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p480747492.jpg",
    "large": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p480747492.jpg",
    "medium": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p480747492.jpg"
  },
  "alt": "https://movie.douban.com/subject/1292052/",
  "id": "1292052"
})

/*API-music*/
var music = Mock.mock("/api/music",{
	'list|1-10': [{
        'id|+1': 1
    }]
})



export default {
	movie,
	music
}


