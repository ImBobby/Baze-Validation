;(function ( $, window, document, undefined ) {

  var pluginName = 'bazeValidate';

  /**
   * Plugin's default settings
   * @config {string} classError
   * @config {string} classSuccess
   * @config {string} classMsg
   * @config {string} msgEmpty
   * @config {string} msgEmail
   * @config {string} msgNumber
   */
  var defaults = {
    classError  : 'form-input--error',
    classSuccess: 'form-input--success',
    classMsg    : 'form-msg-error',

    msgEmpty    : 'This field is required.',
    msgEmail    : 'Invalid email address.',
    msgNumber   : 'Input must be number.'
  };

  /**
   * Represents the plugin instance
   * @param {DOM Object} element - The DOM Object
   * @param {Object} options - User options
   */
  function Plugin ( element, options ) {
    this.element    = element;
    this.$element   = $(element);
    this.settings   = $.extend( {}, defaults, options );
    this._defaults  = defaults;
    this._name      = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {
    /**
     * Set novalidate attribute to prevent browser validation
     */
    this.element.setAttribute('novalidate', '');

    /**
     * set aria-required attribute to each required inputs
     */
    this.$element.find('[required]').attr('aria-required', 'true');

    var userOpts = this.settings;

    /**
     * @param {jQuery object} form
     */
    var clearAllMessages = function ( form ) {
      var msgs = form.find('.' + userOpts.classMsg);

      $(msgs).remove();
    };

    /**
     * @param {jQuery object} field
     * @param {string} message
     */
    var addMessage = function ( field, message ) {
      var hasMsg  = field.parent().find('.' + userOpts.classMsg),
          id      = getUID(),
          msg     = $(document.createElement('span'));

      /**
       * Remove existing message
       */
      if ( hasMsg.length ) {
        hasMsg.remove();
      }

      field.attr({
        'aria-describedBy': id,
        'aria-invalid': 'true'
      });

      /**
       * Place message after input element
       */
      msg
        .addClass( userOpts.classMsg )
        .attr('id', id)
        .text( message )
        .insertAfter( field );
    };

    /**
     * @param {jQuery object} fields
     */
    var resetFields = function ( fields ) {
      fields
        .removeAttr('aria-invalid aria-describedBy')
        .removeClass( userOpts.classError )
        .removeClass( userOpts.classSuccess );
    };

    /**
     * @param {jQuery object} fields
     */
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

    /**
     * @param {jQuery object} fields
     */
    var validateEmail = function ( fields ) {
      var allIsWell = true;

      for (var i = 0, j = fields.length; i < j; i++) {
        var el    = fields[i],
            $el   = $(el),
            value = el.value,
            type  = el.type;

        /**
         * Ignore if input type is not email
         */
        if ( type !== 'email' ) {
          continue;
        }

        if ( !isEmailValid( value ) ) {
          resetFields( $el );
          $el.addClass( userOpts.classError );
          addMessage( $el, userOpts.msgEmail );
        }
      }

      return allIsWell;
    };

    /**
     * @param {jQuery object} fields
     */
    var validateNumeric = function ( fields ) {
      var allIsWell = true;

      for (var i = 0, j = fields.length; i < j; i++) {
        var el    = fields[i],
            $el   = $(el),
            value = el.value,
            type  = el.type;

        /**
         * Ignore if input type is not number
         */
        if ( type !== 'number' ) {
          continue;
        }

        if ( !$.isNumeric( value ) ) {
          resetFields( $el );
          $el.addClass( userOpts.classError );
          addMessage( $el, userOpts.msgNumber );

          allIsWell = false;
        }
      }

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

        $this.find('.' + userOpts.classError).eq(0).focus();
      }
    };

    /**
     * Attach validateFields on form submit
     */
    this.$element.on('submit', validateFields);

    /**
     * Remove validateFields from submit event
     */
    this.$element.on('bazevalidate.destroy', function () {
      var $this = $(this);

      $this.off('submit', validateFields);
      $.removeData( $this[0], 'plugin_' + pluginName );
    });
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
