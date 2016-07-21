function scalePageContent() {
    scaleNavbarLogo()
    scaleContentHeight()
}

function scaleContentHeight() {
    var windowRef = $(window)
    var mainContent = $.q("#mainContent")
    var latestSectionHeader = $.q("#latestSectionHeader")
    var latestSectionPanel = $.q("#latestSectionPanel")
    var featuredSectionPanel = $.q("#featuredSectionPanel")

    var mainContentStartY = mainContent.position().top
    var windowHeight = windowRef.height()

    var sectionHeaderHeight = latestSectionHeader.height() + parseFloat(latestSectionHeader.css("marginBottom"))
    var sectionPanelMargin = parseFloat(latestSectionPanel.css("marginBottom"))
    var panelContentLength = windowHeight - mainContentStartY - sectionHeaderHeight - sectionPanelMargin
    latestSectionPanel.height(panelContentLength)
    featuredSectionPanel.height(panelContentLength)
}

$(document).ready(function () {
    initializeNavbar()
    initializeSlick()
    window.onresize = scalePageContent

    scalePageContent()
})

function initializeFrontpagePanels() {
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