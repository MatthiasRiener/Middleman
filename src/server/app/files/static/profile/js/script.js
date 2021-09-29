


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
