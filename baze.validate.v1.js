;(function ( $, window, document, undefined ) {

  var pluginName = 'BazeValidate';

  var defaults = {
    classError  : 'form-input--error',
    classSuccess: 'form-input--success',
    classMsg    : 'form-msg-error',

    msgEmpty    : 'This field is required.',
    msgEmail    : 'Invalid email address.',
    msgNumber   : 'Input must be number.'
  };

  function Plugin ( element, options ) {
    this.element    = element;
    this.$element   = $(element);
    this.settings   = $.extend( {}, defaults, options );
    this._defaults  = defaults;
    this._name      = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {
    this.element.setAttribute('novalidate', '');
    this.$element.find('[required]').attr('aria-required', 'true');

    var userOpts = this.settings;

    var clearAllMessages = function ( form ) {
      var msgs = form.find('.' + userOpts.classMsg);

      $(msgs).remove();
    };

    var addMessage = function ( field, message ) {
      var hasMsg  = field.parent().find('.' + userOpts.classMsg);

      if ( hasMsg.length ) {
        hasMsg.remove();
      }

      var id      = getUID();
      var msg     = $(document.createElement('span'));

      field.attr({
        'aria-describedBy': id,
        'aria-invalid': 'true'
      });

      msg
        .addClass( userOpts.classMsg )
        .attr('id', id)
        .text( message )
        .insertAfter( field );
    };

    var resetFields = function ( fields ) {
      fields
        .removeAttr('aria-invalid aria-describedBy')
        .removeClass( userOpts.classError )
        .removeClass( userOpts.classSuccess );
    };

    var validateEmpty = function ( fields ) {
      var allIsWell = true;

      fields.each( function () {
        var $field  = $(this),
            value   = $field.val();

        if ( value === '' || value === null || $.trim(value) === '' ) {
          $field.addClass( userOpts.classError );
          addMessage( $field, userOpts.msgEmpty );

          allIsWell = false;
        } else {
          $field.addClass( userOpts.classSuccess );
        }
      });

      return allIsWell;
    };

    var validateEmail = function ( fields ) {
      var allIsWell = true,
          type;

      fields.each( function (i, el) {
        var $el = $(el);
        type = el.getAttribute('type');

        if ( type === 'email' && !isEmailValid( el.value ) ) {
          resetFields( $el );
          $el.addClass( userOpts.classError );
          addMessage( $el, userOpts.msgEmail );

          allIsWell = false;
        }
      });

      return allIsWell;
    };

    var validateNumeric = function ( fields ) {
      var allIsWell = true,
          type;

      fields.each( function (i, el) {
        var $el = $(el);
        type = el.getAttribute('type');

        if ( type === 'number' && !$.isNumeric( el.value ) ) {
          resetFields( $el );
          $el.addClass( userOpts.classError );
          addMessage( $el, userOpts.msgNumber );

          allIsWell = false;
        }
      });

      return allIsWell;
    };

    var validateFields = function ( evt ) {
      var $this   = $(this),
          fields  = $this.find('[required]'),
          isOK    = true,
          focusedField,
          msg;

      resetFields( fields );
      clearAllMessages( $this );

      isOK = validateEmpty( fields );

      if ( !isOK ) evt.preventDefault();

      isOK = validateEmail( fields );

      if ( !isOK ) evt.preventDefault();

      isOK = validateNumeric( fields );

      if ( !isOK ) {
        evt.preventDefault();

        console.log($this.find('.' + userOpts.classError).eq(0));
      }
    };

    this.$element.submit( validateFields );
  };


  function isEmailValid( email ) {
    // http://badsyntax.co/post/javascript-email-validation-rfc822
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
  }

  function getUID() {
    var randInt = Math.floor((new Date).getTime()) + Math.floor((Math.random() * 100));
    var UID = 'BV' + randInt;

    return UID;
  }

  $.fn[ pluginName ] = function ( options ) {
    this.each(function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
      }
    });

    return this;
  };

})( jQuery, window, document );