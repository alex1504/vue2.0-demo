import AV from "../assets/js/av"

/**
 * 防抖函数
 * @param fn
 * @param delay
 * @param options
 * @returns {Function}
 */
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

/**
 * 判断是否处于登录状态
 * @returns {boolean}
 */
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