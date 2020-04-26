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

    /********************************
    TESTIMONIALS CAROUSEL
    ********************************/
    // state
    let prevIndex = 0;
    let currentIndex = 1;
    let nextIndex = 2;
    const lastIndex = $('#testimonial-carousel').find('.quote').length - 1;

    // click events
    $('#testimonial-carousel').on('click', '.previous', showQuote);
    $('#testimonial-carousel').on('click', '.next', showQuote);
    $('#carousel-pips').on('click', '.pip', showFromPip);

    // generate pips
    generatePips();
    // if more than four quotes
    // setLeftClass();
    showNextQuote();

    // play carousel
    // let carouselRunning = true;
    // let carouselRestartTimeout;
    // let interval = setInterval(function() {
    //     if (carouselRunning) {
    //         showNextQuote();
    //     }
    // }, 4000);

    // carousel logic
    function showNextQuote() {
        if (currentIndex === lastIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        };
        updateState(currentIndex);
    };

    function showQuote(event) {
        // get index of clicked quote and show it
        if ($(event.target).hasClass('quote')) {
            var target = $(event.target);
        } else {
            var target = $(event.target).parent();
        };
        const index = $('.quote').index(target);
        updateState(index);
    };

    function updateState(index) {
        prevIndex = index === 0 ? lastIndex : index - 1;
        currentIndex = index;
        nextIndex = index === lastIndex ? 0 : index + 1;

        updateCarouselPosition();
        // if more than four quotes
        // setLeftClass();
        updatePips();
    };

    function updateCarouselPosition() {
        $('#testimonial-carousel').find('.previous').removeClass('previous');
        $('#testimonial-carousel').find('.current').removeClass('current');
        $('#testimonial-carousel').find('.next').removeClass('next');

        const allQuotes = $('#testimonial-carousel').find('.quote');
        $(allQuotes[prevIndex]).addClass('previous');
        $(allQuotes[currentIndex]).addClass('current');
        $(allQuotes[nextIndex]).addClass('next');
    };

    function generatePips() {
        const listContainer = $('#carousel-pips').find('ul');
        for (let i = lastIndex; i >= 0; i--) {
            const newPip = $('<li class="pip"></li>');
            $(listContainer).append(newPip);
        };
        updatePips();
    };

    function updatePips() {
        $('#carousel-pips').find('.previous').removeClass('previous');
        $('#carousel-pips').find('.current').removeClass('current');
        $('#carousel-pips').find('.next').removeClass('next');

        const allPips = $('#carousel-pips').find('.pip');
        $(allPips[prevIndex]).addClass('previous');
        $(allPips[currentIndex]).addClass('current');
        $(allPips[nextIndex]).addClass('next');
    };

    function showFromPip(event) {
        let index = 0;
        while((event.target = event.target.previousSibling) != null ) {
            index++;
        };
        updateState(index);
    };

    // if more than four quotes
    // function setLeftClass() {
    //     const allQuotes = $('#testimonial-carousel').find('.quote');
    //     $('.quote.left').removeClass('left');
    //     if (prevIndex > 0) {
    //         const index = prevIndex - 1;
    //         $(allQuotes[index]).addClass('left');
    //     } else {
    //         $(allQuotes[allQuotes.length - 1]).addClass('left');
    //     }
    // };

    /********************************
    FOOTER YEAR
    ********************************/
    const currentYear = new Date().getFullYear();
    $("#year").html(currentYear);
});