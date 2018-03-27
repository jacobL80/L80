var baseURL = 'http://l80.io/assets/frontpage.json';
//var baseURL = 'https://api.myjson.com/bins/gugs1'; // For testing
var numberOfEntries = 6;

$(document).ready(function () {
    "use strict";
    
    // Loads JSON file info into featured entries boxes on Front Page
    $.getJSON(baseURL, function(data) {
        var entryCounter = 0;
        var divType = "";
        $.each(data.entries, function(i, option) {
            var entryId = option.entryId;
            if (entryCounter < numberOfEntries) {
                if ((entryCounter % 4) === 0 || (entryCounter % 4) === 3) {
                    divType = "large";
                } else {
                    divType = "small";
                }
                $('<div class="buttonDiv ' + divType + '" id="' + entryId + '" type="' + option.entryType + '"><img src="assets/tiles/' + option.imgSource + '.png" class="img-responsive buttonImage" parentId="' + entryId + '"/><div class="overlay" parentId="' + entryId + '"><div class="text"> <span class="title ' + entryId + '">' + option.entryName + '</span><br><span class="date">' + option.releaseDate + '</span><hr class="overlayHr">' + option.overlay + '</div></div></div>').appendTo('.contentRowInner');
                $('<div modalNum="' + entryId + '" id="modal' + entryId + '" class="modal"><div class="container modal-content"><div class="row modalRow text-center" style="height:7%"><span class="close">&times;</span><p class="col-sm-12 modalText">' + option.entryName + '</p></div><div class="row modalRow" style="height:93%"><div class="modalBlock" id="modalBlock' + entryId + '"></div></div></div></div>').appendTo('body');
            } else {
                $('<div class="buttonDiv ' + divType + ' hidden" id="' + entryId + '" type="' + option.entryType + '"><img src="assets/tiles/' + option.imgSource + '.png" class="img-responsive buttonImage" parentId="' + entryId + '"/><div class="overlay" parentId="' + entryId + '"><div class="text"> <span class="title ' + entryId + '">' + option.entryName + '</span><br><span class="date">' + option.releaseDate + '</span><hr class="overlayHr">' + option.overlay + '</div></div> </div>').appendTo('.contentRowInner');   
                
                $('<div modalNum="' + entryId + '" id="modal' + entryId + '" class="modal"><div class="container modal-content"><div class="row modalRow text-center" style="height:7%"><span class="close">&times;</span><p class="col-sm-12 modalText">' + option.entryName + '</p></div><div class="row modalRow" style="height:93%"><div class="modalBlock" id="modalBlock' + entryId + '"></div></div></div></div>').appendTo('body');
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
                    if (hash === "about") {
                        $(".navbarLinks").removeClass("selected");
                    } else {
                        $(".sortLinks").removeClass("selected");
                    }
					$("a[id='" + hash + "']").addClass("selected");
                }
                if (hash === "ux" || hash === "graphic") {
                    $(".contentRowOuter").addClass("hidden");
                    $("a[id='" + hash + "']").trigger("click", function() {
                        $(".contentRowOuter").removeClass("hidden");
                    });
                } else if (hash === "about") {
                    $(".contentRowOuter").addClass("hidden");
                    $(".aboutContentOuter").removeClass("hidden");
                    $(".worksTriangle").removeClass("viewable");
                    $(".aboutTriangle").addClass("viewable");
                }
            }
        }
    });

    
    
    
    // Displays only the X newest entries
    $(document).on("click", ".navbar-header, #works, #new", function(e) {
        e.preventDefault();
        history.replaceState('data', '', 'http://L80.io');
        var selectedDiv = "";
        
        if ($(this).attr("id") === "new") {
            selectedDiv = ".contentRowInner";
        } else {
            selectedDiv = ".contentRowOuter";
        }
        // Adds the sliding and fading effect
        $(selectedDiv + ", .aboutContentOuter")
                .css('opacity', 1)
                .animate({ paddingTop: '5%', opacity: 0 }, 500, function() {
                    $("h2").text("Featured Entries");
                    $(".aboutContentOuter").addClass("hidden");
                    $(selectedDiv).removeClass("hidden");
                    $(".buttonDiv").removeClass("hidden");
                    $(".sortLinks").removeClass("selected");
                    $(".navbarLinks").removeClass("selected");
                    $("#new").addClass("selected");
                    $("#works").addClass("selected");
            
                    $("#navbarLinks li .trianglePointer").removeClass("viewable");
                    $(".worksTriangle").addClass("viewable");
                    $(".sort li .trianglePointer").removeClass("viewable");
                    $(".newTriangle").addClass("viewable");

                    var entryCounter = 0;
                    $(".buttonDiv").each(function() {
                        if ((entryCounter % 4) === 0 || (entryCounter % 4) === 3) {
                            $(this).removeClass("small");
                            $(this).addClass("large");
                        } else {
                            $(this).removeClass("large");
                            $(this).addClass("small");
                        }
                        entryCounter++;
                        if (entryCounter > numberOfEntries) {
                            $(this).addClass("hidden");
                        }
                    });
        });
        //Fades back in when complete
        $(selectedDiv + ", .aboutContentOuter")
            .css('opacity', 0)
            .animate({ paddingTop: '0%', opacity: 1 }, 500);

    });
    
    //Handles click events for each menu option. Some are new pages and some are toggles
    $(document).on("click", "#about", function(e) {
        e.preventDefault(); 
       
        var id = $(this).attr("id");
        
        // Adds the sliding and fading effect
        $(".contentRowOuter, .aboutContentOuter")
            .css('opacity', 1)
            .animate({ paddingTop: '5%', opacity: 0 }, 500, function() {
                $(".navbarLinks").removeClass("selected");
                $(".worksTriangle").removeClass("viewable");
                $("a[id='" + id + "']").addClass("selected");
                $("." + id + "Triangle").addClass("viewable");
                $(".buttonDiv").addClass("hidden");
                $(".contentRowOuter").removeClass("hidden");
                $(".aboutContentOuter").addClass("hidden");

                history.replaceState('data', '', 'http://L80.io/#' + id);
                $(".buttonDiv[type='" + id + "']").removeClass("hidden");

                if (id === "about") {
                    $(".contentRowOuter").addClass("hidden");
                    $(".aboutContentOuter").removeClass("hidden");
                } 
        });
        
        //Fades back in when complete
        $(".contentRowOuter, .aboutContentOuter")
            .css('opacity', 0)
            .animate({ paddingTop: '0%', opacity: 1 }, 500);
    });    
    
    //Handles click events for content sorting
    $(document).on("click", ".sortLinks", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        
        // Adds the sliding and fading effect
        if (id === "ux" || id === "graphic") {
            $(".contentRowInner")
                .css('opacity', 1)
                .animate({ paddingTop: '5%', opacity: 0 }, 500, function() {
                    $(".sortLinks").removeClass("selected");
                    $("a[id='" + id + "']").addClass("selected");
                    $(".buttonDiv").addClass("hidden");
                    $(".contentRowOuter").removeClass("hidden");
                    $(".sort li .trianglePointer").removeClass("viewable");
                    $("." + id + "Triangle").addClass("viewable");
                    
                    history.replaceState('data', '', 'http://L80.io/#' + id);
                    $(".buttonDiv[type='" + id + "']").removeClass("hidden");
                    
                    var entryCounter = 0;
                    var entrySize = $("div[type='" + id + "']").length;
                    $("div[type='" + id + "']").each(function() {
                        if ((entryCounter % 4) === 0 || (entryCounter % 4) === 3) {
                            $(this).removeClass("small");
                            $(this).addClass("large");
                        } else {
                            $(this).removeClass("large");
                            $(this).addClass("small");
                        }
                        entryCounter++;
                        if (entryCounter === entrySize && entryCounter % 2 === 1) {
                            console.log("final entry");
                        }
                    });
            });
            
            //Fades back in when complete
            $(".contentRowInner")
                .css('opacity', 0)
                .animate({ paddingTop: '0%', opacity: 1 }, 500);
        }   
    });
    
    //Handles hover over featured entries on Front Page
    $(document).on("mouseover", ".buttonDiv", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        $("img[parentId='" + id + "']").css("background", "rgba(5,36,64,.8)");
        $("div[parentId='" + id + "']").css("background", "rgba(5,36,64,.8)");
        $("div[parentId='" + id + "'] .text").css("color", "rgba(255,255,255,1)");
        $("div[parentId='" + id + "'] .overlayHr").css("opacity", "1");
    });
    
    $(document).on("mouseout", ".buttonDiv", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        $("img[parentId='" + id + "']").css("background", "rgba(5,36,64,1)");
        $("div[parentId='" + id + "']").css("background", "rgba(5,36,64,0)");
        $("div[parentId='" + id + "'] .text").css("color", "rgba(255,255,255,0)");
        $("div[parentId='" + id + "'] .overlayHr").css("opacity", "0");
    });
    
    $(document).on("mouseover", "#navbarLinks li, .sort li", function(e) {
        e.preventDefault(); 
        $(this).children("a").css("opacity", ".3");
        $(this).children(".trianglePointer").css("opacity", ".3");
    });

    $(document).on("mouseout", "#navbarLinks li, .sort li", function(e) {
        e.preventDefault(); 
        $(this).children("a").css("opacity", "1");
        $(this).children(".trianglePointer").css("opacity", "0");
    });
    
    $(document).on("mouseover", ".navbar-header", function(e) {
        e.preventDefault(); 
        $("h1").css("color", "#E15427");
    });

    $(document).on("mouseout", ".navbar-header", function(e) {
        e.preventDefault(); 
        $("h1").css("color", "#efe5d1");
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
        history.replaceState('data', '', 'http://L80.io');
        /*id = 0;
        var id2 = $("h2").attr("id");
        if (id2.length > 1) {
            history.replaceState('data', '', 'http://L80.io/#' + id2);
        } else {
            history.replaceState('data', '', 'http://L80.io');
        }*/
    });

    // When the user clicks anywhere outside of the modal, close it
    $(document).click(function(event) {
        //if you click on anything except the modal itself or the "open modal" link, close the modal
        if (!$(event.target).closest(".modal-content, .buttonDiv").length) {
            $("body").find(".modal").removeClass('active');
            $(".modalOverlay").fadeOut(500);
			$("#mainContent, #mainNavbar").css("pointer-events", "auto");
            history.replaceState('data', '', 'http://L80.io');
			/*$("#mainContent, #mainNavbar").removeClass('blur-in');
			$("#mainContent, #mainNavbar").addClass('blur-out');*/
            /*var id = $("h2").attr("id");
            if (id.length > 1) {
                history.replaceState('data', '', 'http://L80.io/#' + id);
            } else {
                history.replaceState('data', '', 'http://L80.io');
            }*/
        }
    });
});