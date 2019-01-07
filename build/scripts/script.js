$(document).ready(function(){
    $('input[name="phone"]').inputmask({"mask": "+7 (999) 999-99-99"});

    $('.product__carousel.owl-carousel').owlCarousel({
        loop:true,
        margin:65,
        nav:true,
        dots: false,
        items: 5
    })

    $('.partners__carousel.owl-carousel').owlCarousel({
        loop:true,
        margin:40,
        nav:true,
        dots: false,
        items: 5
    })
});