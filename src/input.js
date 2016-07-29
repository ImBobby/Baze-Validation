import { hasClass, addClass, removeClass } from './class.js'
import { getUid } from './uid.js'

export function Input(input, opts) {
    let parent = input.parentNode
    let currentValue = input.value

    let val = () => currentValue

    let isType = (type) => input.getAttribute('type') === type

    let isEmpty = () => currentValue === null || currentValue === ''

    let isNumber = () => !isNaN(parseFloat(currentValue)) && isFinite(currentValue)

    let isEmail = () => {
        return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( currentValue )
    }

    let clearMsg = () => {
        let msg = parent.querySelector(`.${opts.classMsg}`)
        if (msg) {
            parent.removeChild(msg)
        }
    }

    let addMessage = (msg) => {
        let msgId = getUid()
        let msgElem = document.createElement('span')
        msgElem.setAttribute('id', msgId)
        addClass(msgElem, opts.classMsg)
        msgElem.innerText = msg
        parent.appendChild(msgElem)
        input.setAttribute('aria-describedby', msgId)
    }
    
    let addValidClass = () => {
        removeClass(input, opts.classInvalid)
        addClass(input, opts.classValid)
        input.setAttribute('aria-invalid', 'false')
        input.removeAttribute('aria-describedby')
    }

    let addInvalidClass = () => {
        removeClass(input, opts.classValid)
        addClass(input, opts.classInvalid)
        input.setAttribute('aria-invalid', 'true')
    }

    let getLimitValue = (limit) => Number(input.getAttribute(limit)) || null

    let getLimitMsg = (value) => opts.msgExceedMin.replace(/\{{2}\s*n\s*\}{2}/g, value)

    return {
        val,
        isType,
        isEmpty,
        isNumber,
        isEmail,
        clearMsg,
        addMessage,
        addValidClass,
        addInvalidClass,
        getLimitValue,
        getLimitMsg
    }
}