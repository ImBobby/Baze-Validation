$(function () {

    var Site = {

        init: function () {
            this.initBazeValidate();
            this.highlight();
            this.nav();
            this.exampleCheckbox();
        },

        initBazeValidate: function () {
            $('#formDemo').bazeValidate();
        },

        highlight: function () {
            hljs.initHighlighting();
        },

        nav: function () {
            var $nav    = $('.nav'),
                $navBtn = $('.nav-btn');

            var openNav = function (e) {
                $nav.toggleClass('nav--open');
            };

            $navBtn.unbind('click', openNav);
            $navBtn.bind('click', openNav);
        },

        exampleCheckbox: function () {
            $('#demoCheckbox').bazeValidate({
                onValidated: function (e) {
                    if ( !$('#dAgree').is(':checked') ) {
                        e.preventDefault();
                        alert('You have to check the checkbox');
                    }
                }
            });
        }
    };

    Site.init();       
});