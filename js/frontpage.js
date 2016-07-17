var windowReference = $(window)

function rescaleMainContent() {
    var mainContent = $("#mainContent")
    var yStartPosition = mainContent.position().top
    var yEndPosition = windowReference.height()
    var newHeight = yEndPosition - yStartPosition;

    console.log("resized")

    mainContent.height(newHeight)
}

windowReference.resize(function() {
    rescaleMainContent()
});