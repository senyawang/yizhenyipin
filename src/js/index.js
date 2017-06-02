$(function () {
    new Swiper('.jxzl-swiper', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true
    });
    new Swiper('.index-banner', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        autoplay: 3000,
        effect: 'fade'
    });

    var swiper = new Swiper('.jyz-middle-top', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    });

    var swiper1 = new Swiper('.jyz-middle-bottom', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    });

    var viewSwiper = new Swiper('.view .swiper-container', {
        onSlideChangeStart: function() {
            updateNavPosition()
        }
    })
    var previewSwiper = new Swiper('.preview .swiper-container', {
        visibilityFullFit: true,
        slidesPerView: 'auto',
        onlyExternal: true,
        onClick: function() {
            viewSwiper.slideTo(previewSwiper.clickedIndex)
        }
    })

    function updateNavPosition() {
        $('.preview .active-nav').removeClass('active-nav')
        var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
        if (!activeNav.hasClass('swiper-slide-visible')) {
            if (activeNav.index() > previewSwiper.activeIndex) {
                var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
                previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
            } else {
                previewSwiper.slideTo(activeNav.index())
            }
        }
    }

    $('.jxzl-menu').on('click', function (e) {
        e.preventDefault()
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        var index = $(this).index()
        $('.jxzl-cont').toggle()

    })

    $('.jcp-wrapper').on('click', '.slide-arrow-left', function (e) {
        var cached = $('.jcp-wrapper ul').find('li').eq(2)
        $('.jcp-wrapper ul').prepend(cached)
    }).on('click', '.slide-arrow-right', function (e) {
        var cached = $('.jcp-wrapper ul').find('li').eq(0)
        $('.jcp-wrapper ul').append(cached)
    })

    $(".jyz-left-swiper").FengTab({
        titCell:".tabs-menu ul",     //选项卡控制盒子
        mainCell:".tabs-cont",  //选项卡内容盒子
        defaultIndex:0,     //默认显示第几个选项卡，第一个是0，第二个是1，以此类推
        trigger:"mouseover",    //切换方式，click 为点击，mouseover 为移动切换
        titOnClassName:"active",   //选中选项卡样式
        showtime: 800       //内容切换时间，一般写200即可（单位是毫秒）
    });

    $(".tabs-box").FengTab({
        titCell:".tabs-menu ul",     //选项卡控制盒子
        mainCell:".tabs-cont",  //选项卡内容盒子
        defaultIndex:0,     //默认显示第几个选项卡，第一个是0，第二个是1，以此类推
        trigger:"mouseover",    //切换方式，click 为点击，mouseover 为移动切换
        titOnClassName:"active",   //选中选项卡样式
        showtime: 800       //内容切换时间，一般写200即可（单位是毫秒）
    });
})