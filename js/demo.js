$(function () {

    var Site = {

        init: function () {
            this.initBazeValidate();
            this.highlight();
            this.nav();
        },

        initBazeValidate: function () {
            $('form').bazeValidate();
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
        }

    };

    Site.init();       
});