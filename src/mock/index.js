import Mock from 'mockjs';

/*API-movie*/
var movie = Mock.mock("/api/movie",{
	'list|1-10': [{
        'id|+1': 1
    }]
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


