window.addEventListener("load", function () {
    var maxHeight = 0;
    $(".voice__card").each(function (idx, elem) {
        var height = $(elem).height();
        if (maxHeight < height) {
            maxHeight = height;
        }
    });
    $(".voice__card").height(maxHeight);
});

$(function () {
    $("#js-slider").slick({
        centerMode: true,
        centerPadding: "0",
        slidesToShow: 3,
        dots: true,
        dotsClass: "slick-dot",
        swipeToSlide: true,
        prevArrow:
            '<div class="slick-arrow-prev"><div class="slick-arrow-inner"><span class="slick-arrow-item"></span></div></div>',
        nextArrow:
            '<div class="slick-arrow-next"><div class="slick-arrow-inner"><span class="slick-arrow-item"></span></div></div>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                },
            },
        ],
    });
    $("#js-fp-slider").slick({
        autoplay: true,
        autoplaySpeed: 2500,
        centerMode: true,
        centerPadding: "0",
        slidesToShow: 3,
        dots: false,
        swipeToSlide: true,
        infinite: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: "10px",
                    slidesToShow: 1,
                    variableWidth: true,
                },
            },
        ],
    });

    $("#js-hero-carousel").slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        centerMode: true,
        swipeToSlide: false,
        draggable: false,
        focusOnSelect: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        swipe: false,
        speed: 4000,
        slidesToShow: 5,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.2,
                },
            },
        ],
    });

    var width = $(window).width();

    var slider = "#js-movie-slider";
    var thumbnailItem = "#thumbnail-list .thumbnail-item";

    // サムネイル画像アイテムに data-index でindex番号を付与
    $(thumbnailItem).each(function () {
        var index = $(thumbnailItem).index(this);
        $(this).attr("data-index", index);
    });

    // スライダー初期化後、カレントのサムネイル画像にクラス「thumbnail-current」を付ける
    $(slider).on("init", function (slick) {
        var index = $(".slide-item.slick-slide.slick-current").attr(
            "data-slick-index"
        );
        $(thumbnailItem + '[data-index="' + index + '"]').addClass(
            "thumbnail-current"
        );
    });

    $(slider).slick({
        arrows: false,
        autoplay: false,
        autoplaySpeed: 0,
        cssEase: "linear",
        centerMode: true,
        swipeToSlide: false,
        draggable: false,
        focusOnSelect: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        swipe: false,
        slidesToShow: 1,
        fade: true,
        infinite: false,
    });
    $(window).on("resize", function () {
        $(slider).slick("resize");
    });

    //サムネイル画像アイテムをクリックしたときにスライダー切り替え
    $(thumbnailItem).on("click", function (e) {
        e.preventDefault();
        var index = $(this).attr("data-index");
        $(slider).slick("slickGoTo", index, false);
        $("video").each(function (i, elem) {
            $(elem).get(0).pause();
        });
    });

    //サムネイル画像のカレントを切り替え
    $(slider).on("beforeChange", function (
        event,
        slick,
        currentSlide,
        nextSlide
    ) {
        $(thumbnailItem).each(function () {
            $(this).removeClass("thumbnail-current");
        });
        $(thumbnailItem + '[data-index="' + nextSlide + '"]').addClass(
            "thumbnail-current"
        );
    });
});
