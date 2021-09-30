
$('body').on('click', '#escape-button-settings', function () {
    unloadSettingsFile();
});

function unloadSettingsFile() {

    $('.profile-settings-tab').css("display", "none");
    $('body').css("overflow", "auto");
}