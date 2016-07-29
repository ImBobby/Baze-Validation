const emptyArray = [];

export function each(nodelist, cb) {
    emptyArray.forEach.call(nodelist, (node) => {
        cb(node);
    });
}