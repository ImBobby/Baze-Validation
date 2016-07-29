import { Form } from './form.js'

window.bazeValidate = function (form, opts = {}) {

    const defaults = {
        classInvalid: 'input-invalid',
        classValid: 'input-valid',
        classMsg: 'msg-error',
        msgEmpty: 'This field is required',
        msgEmail: 'Invalid email address',
        msgNumber: 'Input must be number',
        msgExceedMin: 'Minimum number is {{n}}',
        msgExceedMax: 'Maximum number is {{n}}',
        onvalidated: null
    }

    function extendUserOpts() {
        for ( let prop in defaults ) {
            if ( !opts[prop] ) {
                opts[prop] = defaults[prop]
            }
        }
    }

    function validate(e) {
        let inputs = form.getRequiredInputs()
        let result = true

        form.clearAllMsgs()

        result = !form.checkEmptyValue()
        form.check(result, e)

        result = !form.checkNumberValue()
        form.check(result, e)

        result = !form.checkEmailValue()
        form.check(result, e)

        if ( result ) {
            form.runCallback(e)
        }
    }

    function destroy() {
        form.destroy(validate)
    }

    extendUserOpts()

    form = Form(form, opts)
    form.attachSubmitListener(validate)

    return {
        destroy
    }
}
