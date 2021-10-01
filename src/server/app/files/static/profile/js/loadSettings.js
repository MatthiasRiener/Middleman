

$('#profile-settings-edit').click(function() {
    loadSettingsFile();
})

loadSettingsFile();


function loadSettingsFile() {
    
    $(".profile-settings-tab").load("/profile/settings");
    $('.profile-settings-tab').css("display", "flex");
    $('body').css("overflow", "hidden");


    $('.profile-settings-tab').css('transform', 'scale(1)');

}