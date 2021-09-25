$('.section-group-item').click(function() {
    $('.section-group-item').removeClass("active");
    $('.section-group-item').eq($(this).index()).addClass("active");
});