// class manipulation taken from apollo.js 
// https://github.com/toddmotto/apollo
export function hasClass(elem, className) {
    return new RegExp(`(^|\\s)${className}(\\s|$)`).test(elem.className);
}

export function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += (elem.className ? ' ' : '') + className;
    }
}

export function removeClass(elem, className) {
    if (hasClass(elem, className)) {
        elem.className = elem.className.replace(new RegExp(`(^|\\s)*${className}(\\s|$)*`, 'g'), '');
    }
}