$(function () {

    var Site = {

        init: function () {
            this.initBazeValidate();
            this.highlight();
            this.titleParallax();
        },

        initBazeValidate: function () {
            $('form').bazeValidate();
        },

        highlight: function () {
            hljs.initHighlighting();
        },

        titleParallax: function () {
            var header = document.querySelector('.main-header'),
                checkpoint = header.clientHeight;

            window.addEventListener('scroll', function ( evt ) {
                var pos = window.scrollY;
                var opacityVal = ((pos/200) - 1) * -1;

                if ( pos < checkpoint ) {
                    header.style.transform = 'translateY(' + pos/4*-1 + 'px)';
                    header.style.opacity = opacityVal;
                }
            }, false);
        }

    };

    Site.init();       
});