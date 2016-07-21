const maxLogoWidth = 500
const navbarSpacing = 15 //in px

var navbarLinksRef
var navbarLogoRef

$(document).ready(function() {
    navbarLinksRef = $("#navbarLinks")
    navbarLogoRef = $("#navbarLogo")
})

function scaleNavbarLogo() {
    var navbarLinksStartY = navbarLinksRef.position().left
    var newNavbarLogoWidth = navbarLinksStartY - navbarSpacing
    if (newNavbarLogoWidth <= maxLogoWidth) {
        navbarLogoRef.width(newNavbarLogoWidth)
    } else if (navbarLogoRef.width() != maxLogoWidth) {
        navbarLogoRef.width(maxLogoWidth)
    }
}
