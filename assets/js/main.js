/*
* Main JS */

jQuery(document).ready(function($){'use strict';

    /* --------------------------------------
    *       1. Home Slider
    *  -------------------------------------- */
    $('.minslider-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

});
