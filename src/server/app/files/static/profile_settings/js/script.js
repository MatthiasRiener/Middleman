$('body').on('click', '#escape-button-settings', function () {
    unloadSettingsFile();
});

function unloadSettingsFile() {
    $('.profile-settings-tab').css('transform', 'scale(1.1)');

    $('.profile-settings-tab').css("display", "none");
    $('body').css("overflow", "auto");

}


$('body').on('click', '#logout-settings-page', function () {
    logOut();
});



$('body').on('click', '.sidebar-settings-item', function () {


    $('.sidebar-settings-item').removeClass("active-settings-item");
    $(this).addClass("active-settings-item");

    var el = $(this);
    var id = el[0].id.replace('sidebar-item-', '');

    var text = el[0].innerText;

    $('#section-title-settings > p').text(text);
    $('.section-container-settings > div').css("display", "none");
    $('.section-' + id).css("display", "block");

});


$('body').on('click', '.questions-mark-container', function () {
    var el = $(this).closest('.frequently-asked-question-item');
    el.children('p').toggle();
    $(this).toggleClass("question-open");
});


$('body').on('click', '#sidebar-item-my-language', function () {
    $('.my-language-item').each(function (index) {
        var el = $(this)[0].id;
        var imageUrl = `https://www.countryflags.io/${el}/flat/64.png`;
        $(this).children(".flag-image").css('background-image', 'url(' + imageUrl + ')');
    })
});