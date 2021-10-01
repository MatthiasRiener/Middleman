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

