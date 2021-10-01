$(window).scroll(function(){
    var scrollPos = $(document).scrollTop();
    var topBarheight = $('.top-bar').height();
    if (scrollPos > topBarheight) {
        $('.scroll-button').css("display", "flex");
    } else {
        $('.scroll-button').css("display", "none");
    }
});


$('.section-group-item').click(function () {
    $('.section-group-item').removeClass("active");
    $('.section-group-item').eq($(this).index()).addClass("active");
});

$('.section-group-item, .view-all-reviews-button').click(() => {
    goToByScroll("reviews-section")
});

function goToByScroll(id) {

    $('html,body').animate({
        scrollTop: $("#" + id).offset().top - window.innerHeight / 100 * 5
    },
        'slow');
}

$('.scroll-button').click(function () { topFunction() });

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $('html,body').animate({
        scrollTop: 0
    },
        'slow');
}



var hovering = false;

$('#top-bar-profile-picture, #expand-profile-info').mouseenter(function() {
    hovering = true;
    checkProfilePopupVisibility();
});

$('#container-around-top-bar').mouseleave(function() {
    hovering = false;
    checkProfilePopupVisibility();
});

function checkProfilePopupVisibility() {
    if (hovering) {
        $('.profile-info-popup').css("display", "flex");
    } else {
        $('.profile-info-popup').css("display", "none");
    }
}




$('body').on('click', '#logout-top-bar', function () {
    logOut();
});
