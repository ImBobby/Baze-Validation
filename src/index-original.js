
window.bazeValidate = function (form, opts) {

    var idCounter = 0;

    function extendUserOpts() {
        if ( !opts || Object(opts) !== opts ) {
            opts = {};
        }

        for ( var prop in defaults ) {
            if ( !opts[prop] ) {
                opts[prop] = defaults[prop];
            }
        }
    }

    function each(nodelist, cb) {
        emptyArray.forEach.call(nodelist, function (node) {
            cb(node);
        });
    }

    function isFunction(fn) {
        return {}.toString.call(fn) == '[object Function]';
    }

    function getUid() {
        idCounter++;
        return 'bv' + idCounter + (new Date()).getTime();
    }

    // class manipulation taken from apollo.js 
    // https://github.com/toddmotto/apollo
    function hasClass(elem, className) {
        return new RegExp('(^|\\s)' + className + '(\\s|$)').test(elem.className);
    }

    function addClass(elem, className) {
        if (!hasClass(elem, className)) {
            elem.className += (elem.className ? ' ' : '') + className;
        }
    }

    function removeClass(elem, className) {
        if (hasClass(elem, className)) {
            elem.className = elem.className.replace(new RegExp('(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
        }
    }

    var emptyArray = [];

    var defaults = {
        classInvalid: 'input-invalid',
        classValid: 'input-valid',
        classMsg: 'msg-error',
        msgEmpty: 'This field is required',
        msgEmail: 'Invalid email address',
        msgNumber: 'Input must be number',
        msgExceedMin: 'Minimum number is {{n}}',
        msgExceedMax: 'Maximum number is {{n}}',
        onvalidated: null
    };

    var Input = function (input) {

        var parent = input.parentNode;

        var val = function () {
            return input.value;
        };

        var isType = function (type) {
            return input.getAttribute('type') === type;
        };

        var isEmpty = function () {
            return this.val() === null || this.val() === '';
        };

        var isNumber = function () {
            return !isNaN(parseFloat(this.val())) && isFinite(this.val());
        };

        var isEmail = function () {
            return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( this.val() );
        };

        var clearMsg = function () {
            var msg = parent.querySelector('.' + opts.classMsg);
            if (msg) {
                parent.removeChild(msg);
            }
        };

        var addMessage = function (msg) {
            var msgId = getUid();
            var msgElem = document.createElement('span');
            msgElem.setAttribute('id', msgId);
            addClass(msgElem, opts.classMsg);
            msgElem.innerText = msg;
            parent.appendChild(msgElem);
            input.setAttribute('aria-describedby', msgId);
        };
        
        var addValidClass = function () {
            removeClass(input, opts.classInvalid);
            addClass(input, opts.classValid);
            input.setAttribute('aria-invalid', 'false');
            input.removeAttribute('aria-describedby');
        };

        var addInvalidClass = function () {
            removeClass(input, opts.classValid);
            addClass(input, opts.classInvalid);
            input.setAttribute('aria-invalid', 'true');
        };

        var getLimitValue = function (limit) {
            return Number(input.getAttribute(limit)) || null;
        };

        var getLimitMsg = function (value) {
            return opts.msgExceedMin.replace(/\{{2}\s*n\s*\}{2}/g, value);
        };

        return {
            val: val,
            isType: isType,
            isEmpty: isEmpty,
            isNumber: isNumber,
            isEmail: isEmail,
            clearMsg: clearMsg,
            addMessage: addMessage,
            addValidClass: addValidClass,
            addInvalidClass: addInvalidClass,
            getLimitValue: getLimitValue,
            getLimitMsg: getLimitMsg
        };
    };

    var Form = function (formDom) {

        form.setAttribute('novalidate', '');

        var requiredInputs = formDom.querySelectorAll('[required]');

        each(requiredInputs, function (input) {
            input.setAttribute('aria-required', 'true');
            input.setAttribute('aria-invalid', 'false');
        });

        var attachSubmitListener = function (fn) {
            formDom.addEventListener('submit', fn, false);
        };

        var clearAllMsgs = function () {
            each(formDom.querySelectorAll('.' + opts.classMsg), function (msg) {
                msg.parentNode.removeChild(msg);
            });
        };

        var getRequiredInputs = function () {
            return requiredInputs;
        };

        var checkEmptyValue = function () {
            var flag = false;

            each(requiredInputs, function (input) {
                input = Input(input);
                if ( input.isEmpty() ) {
                    input.addMessage(opts.msgEmpty);
                    input.addInvalidClass();
                    flag = true;
                } else {
                    input.addValidClass();
                }
            });

            return flag;
        };

        var checkNumberValue = function () {
            var flag = false;

            each(requiredInputs, function (input) {
                input = Input(input);
                if ( input.isType('number') ) {
                    var min = input.getLimitValue('min');
                    var max = input.getLimitValue('max');

                    if ( !input.isNumber() ) {
                        input.clearMsg();
                        input.addMessage(opts.msgNumber);
                        input.addInvalidClass();
                        flag = true;
                    } else if ( min && input.val() < min ) {
                        input.clearMsg();
                        input.addMessage(input.getLimitMsg(min));
                        input.addInvalidClass();
                        flag = true;
                    } else if ( max && input.val() > max ) {
                        input.clearMsg();
                        input.addMessage(input.getLimitMsg(max));
                        input.addInvalidClass();
                        flag = true;
                    } else {
                        input.addValidClass();
                    }
                }
            });

            return flag;
        };

        var checkEmailValue = function () {
            var flag = false;

            each(requiredInputs, function (input) {
                input = Input(input);
                if ( input.isType('email') ) {
                    if ( !input.isEmail() ) {
                        input.clearMsg();
                        input.addMessage(opts.msgEmail);
                        input.addInvalidClass();
                        flag = true;
                    } else {
                        input.addValidClass();
                    }
                }
            });

            return flag;
        };

        var focusOnFirstInput = function () {
            formDom.querySelector('.' + opts.classInvalid).focus();
        };

        var check = function (result, event) {
            if ( !result ) {
                event.preventDefault();
                focusOnFirstInput();
            }
        };

        var runCallback = function (event) {
            if ( opts.onvalidated && isFunction(opts.onvalidated) ) {
                opts.onvalidated(event);
            }
        };

        var destroy = function () {
            formDom.removeEventListener('submit', validate, false);
        };

        return {
            attachSubmitListener: attachSubmitListener,
            clearAllMsgs: clearAllMsgs,
            getRequiredInputs: getRequiredInputs,
            checkEmptyValue: checkEmptyValue,
            checkNumberValue: checkNumberValue,
            checkEmailValue: checkEmailValue,
            check: check,
            runCallback: runCallback,
            destroy: destroy
        };
    };

    function validate(e) {
        var inputs = form.getRequiredInputs();
        var result = true;

        form.clearAllMsgs();

        result = !form.checkEmptyValue();
        form.check(result, e);

        result = !form.checkNumberValue();
        form.check(result, e);

        result = !form.checkEmailValue();
        form.check(result, e);

        if ( result ) {
            form.runCallback(e);
        }
    }

    extendUserOpts();

    form = Form(form);
    form.attachSubmitListener(validate);

    return {
        destroy: form.destroy
    };
};
