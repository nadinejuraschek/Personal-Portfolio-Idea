$(document).ready(function () {
    /********************************
    SCROLL ANIMATION
    ********************************/
    const scroll =  window.requestAnimationFrame || 
                    function(callback) { window.setTimeout(callback, 1000/60) };
    const elementsToShow = document.querySelectorAll(".show-on-scroll");

    function loop() {
        elementsToShow.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add("is-visible");
            } else {
                element.classList.remove("is-visible");
            };
        });
        scroll(loop);
    };
    loop();

    function isElementInViewport(element) {
        if (typeof jQuery === "function" && element instanceof jQuery) {
            element = element[0];
        };
        const rect = element.getBoundingClientRect();
        return (
            (rect.top <= 0 && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) 
                && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
            (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        );
    };

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

        // redirect current page to new location
        window.location = redirect;
    }

    /********************************
    DISPLAY OR HIDE PLAYGROUNDS
    ********************************/
    $('#show-playground').on('click', function(event) {
        event.preventDefault();
        $('#playground').toggleClass('hide');
    });
});