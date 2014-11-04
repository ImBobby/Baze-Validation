/*! Baze Validation v0.6.0 | (c) 2014 @_bobbylie | https://github.com/ImBobby/Baze-Validation */

var BazeValidate = (function ($) {

  var options = {
    classError  : 'form-input--error',
    classSuccess: 'form-input--success',
    classMsg    : 'form-msg-error',

    msgEmpty    : 'This field is required.',
    msgEmail    : 'Invalid email address.',
    msgNumber   : 'Input must be number.'
  };


  /**
   * ---------------------- *
   * Public functions & API *
   * ---------------------- *
   */

  var setClassError = function ( _class ) {
    options.classError = _class;

    return this;
  };

  var setClassSuccess = function ( _class ) {
    options.classSuccess = _class;

    return this;
  };

  var setClassMsg = function ( _class ) {
    options.classMsg = _class;

    return this;
  };

  var run = function ( userOpts ) {
    var forms = $('form[data-baze-validate]'),
        opts;

    if ( !forms.length ) return;

    opts = userOpts || options;

    $.extend(options, userOpts);
    
    forms
      .attr('novalidate', '')
      .submit( validateFields );
  };


  /**
   * -------------- *
   * Core functions *
   * -------------- *
   */

  function validateFields( evt ) {
    var _this   = $(this),
        invalid = [],
        // Flag
        isOK;

    isOK = validateEmpty( _this, invalid );

    if ( !isOK ) evt.preventDefault();

    isOK = validateNumber( _this, invalid );

    if ( !isOK ) evt.preventDefault();

    isOK = validateEmail( _this, invalid );

    if ( !isOK ) {
      invalid[0].focus();
      evt.preventDefault();
    }
  }

  function validateEmpty( form, invalid ) {
    var fields  = form.find('[required]'),
        isOK    = true;

    resetClass( fields );
    clearMessage( form );

    for ( var i = 0; i < fields.length; i++ ) {
      var curr    = fields.eq(i),
          currVal = curr.val();

      if ( currVal === '' || currVal === null || $.trim(currVal) === '' ) {
        curr.addClass( options.classError );

        addMessage( curr, options.msgEmpty );

        invalid.push(curr);

        isOK = false;
      } else {
        curr
          .removeClass( options.classError )
          .addClass( options.classSuccess );
      }
    }

    if ( !isOK ) {
      return false;
    }

    return true;
  }

  function validateEmail( form, invalid ) {
    var fields  = form.find('[type="email"]'),
        isOK    = true;

    if ( !fields.length ) return isOK;

    resetClass( fields );

    for ( var i = 0; i < fields.length; i++ ) {
      var curr    = fields.eq(i),
          currVal = curr.val();

      if ( !isEmailValid( currVal ) ) {
        curr.addClass( options.classError );

        addMessage( curr, options.msgEmail );

        invalid.push(curr);

        isOK = false;
      } else {
        curr
          .removeClass( options.classError )
          .addClass( options.classSuccess );
      }
    }

    if ( !isOK ) {
      return false;
    }

    return true;
  }

  function validateNumber( form, invalid ) {
    var fields  = form.find('[type="number"]'),
        isOK    = true;

    if ( !fields.length ) return isOK;

    resetClass( fields );

    for ( var i = 0; i < fields.length; i++ ) {
      var curr    = fields.eq(i),
          currVal = curr.val();

      if ( !$.isNumeric( currVal ) ) {
        curr.addClass(options.classError);

        addMessage(curr, options.msgNumber );

        invalid.push(curr);

        isOK = false;
      } else {
        curr
          .removeClass( options.classError )
          .addClass( options.classSuccess );
      }
    }

    if ( !isOK ) {
      return false;
    }

    return true;
  }


  /**
   * ---------------- *
   * Helper functions *
   * ---------------- *
   */

  function addMessage ( elem, message ) {
    var exist = elem.parent().find('.' + options.classMsg),
        msg;
    
    if ( exist.length ) {
      exist.text( message );
    } else {
      msg = $(document.createElement('span'));

      msg
        .addClass( options.classMsg )
        .text( message )
        .insertAfter( elem );
    }
  }

  function resetClass( elem ) {
    elem.removeClass( options.classError + ' ' + options.classSuccess );
  }

  function clearMessage( form ) {
    var msg = form.find('.' + options.classMsg);

    msg.remove();
  }

  function isEmailValid( email ) {
    // http://badsyntax.co/post/javascript-email-validation-rfc822
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
  }

  return {
    run: run,
    setErrorClass: setClassError,
    setSuccessClass: setClassSuccess,
    setMsgClass: setClassMsg
  };

})(window.jQuery);