var windowRef
var mainContentRef
var latestSectionHeaderRef
var latestContentPanelRef
var featuredContentPanelRef

function scaleLogo() {

}

function initializeSlick() {
    $('.slickFeature').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        touchMove: false,
        arrows: false,
        fade: true,
    });
    $('.slickFeatureNav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slickFeature',
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });
}

function scalePageContent() {
    var mainContentStartY = mainContentRef.position().top
    var windowHeight = windowRef.height()

    var sectionHeaderHeight = latestSectionHeaderRef.height() + parseFloat(latestSectionHeaderRef.css("marginBottom"))
    var sectionPanelMargin = parseFloat(latestContentPanelRef.css("marginBottom"))
    var panelContentLength = windowHeight - mainContentStartY - sectionHeaderHeight - sectionPanelMargin
    latestContentPanelRef.height(panelContentLength)
    featuredContentPanelRef.height(panelContentLength)
}

$(document).ready(function () {
    windowRef = $(window)
    mainContentRef = $("#mainContent")
    latestSectionHeaderRef = $("#latestSectionHeader")
    latestContentPanelRef = $("#latestSectionPanel")
    featuredContentPanelRef = $("#featuredSectionPanel")
    scalePageContent()

    initializeSlick()
})

window.onresize = scalePageContent