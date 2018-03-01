var baseURL = 'http://l80.io/assets/frontpage.json';
//var baseURL = 'https://api.myjson.com/bins/gugs1'; // For testing
var featuredNo = 8; // Number of entries on front page

$(document).ready(function () {
    "use strict";
    

    
    // Loads JSON file info into featured entries boxes on Front Page
    $.getJSON(baseURL, function(data) {
        var entryCounter = 0;
        $.each(data.entries, function(i, option) {
            var entryId = option.entryId;
            var diamonds;
            // Determines which color the diamond is per content block
            if (option.entryType === "ux") {
                diamonds = "diamondContentL";
            } else {
                diamonds = "diamondContentL diamondNav2";
            }
            if (entryCounter < featuredNo) {
                $('<div class="buttonDiv" id="' + entryId + '" type="' + option.entryType + '"><img src="assets/tiles/' + option.imgSource + '.png" class="img-responsive buttonImage" parentId="' + entryId + '"/><div class="overlay" parentId="' + entryId + '"><div class="text">' + option.overlay + '</div></div>    <div class="diamondRow"><div class="diamondRowInner"><div class="diamond diamondContent"></div><div class="diamond diamondNav diamondContent ' + diamonds + '"></div><div class="diamond diamondContent"></div></div>   </div><button id="' + entryId + 'Button" class="btn btn-large btn-primary sectionButton" name="Continue" type="button"><span class="' + entryId + '">' + option.entryName + '</span><p class="date">' + option.releaseDate + '</p><i class="icon-ok" style="font-size:30px; vertical-align: middle;"></i></button></div>').appendTo('.contentRowInner');
                $('<div modalNum="' + entryId + '" id="modal' + entryId + '" class="modal"><div class="container modal-content"><div class="row modalRow text-center" style="height:7%"><span class="close">&times;</span><p class="col-sm-12 modalText">' + option.entryName + '</p></div><div class="row modalRow" style="height:93%"><div class="modalBlock" id="modalBlock' + entryId + '"></div></div></div></div>').appendTo('body');
            } else {
                $('<div class="buttonDiv hidden" id="' + entryId + '" type="' + option.entryType + '"><img src="assets/tiles/' + option.imgSource + '.png" class="img-responsive buttonImage" parentId="' + entryId + '"/><div class="overlay" parentId="' + entryId + '"><div class="text">' + option.overlay + '</div></div>     <div class="diamondRow"><div class="diamondRowInner"><div class="diamond diamondContent"></div><div class="diamond diamondNav diamondContent ' + diamonds + '"></div><div class="diamond diamondContent"></div></div>    </div><button id="' + entryId + 'Button" class="btn btn-large btn-primary sectionButton" name="Continue" type="button"><span class="' + entryId + '">' + option.entryName + '</span><p class="date">' + option.releaseDate + '</p><i class="icon-ok" style="font-size:30px; vertical-align: middle;"></i></button></div><div modalNum="' + entryId + '" id="modal' + entryId + '" class="modal"><div class="container modal-content"><div class="row modalRow text-center" style="height:7%"><span class="close">&times;</span><p class="col-sm-12 modalText">' + option.entryName + '</p></div><div class="row modalRow" style="height:93%"><div class="modalBlock" id="modalBlock' + entryId + '"></div></div></div></div>').appendTo('.contentRowInner');
            }
            entryCounter++;
        });
    });

    
    //After page load, checks URL hash and loads its page if there is one
    $(function() {
        if(window.location.hash) {
            var hash = window.location.hash.substring(1);
            // Checks if current hash is for a modal
            if ($.isNumeric(hash)) {
                //Won't attempt to load modal until .3sec after page loads
                setTimeout(function() {
                    $(".buttonDiv[id='" + hash + "']").trigger("click");
                }, 300);
            } else {
                //Threads out edge cases where user is abusing URL
                if (hash === "ux" || hash === "graphic" || hash === "about") { 
                    $(".navbarLinks").removeClass("selected");
					$("a[id='" + hash + "']").addClass("selected");
                    $("h2").attr("id", hash);
                }
                if (hash === "ux") {
                    $("h2").text("UX/UI Design & Coding");
                    $(".contentRowOuter").addClass("hidden");
                    $(".navbarLinks1").trigger("click", function() {
                        $(".contentRowOuter").removeClass("hidden");
                    });
                } else if (hash === "graphic") {
                    $("h2").text("Graphic Design");
                    $(".contentRowOuter").addClass("hidden");
                    $(".navbarLinks2").trigger("click", function () {
                        $(".contentRowOuter").removeClass("hidden");
                    });
                } else if (hash === "about") {
                    $("h2").text("About");
                    $(".contentRowOuter").addClass("hidden");
                    $(".aboutContentOuter").removeClass("hidden");
                }
            }
        } else {
            $("h2").text("Featured Entries");
        }
    });

    
    
    
    // Displays only the featuredNo number of newest entries
    $(document).on("click", ".navbar-header", function(e) {
        e.preventDefault();
		var id = $("h2").attr("id");
        if (id === "ux" || id === "graphic" || id === "about") {
            $("h2").attr("id", " ");
            history.replaceState('data', '', 'http://L80.io');
            $("#mainContent").css("overflow-y", "hidden");
            // Adds the sliding and fading effect
            $(".contentRowInner, .aboutContentOuter")
                    .css('opacity', 1)
                    .animate({ paddingTop: '5%', opacity: 0 }, 500, function() {
                        $("h2").text("Featured Entries");
                        $(".aboutContentOuter").addClass("hidden");
                        $(".contentRowOuter").removeClass("hidden");
                        $(".buttonDiv").removeClass("hidden");
                        $(".navbarLinks").removeClass("selected");
						$(".links").children(".diamond").removeClass("dSelected");

                        var entryCounter = 0;
                        $(".buttonDiv").each(function() {
                            entryCounter++;
                            if (entryCounter > featuredNo) {
                                $(this).addClass("hidden");
                            }
                        });
            });
            //Fades back in when complete
            $(".contentRowInner, .aboutContentOuter")
                .css('opacity', 0)
                .animate({ paddingTop: '0%', opacity: 1 }, 500, function() {
                    $("#mainContent").css("overflow-y", "auto");
            });
        }
    });
    
    //Handles click events for each menu option. Some are new pages and some are toggles
    $(document).on("click", ".navbarLinks", function(e) {
        e.preventDefault(); 
		$(".links").css("pointer-events", "none"); //Prevents users from double tapping to double the animation
       
        var id = $(this).attr("id");
        var links = $(this).attr("list");
        
        $("#mainContent").css("overflow-y", "hidden");
        // Adds the sliding and fading effect
		
        if (id === "ux" || id === "graphic" || id === "about") {
            $(".contentRowInner, .aboutContentOuter")
                .css('opacity', 1)
                .animate({ paddingTop: '5%', opacity: 0 }, 500, function() {
                    $(".navbarLinks").removeClass("selected");
                    $(".links").children(".diamond").removeClass("dSelected");
                    $("a[id='" + id + "']").addClass("selected");
                    $("." + links).children(".diamond").addClass("dSelected");
                    $(".buttonDiv").addClass("hidden");
                    $(".contentRowOuter").removeClass("hidden");
                    $(".aboutContentOuter").addClass("hidden");
                    
                    $("h2").attr("id", id);
                    history.replaceState('data', '', 'http://L80.io/#' + id);
                    $(".buttonDiv[type='" + id + "']").removeClass("hidden");
                    
                    if (id === "ux") {
                        $("h2").text("UX/UI Design & Coding");
                    } else if (id === "graphic") {
                        $("h2").text("Graphic Design");
                    } else if (id === "about") {
                        $("h2").text("About");
                        $(".contentRowOuter").addClass("hidden");
                        $(".aboutContentOuter").removeClass("hidden");
                    } 
            });
        } else {
            window.open('http://l80comics.com', '_blank');
        }
        
        //Fades back in when complete
        $(".contentRowInner, .aboutContentOuter")
            .css('opacity', 0)
            .animate({ paddingTop: '0%', opacity: 1 }, 500, function() {
                $("#mainContent").css("overflow-y", "auto");
				$(".links").css("pointer-events", "auto");
        });
		
		
    });      
    
    //Handles hover over featured entries on Front Page
    $(document).on("mouseover", ".buttonDiv", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        $("img[parentId='" + id + "']").css("background", "rgba(0,140,186,.7)");
        $("div[parentId='" + id + "']").css("background", "rgba(0,140,186,.7)");
        $("div[parentId='" + id + "'] .text").css("color", "rgba(255,255,255,1)");
    });
    
    $(document).on("mouseout", ".buttonDiv", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        $("img[parentId='" + id + "']").css("background", "rgba(0,140,186,1)");
        $("div[parentId='" + id + "']").css("background", "rgba(0,140,186,0)");
        $("div[parentId='" + id + "'] .text").css("color", "rgba(255,255,255,0)");
    });
    
    $(document).on("mouseover", "#navbarLinks li", function(e) {
        e.preventDefault(); 
        $(this).children("a").css("color", "#FFF");
        $(this).children(".diamond").addClass("hovered");
    });

    $(document).on("mouseout", "#navbarLinks li", function(e) {
        e.preventDefault(); 
        $(this).children("a").css("color", "#E15427");
        $(this).children(".diamond").removeClass("hovered");
    });
    
    $(document).on("mouseover", ".navbar-header", function(e) {
        e.preventDefault(); 
        $("h1").css("color", "#FFF");
        $(".navbar-header .diamond").addClass("hovered");
    });

    $(document).on("mouseout", ".navbar-header", function(e) {
        e.preventDefault(); 
        $("h1").css("color", "#EFE5D1");
        $(".navbar-header .diamond").removeClass("hovered");
    });
    
    
    
    
    // toggles resume visibility on About
    $(document).on("click", "#resumeButton", function(e) {
        e.preventDefault();  
        $(".resumeRow").toggle();
        var $this = $(this);
		$this.toggleClass('showResume');
		if($this.hasClass('showResume')){
			$this.text('Show Resume');			
		} else {
			$this.text('Hide Resume');
		}
    });   
    

    var id = 0;
    // When the user clicks on the button, open the modal 
    $(document).on("click", ".buttonDiv", function(e) {
        e.preventDefault();
        id = $(this).attr("id");
        var modal = $("div[id='modal" + id + "']");
        $(".modalOverlay").fadeIn(500);
		$(modal).addClass('active');
		$("#mainContent, #mainNavbar").css("pointer-events", "none");
		/*$("#mainContent, #mainNavbar").removeClass('blur-out');
		$("#mainContent, #mainNavbar").addClass('blur-in');*/
        $("#modalBlock" + id).load("html/content/" + id + ".html"); // Moved from doing all at once
        history.replaceState('data', '', 'http://L80.io/#' + id);
    });

    // When the user clicks on <span> (x), close the modal
    $(document).on("click", ".close", function(e) {
        e.preventDefault();
        $(".modal").removeClass('active');
        $(".modalOverlay").fadeOut(500);
		$("#mainContent, #mainNavbar").css("pointer-events", "auto");
		/*$("#mainContent, #mainNavbar").removeClass('blur-in');
		$("#mainContent, #mainNavbar").addClass('blur-out');*/
        id = 0;
        var id2 = $("h2").attr("id");
        if (id2.length > 1) {
            history.replaceState('data', '', 'http://L80.io/#' + id2);
        } else {
            history.replaceState('data', '', 'http://L80.io');
        }
    });

    // When the user clicks anywhere outside of the modal, close it
    $(document).click(function(event) {
        //if you click on anything except the modal itself or the "open modal" link, close the modal
        if (!$(event.target).closest(".modal-content, .buttonDiv").length) {
            $("body").find(".modal").removeClass('active');
            $(".modalOverlay").fadeOut(500);
			$("#mainContent, #mainNavbar").css("pointer-events", "auto");
			/*$("#mainContent, #mainNavbar").removeClass('blur-in');
			$("#mainContent, #mainNavbar").addClass('blur-out');*/
            var id = $("h2").attr("id");
            if (id.length > 1) {
                history.replaceState('data', '', 'http://L80.io/#' + id);
            } else {
                history.replaceState('data', '', 'http://L80.io');
            }
        }
    });
});