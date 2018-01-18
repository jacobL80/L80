var baseURL = 'https://api.myjson.com/bins/1b16m5';

$(document).ready(function () {
    "use strict";
    
    // Loads JSON file info into featured entries boxes on Front Page
    $(function() {
		$.getJSON(baseURL, function(data) {
			$.each(data.entries, function(i, option) {
                var entryId = option.entryId;
                $("span[class='entry" + entryId + "']").text(option.entryName);
                $("p.date.date" + entryId).text(option.releaseDate);
                $("div[parentId='entry" + entryId + "'] .text").text(option.overlay);
                $("img[parentId='entry" + entryId + "']").attr('src', '../assets/tiles/' + option.imgSource + '.png');
                if (option.entryType === "ux") {
                    console.log($("img[class='diamonds" + entryId + "']"));
                    $("img[parentId='" + entryId + "']").attr('src', '../assets/diamond-08.png');
                }
			});
		});
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
