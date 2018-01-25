//var baseURL = 'http://l80.io/assets/frontpage.json';
var baseURL = 'https://api.myjson.com/bins/gugs1'; // For testing

$(document).ready(function () {
    "use strict";
    
    // Loads JSON file info into featured entries boxes on Front Page
    $(function() {
		$.getJSON(baseURL, function(data) {
            var entryCounter = 0;
			$.each(data.entries, function(i, option) {
                var entryId = option.entryId;
                var diamonds;
                if (option.entryType === "ux") {
                    diamonds = "diamond-08.png";
                } else {
                    diamonds = "diamond-07.png";
                }
                if (entryCounter < 10) {
                    $('<div class="buttonDiv" id="' + entryId + '" type="' + option.entryType + '"><img src="assets/tiles/' + option.imgSource + '.png" class="img-responsive buttonImage" parentId="' + entryId + '"/><div class="overlay" parentId="' + entryId + '"><div class="text">' + option.overlay + '</div></div><div class="diamondRow"><img src="assets/' + diamonds + '" class="img-responsive diamonds"/></div><button id="' + entryId + 'Button" class="btn btn-large btn-primary sectionButton" name="Continue" type="button"><span class="' + entryId + '">' + option.entryName + '</span><p class="date">' + option.releaseDate + '</p><i class="icon-ok" style="font-size:30px; vertical-align: middle;"></i></button></div><div modalNum="' + entryId + '" id="modal' + entryId + '" class="modal"><div class="container modal-content"><div class="row modalRow" style="height:7%"><span class="close">&times;</span><p class="col-sm-12 modalText">' + option.entryName + '</p></div><div class="row modalRow" style="height:93%"><div class="modalBlock" id="modalBlock' + entryId + '"></div></div></div></div>').appendTo('.contentRowInner');
                } else {
                    $('<div class="buttonDiv hidden" id="' + entryId + '" type="' + option.entryType + '"><img src="assets/tiles/' + option.imgSource + '.png" class="img-responsive buttonImage" parentId="' + entryId + '"/><div class="overlay" parentId="' + entryId + '"><div class="text">' + option.overlay + '</div></div><div class="diamondRow"><img src="assets/' + diamonds + '" class="img-responsive diamonds"/></div><button id="' + entryId + 'Button" class="btn btn-large btn-primary sectionButton" name="Continue" type="button"><span class="' + entryId + '">' + option.entryName + '</span><p class="date">' + option.releaseDate + '</p><i class="icon-ok" style="font-size:30px; vertical-align: middle;"></i></button></div><div modalNum="' + entryId + '" id="modal' + entryId + '" class="modal"><div class="container modal-content"><div class="row modalRow" style="height:7%"><span class="close">&times;</span><p class="col-sm-12 modalText">' + option.entryName + '</p></div><div class="row modalRow" style="height:93%"><div class="modalBlock" id="modalBlock' + entryId + '"></div></div></div></div>').appendTo('.contentRowInner');
                }
                entryCounter++;
			});
            // Load modals with content
            /*$(".modal").each(function() {
                var modalNum = $(this).attr("modalNum"); 
                $("#modalBlock" + modalNum).load("html/content/" + modalNum + ".html");
            });*/
		});
	});
    
    
    
    
    
    
    // Displays only the 10 newest entries
    $(document).on("click", "h1", function(e) {
        e.preventDefault();
        $("h2").text("FEATURED ENTRIES");
        $(".aboutContentOuter").addClass("hidden");
        $(".contentRowOuter").removeClass("hidden");
        $(".buttonDiv").removeClass("hidden");
        $(".navbarLinks").removeClass("selected");
        
        var entryCounter = 0;
        $(".buttonDiv").each(function() {
            entryCounter++;
            if (entryCounter > 10) {
                $(this).addClass("hidden");
            }
        });
    });
    
    //Handles click events for each menu option. Some are new pages and some are toggles
    $(document).on("click", ".navbarLinks", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        
        if (id === "ux" || id === "graphic" || id === "about") {
            $(".navbarLinks").removeClass("selected");
            $("a[id='" + id + "']").addClass("selected"); 
            $(".buttonDiv").addClass("hidden");
            $(".contentRowOuter").removeClass("hidden");
            $(".aboutContentOuter").addClass("hidden");
        }
        
        if (id ==="ux") {
            $("h2").text("UX/UI DESIGN");
            $(".buttonDiv[type='ux']").removeClass("hidden");
        } else if (id === "graphic") {
            $("h2").text("GRAPHIC DESIGN");
            $(".buttonDiv[type='graphic']").removeClass("hidden");
        } else if (id === "about") {
            $("h2").text("ABOUT");
            $(".contentRowOuter").addClass("hidden");
            $(".aboutContentOuter").removeClass("hidden");
            $("#selfie").removeClass("hidden");
        } else {
            window.open('http://l80comics.com', '_blank');
        }
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
        $(modal).addClass("visible");
        $(".modalOverlay").addClass("visible");
        $("#modalBlock" + id).load("html/content/" + id + ".html"); // Moved from doing all at once
    });

    // When the user clicks on <span> (x), close the modal
    $(document).on("click", ".close", function(e) {
        e.preventDefault();
        $(".modal").removeClass("visible");
        $(".modalOverlay").removeClass("visible");
        id = 0;
    });

    // When the user clicks anywhere outside of the modal, close it
    $(document).click(function(event) {
        //if you click on anything except the modal itself or the "open modal" link, close the modal
        if (!$(event.target).closest(".modal-content, .buttonDiv").length) {
            $("body").find(".modal").removeClass("visible");
            $(".modalOverlay").removeClass("visible");
        }
    });
});