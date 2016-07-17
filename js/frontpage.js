var windowRef
var mainContentRef
var latestSectionHeaderRef
var latestContentPanelRef
var featuredContentPanelRef

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

    windowRef.resize(scalePageContent);
})