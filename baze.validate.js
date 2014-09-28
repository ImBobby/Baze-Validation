var BazeValidate = (function ($) {

  var options = {
    classError  : 'form-input--error',
    classSuccess: 'form-input--success'
  };

  var setClassError = function ( _class ) {
    options.classError = _class;
  };

  var setClassSuccess = function ( _class ) {
    options.classSuccess = _class;
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

    fields.removeClass( options.classError + ' ' + options.classSuccess );

    for (var i = fields.length - 1; i >= 0; i--) {
      var curr = fields.eq(i);

      if ( curr.val() === '' || curr.val() === null ) {
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

  return {
    run: run,
    setErrorClass: setClassError,
    setSuccessClass: setClassSuccess
  };

})(window.jQuery);