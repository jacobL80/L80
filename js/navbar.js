const maxLogoWidth = 500
const navbarSpacing = 50 //in px

function initializeNavbar() {
    $.q("#navbarLinks").load(scaleNavbarLogo)
}

function scaleNavbarLogo() {
    var navbarLinks = $.q("#navbarLinks")
    var navbarLogo = $.q("#navbarLogo")

    var navbarLinksStartY = navbarLinks.position().left
    var newNavbarLogoWidth = navbarLinksStartY - navbarSpacing
    if (newNavbarLogoWidth <= maxLogoWidth) {
        navbarLogo.width(newNavbarLogoWidth)
    } else if (navbarLogo.width() != maxLogoWidth) {
        navbarLogo.width(maxLogoWidth)
    }
}