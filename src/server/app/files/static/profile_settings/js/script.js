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


$('body').on('click', '.my-language-item', function () {
    $('.my-language-item').removeClass("language-selected");
    $(this).addClass("language-selected");
});



$(document).on("mouseenter", ".profile-container-top-banner-settings-image", function (e) {
    $(this).addClass("profile-is-hovering");
});

$(document).on("mouseleave", ".profile-container-top-banner-settings-image", function (e) {
    $(this).removeClass("profile-is-hovering");
});

// profile-container-top-banner-settings

$(document).on("mouseenter", ".profile-container-top-banner-settings", function (e) {
    $(".banner-hover-container").addClass("banner-hovering-class");
});

$(document).on("mouseleave", ".profile-container-top-banner-settings", function (e) {
    $(".banner-hover-container").removeClass("banner-hovering-class");
});


$('body').on('click', '.change-setting-button, .profile-settings-button, .privacy-request-data', function () {
    var id = $(this)[0].id.replace("btn-", "");
    $('.' + id + "-change").css("visibility", "visible");
})

$('body').on('click', '.change-setting-cancel > p, .change-setting-close, .change-setting-overall', function (e) {
    if (e.target != this) return;
    var el = $(this).closest(".change-setting-overall");
    el.css("visibility", "hidden");
})


$('body').on('click', '.change-setting-done', function () {
    var el = $(this).closest('.change-setting-overall');
    var id = el[0].id.toString();


    // user möchte account detail ändern
    if (id.startsWith("changing-")) {
        console.log("Changing Section")
        id = id.replace("changing-", "");

        var bodyContainer = el.children('.change-setting-popup').children('.change-setting-body');

        var newValue = "";
        var confirmationPassword = "";



        $('input', bodyContainer.children('.change-settings-input-field')).each(function () {
            var inputField = $(this);
            /* 
                possible cases: 
                input-field-new-value => neue value
                input-field-confirmation-password => confirm password
                input-field-confirmation-password-new => check if password is gleich input-field-new-value
            */

            newValue += inputField.hasClass("input-field-new-value") ? inputField.val() : '';
            confirmationPassword += inputField.hasClass("input-field-confirmation-password") ? inputField.val() : '';

            // TODO: Test Case für Password change
        });
        requestUpdate(id, newValue, confirmationPassword);
        return;
    }

    // user möchte account löschen oder deaktivieren

    if (id.startsWith("account-")) {
        console.log("Account Section: ");
        id = id.replace("account-", "");

        var bodyContainer = el.children('.change-setting-popup').children('.change-setting-body');
        var confirmationPassword = "";

        $('input', bodyContainer.children('.change-settings-input-field')).each(function () {
            var inputField = $(this);
            /* 
                possible cases: 
                input-field-new-value => neue value
                input-field-confirmation-password => confirm password
                input-field-confirmation-password-new => check if password is gleich input-field-new-value
            */

            confirmationPassword += inputField.hasClass("input-field-confirmation-password") ? inputField.val() : '';

            // TODO: Test Case für Password change
        });

        /*
            Mögliche cases:
            id => account-delete
            id => account-deactivate
        */

        if (id == 'delete') {
            deleteUser(confirmationPassword);
        } else if (id == 'deactivate') {
            deactivateUser(confirmationPassword);
        } 
        return;
    }

    // user möchte daten anfordern

    if (id.startsWith("privacy-")) {
        console.log("Privacy Section: ")
        id = id.replace("privacy-", "");

        // TODO: Handle request Data!

        return;
    }

    console.log("id: ", id);

});

