$(document).ready(function () {
    $(function () {
        $("#lifestream-menu").tabs();
    });
});

$(window).load(function () {
    $("#post-rotator").slideView();
});

function slider() {
    $("#post-rotator").trigger('click');
}
var slideOn = setInterval("slider()", 5000); // change every 3 seconds.