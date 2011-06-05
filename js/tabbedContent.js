//tab effects

var TabbedContent = {
	init: function() {	
		$(".tab_item").click(function() {
			var container = $(this).closest(".tabbed_content").parent().get()[0].id;
			$("#"+container+" .tabbed_content .tab_item").removeClass("active");
			$(this).addClass("active");
			/*var background = $(this).parent().find(".moving_bg");
			
			$(background).stop().animate({
				left: $(this).position()['left']
			}, {
				duration: 300
			});*/
			
			TabbedContent.slideContent($(this));
			
		});
	},
	
	slideContent: function(obj) {
		
		var margin = $(obj).parent().parent().find(".slide_content").width();
		margin = margin * ($(obj).prevAll().size() - 1);
		margin = margin * -1;
		
		$(obj).parent().parent().find(".tabslider").stop().animate({
			marginLeft: margin + "px"
		}, {
			duration: 300
		});
		/*$(obj).parent().parent().find(".tabslider").hide().stop().css({
			marginLeft: margin + "px"
		}).show("slow");*/
	}
}

$(document).ready(function() {
	TabbedContent.init();
	$(".tabbed_content .tabs div+span").addClass("active");
});