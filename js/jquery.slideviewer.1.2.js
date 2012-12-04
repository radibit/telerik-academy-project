/*!
 * slideViewer 1.2
 * Examples and documentation at: 
 * http://www.gcmingati.net/wordpress/wp-content/lab/$/imagestrip/imageslide-plugin.html
 * 2007-2010 Gian Carlo Mingati
 * Version: 1.2.3 (9-JULY-2010)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Requires:
 * $ v1.4.1 or later, $.easing.1.2
 * 
 */

$(function(){
   $("div.svw").prepend("<img src='images/spinner.gif' class='ldrgif' alt='loading...'/ >"); 
});
var j = 0;
var quantofamo = 0;
$.fn.slideView = function(settings) {
	settings = $.extend({
		easeFunc: "easeInOutExpo",
		easeTime: 750,
		uiBefore: false,
		toolTip: false,
		ttOpacity: 0.9
	}, settings);
	return this.each(function(){
		var container = $(this);
		container.find("img.ldrgif").remove();
		container.removeClass("svw").addClass("stripViewer");		
		var pictWidth = container.find("img").width();
		var pictHeight = container.find("img").height();
		var pictEls = container.find("li").size();
		var stripViewerWidth = pictWidth*pictEls;
		container.find("ul").css("width" , stripViewerWidth);
		container.css("width" , pictWidth);
		container.css("height" , pictHeight);
		container.each(function(i) {
        (!settings.uiBefore) ? $(this).after("<div class='stripTransmitter' id='stripTransmitter" + (j) + "'><ul><\/ul><\/div>") : $(this).before("<div class='stripTransmitter' id='stripTransmitter" + (j) + "'><ul><\/ul><\/div>");			
		$(this).find("li").each(function(n) {
		$("div#stripTransmitter" + j + " ul").append("<li><a title='" + $(this).find("img").attr("alt") + "' href='#'>"+(n+1)+"."+"<\/a><\/li>");												
		});
		$("div#stripTransmitter" + j + " a").each(function(z) {
		$(this).bind("click", function(){		
		$(this).addClass("current").parent().parent().find("a").not($(this)).removeClass("current"); // wow!
		var cnt = -(pictWidth*z);
		container.find("ul").animate({ left: cnt}, settings.easeTime, settings.easeFunc);
		return false;
		});
		});
		
		
		container.bind("click", function(e){
			var ui = (!settings.uiBefore) ? $(this).next().find("a.current") : $(this).prev().find("a.current");
			var bTotal = parseFloat($(this).css('borderLeftWidth').replace("px", "")) +  parseFloat($(this).css('borderRightWidth').replace("px", ""));
			var dOs = $(this).offset();
			var zeroLeft = (bTotal/2 + pictWidth) - (e.pageX - dOs.left);
			if(zeroLeft >= pictWidth/2) { 
				var uiprev = ui.parent().prev().find("a");	
				($(uiprev).length != 0)? uiprev.trigger("click") : ui.parent().parent().find("a:last").trigger("click");							
			} 
			else {
				var uinext = ui.parent().next().find("a");
			  ($(uinext).length != 0)? uinext.trigger("click") : ui.parent().parent().find("a:first").trigger("click");
			}
		});
		
		
		$("div#stripTransmitter" + j).css("width" , 220);
		$("div#stripTransmitter" + j + " a:first").addClass("current");
		$('body').append('<div class="tooltip" style="display:none;"><\/div>');
		

		if(settings.toolTip){
		var aref = $("div#stripTransmitter" + j + " a");

		aref.live('mousemove', function(e) {
		var att = $(this).attr('title');
		posX=e.pageX+10;
		posY=e.pageY+10;
		$('.tooltip').html(att).css({'position': 'absolute', 'top': posY+'px', 'left': posX+'px', 'display': 'block', 'opacity': settings.ttOpacity});
		});
		aref.live('mouseout', function() {
		$('.tooltip').hide();
		});				
		}
		});
		j++;
	});	
};