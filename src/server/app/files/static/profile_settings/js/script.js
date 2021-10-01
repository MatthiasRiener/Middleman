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
    var el = $(this);
    var id = el[0].id.replace('sidebar-item-', '');

    var text = el.children('p').eq(0).text();

    $('#section-title-settings > p').text(text);
    $('.section-container-settings > div').css("display", "none");
    $('.section-' + id).css("display", "block");
});


$('body').on('click', '#refresh-token-test', function () {
    sendRequestToServer({ type: 'GET', url: '/authentication/get-token' }).then(data => {
        console.log("RESPOINSE FONDNSANDASND");
        console.log(data)
    });
})