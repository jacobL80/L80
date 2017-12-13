var baseURL = 'https://api.myjson.com/bins/1b5m0r';

$(document).ready(function () {
    "use strict";
    
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
    
    $(function() {
		$.getJSON(baseURL, function(data) {
			$.each(data.entries, function(i, option) {
                var entryId = option.entryId;
                $("span[class='entry" + entryId + "']").text(option.entryName);
                $("p.date.date" + entryId).text(option.releaseDate);
                $("div[parentId='entry" + entryId + "'] .text").text(option.overlay);
                $("img[parentId='entry" + entryId + "']").attr('src', '../assets/tiles/' + option.imgSource + '.png');
			});
		});
	});
});
