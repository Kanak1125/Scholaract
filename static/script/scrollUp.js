let offset_value = 100;

$(document).ready(function() {
    $(window).scroll(function () { 
        scrollFunction();
    });
})

function scrollFunction() {
    if(window.pageYOffset > offset_value) {
        $('.scroll_up').fadeIn(2000);
        $('.scroll_up').css({'display': 'block'});
    }
    else $('.scroll_up').fadeOut();
}