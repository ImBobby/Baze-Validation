let idCounter = 0;

export function getUid() {
    idCounter++;
    return `bv${idCounter}${(new Date()).getTime()}`;
}