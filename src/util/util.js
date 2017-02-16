import AV from "../assets/js/av"
/*防抖动函数*/
function debounce(fn, delay, options) {
    if(options && options.immediate === true){
        fn();
    }
    // 定时器，用来 setTimeout
    var timer

    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function() {

        // 保存函数调用时的上下文和参数，传递给 fn
        var context = this
        var args = arguments

        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(timer)

        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}
/*生成num位数的token，默认为10位*/
function getToken(num=10){
     var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
     var str = '';
     for (var i = 0; i < num; i++){
        var pos = Math.floor(Math.random()*(arr.length));
        str += arr[pos];
     }
     return str
}
function isCurrentUser () {
  var currentUser = AV.User.current();
  if (currentUser) {
    return true;
  }
  return false;
}

export default {
	debounce: debounce,
    getToken: getToken,
    isCurrentUser:isCurrentUser
}