$(document).ready(function() {

    $('nav a').click(function(e) {
        history.pushState(null, null, $(this).attr('data-content'));
        $('#content').css('display', 'block');
        $('#content').load($(this).attr('data-content'));
    });

});