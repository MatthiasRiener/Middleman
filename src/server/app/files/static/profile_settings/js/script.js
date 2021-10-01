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

    console.log(el)
});


