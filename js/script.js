$(document).ready(function() {

    $('nav a').click(function(e) {
        history.pushState(null, null, $(this).attr('data-content'));
        $('#content-container').css('display', 'block');
        $('#content').load('/' + $(this).attr('data-content') + '/index.html #content >');
    });

    $('#content-container #close').click(function(e) {
        history.pushState(null, null, '/');
        $('#content-container').css('display', 'none');
        $('#content').load('/index.html #content >');
    });

});