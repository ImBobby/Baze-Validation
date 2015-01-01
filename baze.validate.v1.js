

;(function ( $, window, document, undefined ) {

  function log( msg ) {
    console.log( msg );
  }

  var defaults = {
    classError  : 'form-input--error',
    classSuccess: 'form-input--success',
    classMsg    : 'form-msg-error',

    msgEmpty    : 'This field is required.',
    msgEmail    : 'Invalid email address.',
    msgNumber   : 'Input must be number.'
  };

  function BazeValidate ( element, userOptions ) {
    plugin          = this;
    plugin._elem    = $(element);
    plugin._opts    = $.extend({}, defaults, userOptions);
    plugin._inputs  = plugin._elem.find('[required]');

    plugin._setNovalidate();
    plugin._registerEvent();
  }

  $.extend( BazeValidate.prototype, {

    _init: function () {
      plugin._setNovalidate();
    },

    _setNovalidate: function () {
      plugin._elem.attr('novalidate', '');
    },

    _registerEvent: function () {
      var _this   = plugin._elem,
          _opts   = plugin._opts,
          valid   = true;

      _this.submit(function (e) {
        valid = BazeValidate.prototype._validateEmpty( _this, _opts );

        if ( !valid ) e.preventDefault();
      });
    },

    _validateEmpty: function ( form, options ) {
      var inputs  = form.find('[required]'),
          $inputs = $(inputs),
          isOK    = true;

      BazeValidate.prototype._resetClass( $inputs, options );
      BazeValidate.prototype._clearMessage( form, options );

      for (var i = 0, j = inputs.length; i < j; i++) {
        var $current  = inputs.eq(i),
            value     = $current.val();

        if ( value === '' || value === null || $.trim(value) === '' ) {
          $current.addClass( options.classError );
          BazeValidate.prototype._addMessage( $current, options, options.msgEmpty );

          isOK = false;
        } else {
          $current
            .removeClass( options.classError )
            .addClass( options.classSuccess );
        }
      }

      return isOK;
    },

    _addMessage: function ( input, options, message ) {
      var existingMsg = input.parent().find('.' + options.classMsg),
          $msg;

      if ( existingMsg.length ) {
        existingMsg.text( message );
      } else {
        $msg = $(document.createElement('span'));

        $msg
          .addClass( options.classMsg )
          .text( message )
          .insertAfter( input );
      }

    },

    _resetClass: function ( inputs, options ) {
      inputs.removeClass( options.classError + ' ' + options.classSuccess );
    },

    _clearMessage: function ( form, options ) {
      var msg = form.find('.' + options.classMsg);

      msg.remove();
    }

  });

  $.fn.bazeValidate = function ( userOptions ) {

    if ( !this.length ) return;

    return this.each( function () {
      new BazeValidate( this, userOptions );
    });

  };

})( jQuery, window, document );