var BazeValidate = (function ($) {

  var options = {
    classError  : 'form-input--error',
    classSuccess: 'form-input--success',
    classMsg    : 'form-msg-error'
  };

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

  function run() {
    var forms   = $('form[data-baze-validate]');

    if ( !forms.length ) return;

    forms
      .attr('novalidate', '')
      .submit( validateFields );
  }

  function validateFields( evt ) {
    var _this   = $(this),
        fields  = _this.find('[required]'),
        isOK    = true;

    resetClass( fields );
    clearMessage( _this );

    for (var i = fields.length - 1; i >= 0; i--) {
      var curr = fields.eq(i);

      if ( curr.val() === '' || curr.val() === null ) {
        var msg = $(document.createElement('span'));

        msg
          .addClass( options.classMsg )
          .text('This field is required')
          .insertAfter( curr );

        curr.addClass( options.classError );

        isOK = false;
      } else {
        curr
          .removeClass( options.classError )
          .addClass( options.classSuccess );
      }
    }

    if ( !isOK ) evt.preventDefault();
  }

  function resetClass( elem ) {
    elem.removeClass( options.classError + ' ' + options.classSuccess );
  }

  function clearMessage( form ) {
    var msg = form.find('.' + options.classMsg);

    if ( !msg.length ) return;

    msg.remove();
  }

  return {
    run: run,
    setErrorClass: setClassError,
    setSuccessClass: setClassSuccess,
    setMsgClass: setClassMsg
  };

})(window.jQuery);