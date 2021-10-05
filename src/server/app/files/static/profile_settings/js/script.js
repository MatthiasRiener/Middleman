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

// pricing section

var options = {
    "no_pricelimit": {
        "free": false,
        "lite": true,
        "standard": true,
        "pro": true,
    },
    "no_monthly_trade_limit": {
        "free": false,
        "lite": true,
        "standard": true,
        "pro": true,
    },
    "custom_status": {
        "free": false,
        "lite": true,
        "standard": true,
        "pro": true,
    },
    "parallel_trading": {
        "free": false,
        "lite": false,
        "standard": true,
        "pro": true,
    },
    "recommended_by_platform": {
        "free": false,
        "lite": false,
        "standard": false,
        "pro": true,
    },
    "grab_open_offers": {
        "free": false,
        "lite": false,
        "standard": false,
        "pro": true,
    },
    "analytics_platform": {
        "free": false,
        "lite": false,
        "standard": false,
        "pro": true,
    },
};



$('body').on('click', '.subscription-packages-item', function () {
    var el = $(this);
    $('.subscription-packages-item').removeClass("selected-package");
    $(this).addClass("selected-package");

    var id = $(this)[0].id.replace('-package', '');

    loadFeaturesById(id);

})


$('body').on('click', '#sidebar-item-my-subscriptions', function () {
    loadFeaturesById("free");
});


function loadFeaturesById(id) {
    $('.subscription-feature-checkbox').removeClass("ticked");
    $('.subscription-feature-checkbox').removeClass("unticked");


    $.each(options, function (key, value) {
        var version_allowed = value[id];
        console.log(key, version_allowed)

        var element = $('#' + key).children(".subscription-feature-checkbox");
        console.log(element)

        if (version_allowed) {
            element.addClass("ticked");
            element.html(`<ion-icon name="checkmark"></ion-icon>`);
        } else {
            element.addClass("unticked");
            element.html(`<ion-icon name="close"></ion-icon>`);
        }

    });
}


