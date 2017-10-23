$(document).ready(function () {
    "use strict";
    
    
    
    $(document).on("mouseover", ".buttonDiv", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        $("img[parentId='" + id + "']").css("opacity", ".6");
        $("div[parentId='" + id + "']").css("opacity", ".6");
    });
    
    $(document).on("mouseout", ".buttonDiv", function(e) {
        e.preventDefault(); 
        var id = $(this).attr("id");
        $("img[parentId='" + id + "']").css("opacity", "1");
        $("div[parentId='" + id + "']").css("opacity", "0");
    });
});
