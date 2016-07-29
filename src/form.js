import { isFunction } from './is-function.js'
import { each } from './each-nodelist.js'
import { Input } from './input.js'

export function Form(formDom, opts) {
    form.setAttribute('novalidate', '')

    let requiredInputs = formDom.querySelectorAll('[required]')

    each(requiredInputs, (input) => {
        input.setAttribute('aria-required', 'true')
        input.setAttribute('aria-invalid', 'false')
    })

    let attachSubmitListener = (fn) => {
        formDom.addEventListener('submit', fn, false)
    }

    let clearAllMsgs = () => {
        each(formDom.querySelectorAll(`.${opts.classMsg}`), (msg) => {
            msg.parentNode.removeChild(msg)
        })
    }

    let getRequiredInputs = () => requiredInputs

    let checkEmptyValue = () => {
        let flag = false

        each(requiredInputs, (input) => {
            input = Input(input, opts)
            if ( input.isEmpty() ) {
                input.addMessage(opts.msgEmpty)
                input.addInvalidClass()
                flag = true
            } else {
                input.addValidClass()
            }
        })

        return flag
    }

    let checkNumberValue = () => {
        let flag = false

        each(requiredInputs, (input) => {
            input = Input(input, opts)
            if ( input.isType('number') ) {
                let min = input.getLimitValue('min')
                let max = input.getLimitValue('max')

                if ( !input.isNumber() ) {
                    input.clearMsg()
                    input.addMessage(opts.msgNumber)
                    input.addInvalidClass()
                    flag = true
                } else if ( min && input.val() < min ) {
                    input.clearMsg()
                    input.addMessage(input.getLimitMsg(min))
                    input.addInvalidClass()
                    flag = true
                } else if ( max && input.val() > max ) {
                    input.clearMsg()
                    input.addMessage(input.getLimitMsg(max))
                    input.addInvalidClass()
                    flag = true
                } else {
                    input.addValidClass()
                }
            }
        })

        return flag
    }

    let checkEmailValue = () => {
        let flag = false

        each(requiredInputs, (input) => {
            input = Input(input, opts)
            if ( input.isType('email') ) {
                if ( !input.isEmail() ) {
                    input.clearMsg()
                    input.addMessage(opts.msgEmail)
                    input.addInvalidClass()
                    flag = true
                } else {
                    input.addValidClass()
                }
            }
        })

        return flag
    }

    let focusOnFirstInput = () => {
        formDom.querySelector(`.${opts.classInvalid}`).focus()
    }

    let check = (result, event) => {
        if ( !result ) {
            event.preventDefault()
            focusOnFirstInput()
        }
    }

    let runCallback = (event) => {
        if ( opts.onvalidated && isFunction(opts.onvalidated) ) {
            opts.onvalidated(event)
        }
    }

    let destroy = (fn) => {
        formDom.removeEventListener('submit', fn, false)
    }

    return {
        attachSubmitListener,
        clearAllMsgs,
        getRequiredInputs,
        checkEmptyValue,
        checkNumberValue,
        checkEmailValue,
        check,
        runCallback,
        destroy
    }
}