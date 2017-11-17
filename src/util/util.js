import AV from "../assets/js/av"

//防抖动函数
function debounce(fn, delay, options) {
    if (options && options.immediate === true) {
        fn();
    }
    var timer
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

function isCurrentUser() {
    var currentUser = AV.User.current();
    if (currentUser) {
        return true;
    }
    return false;
}

export default {
    debounce: debounce,
    isCurrentUser: isCurrentUser
}