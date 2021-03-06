$(document).ready(function() {
    $urlNoSlash = window.location.href.replace(/\/$/, "");
    history.replaceState(null, null, $urlNoSlash);

    $('nav .nav-item').click(function(e) {
        $('nav .nav-item').removeClass('active');
        $('nav .nav-item[data-content=' + $(this).attr('data-content') + ']').addClass('active');
        $that = $(this);
        $('#content-container').fadeOut(function() {
            history.pushState(null, null, $that.attr('data-content'));
            $('#content').load('/' + $that.attr('data-content') + '/index.html #content >');
        });
        $('#content-container').fadeIn();
    });

    $('#content-container #close').click(function(e) {
        $('nav .nav-item').removeClass('active');
        $('#content-container').fadeOut(function() {
            history.pushState(null, null, '/');
            $('#content').load('/index.html #content >');
        });
    });

    $('#mobile-menu-icon').click(function(e) {
        $('#mobile-menu-curtain').toggle();
        $(this).toggleClass('open');
        $('#mobile-menu').slideToggle(200);
    });

    $('#mobile-menu .nav-item, #mobile-menu-curtain').click(function(e) {
        $('#mobile-menu-icon').click();
    });

    $('#content-container').on('click', 'input[name="attending"]', function() {
        if ($(this, ":checked").val() == "Yes") {
            $('input[name="attendees"]').attr("disabled", false);
        } else {
            $('input[name="attendees"]').attr("disabled", true);
            $('input[name="attendees"]').val("0");
        }
    });

});

function postRSVPToGoogle() {
    if ($('input[name="phone"]').val() == "") {
        if ($('#rsvp-form input[name="name"]').val() == "" ||
            $('#rsvp-form input[name="attending"]:checked').val() == "" ||
            $('#rsvp-form input[name="attendees"]').val() == "") {
            alert("Please fill out all fields");
            return;
        }
        $.getScript('/js/GSheetAsDB.min.js', function() {
            $.holdReady(true);
            var gsheet = {
              "id": "1HLJsqslEF_VqKPH4uHbb_6Zk-ARvgY7sOEiOEifDDy4",
              "postScriptURL": "https://script.google.com/macros/s/AKfycbz_yZI5Cf_JEYomeSi3WVJGn7q4VJ5zYrdlQdS9_Sbh-Wb8lTaP/exec"
            };
            initSheetData([gsheet]);
            var data = {
                "Name": $('#rsvp-form input[name="name"]').val(),
                "Attending": $('#rsvp-form input[name="attending"]:checked').val(),
                "Number of Attendees": $('#rsvp-form input[name="attendees"]').val(),
                "Brunch": $('#rsvp-form input[name="brunch"]:checked').val() ? $('#rsvp-form input[name="brunch"]:checked').val() : ""
            };
            postDataToSheet(data, gsheet, false);
            $('#rsvp-form-container').html("<p>Thanks for RSVP'ing!</p>");
        });
    } else {
        alert("Go away, robot");
    }
}
