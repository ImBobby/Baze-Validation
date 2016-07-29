export function isFunction(fn) {
    return {}.toString.call(fn) == '[object Function]';
}