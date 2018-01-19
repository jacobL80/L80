var baseURL = 'https://api.myjson.com/bins/qk3w5';

$(document).ready(function () {
    "use strict";
    
    // Loads JSON file info into featured entries boxes on Front Page
    $(function() {
		$.getJSON(baseURL, function(data) {
			$.each(data.entries, function(i, option) {
                var entryId = option.entryId;
                var diamonds;
                if (option.entryType === "ux") {
                    diamonds = "diamond-08.png";
                } else {
                    diamonds = "diamond-07.png";
                }
                if (entryId <= 10) {
                    $('<div class="buttonDiv" id="' + entryId + '" type="' + option.entryType + '"><img src="../assets/tiles/' + option.imgSource + '.png" class="img-responsive buttonImage" parentId="' + entryId + '"/><div class="overlay" parentId="' + entryId + '"><div class="text">' + option.overlay + '</div></div><div class="diamondRow"><img src="../assets/' + diamonds + '" class="img-responsive diamonds"/></div><button id="' + entryId + 'Button" class="btn btn-large btn-primary sectionButton" name="Continue" type="button"><span class="' + entryId + '">' + option.entryName + '</span><p class="date date1">' + option.releaseDate + '</p><i class="icon-ok" style="font-size:30px; vertical-align: middle;"></i></button></div>').appendTo('.contentRowInner');
                } else {
                    $('<div class="buttonDiv hidden" id="' + entryId + '" type="' + option.entryType + '"><img src="../assets/tiles/' + option.imgSource + '.png" class="img-responsive buttonImage" parentId="' + entryId + '"/><div class="overlay" parentId="' + entryId + '"><div class="text">' + option.overlay + '</div></div><div class="diamondRow"><img src="../assets/' + diamonds + '" class="img-responsive diamonds"/></div><button id="' + entryId + 'Button" class="btn btn-large btn-primary sectionButton" name="Continue" type="button"><span class="' + entryId + '">' + option.entryName + '</span><p class="date date1">' + option.releaseDate + '</p><i class="icon-ok" style="font-size:30px; vertical-align: middle;"></i></button></div>').appendTo('.contentRowInner');
                }
			});
		});
	});   
    
    // Displays only the 10 newest entries
    $(document).on("click", "h1", function(e) {
        e.preventDefault();
        $("h2").text("FEATURED ENTRIES");
        $(".buttonDiv").removeClass("hidden");
        $(".buttonDiv").each(function() {
            var id = $(this).attr("id");
            if (id > 10) {
                $(this).addClass("hidden");
            }
        });
    });
    
    //Shows all content for each menu item clicked, and nothing else
    $(document).on("click", ".navbarLinks", function(e) {
        e.preventDefault();  
        var id = $(this).attr("id");
        if (id === "ux" || id === "graphic") {
            $(".navbarLinks").css("color", "#E15427");
            $(".navbarLinks").css("opacity", "1");
            $(".navbarLinks").css("pointer-events", "auto");
            if (id ==="ux") {
                $(".navbarLinks2").css("background-image", "url(../assets/diamond-02.png)");
                $("h2").text("UX/UI DESIGN");
                $(".buttonDiv").addClass("hidden");
                $(".buttonDiv[type='ux']").removeClass("hidden");
            } else {
                $(".navbarLinks1").css("background-image", "url(../assets/diamond-01.png)");
                $("h2").text("GRAPHIC DESIGN");
                $(".buttonDiv").addClass("hidden");
                $(".buttonDiv[type='graphic']").removeClass("hidden");
            }
            
            $("a[id='" + id + "']").css("color", "#FFF");
            $("a[id='" + id + "']").css("opacity", ".5");
            $("a[id='" + id + "']").css("background-image", "url(../assets/diamond-06.png)");
            $("a[id='" + id + "']").css("pointer-events", "none");
        }
        
    });  
    
    
    //Handles hover over featured entries on Front Page
    $(document).on("mouseover", ".buttonDiv", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        $("img[parentId='" + id + "']").css("background", "rgba(0,140,186,.6)");
        $("div[parentId='" + id + "']").css("background", "rgba(0,140,186,.6)");
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
});
