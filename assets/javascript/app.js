$(document).ready(function () {
    /********************************
    GO TO TOP BUTTON
    ********************************/
    /*Scroll to top when arrow up clicked */
    $(window).scroll(function () {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('#go-to-top-btn').fadeIn();
        } else {
            $('#go-to-top-btn').fadeOut();
        }
    });
    $("#go-to-top-btn").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    /********************************
    CV
    ********************************/
    function openPdf(e, path, redirect) {
        // stop the browser from going to the href
        e = e || window.event; // for IE
        e.preventDefault();

        // launch a new window with your PDF
        window.open(path, 'somename', ... /* options */);

        // redirect current page to new location
        window.location = redirect;
    }
});