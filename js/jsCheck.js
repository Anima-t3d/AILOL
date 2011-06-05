/**
 * @author Anima-t3d
 */
if (typeof jQuery == 'undefined') { 
	alert("External jQuery is not loaded... trying local!");
	var head = document.getElementsByTagName("head")[0];
	script = document.createElement('script');
	script.id = 'jQuery';
	script.type = 'text/javascript';
	script.src = 'js/jquery-latest.min.js';
	head.appendChild(script);
	window.onload = function(){
		if(jQuery){
			alert("Backup succesful! \nNow running version: "+$().jquery);
		}else{
			alert("Backup failed!");
		}
	}
}

if (typeof jQuery.ui == 'undefined') { 
	alert("External jQuery UI is not loaded... trying local!");
	var head = document.getElementsByTagName("head")[0];
	script = document.createElement('script');
	script.id = 'jQuery';
	script.type = 'text/javascript';
	script.src = 'js/jquery-ui-latest.min.js';
	head.appendChild(script);
	window.onload = function(){
		if(jQuery.ui){
				alert("Backup succesful! \nNow running version: "+$.ui.version);
		}else{
			alert("Backup failed!");
		}
	}
}

/*
if (jQuery.fn.validate){
// Do something when validate is loaded
} else {
// Do something else when validate is not loaded
}
function importScript(url){
    var tag = document.createElement("script");
    tag.type="text/javascript";
    tag.src = url;
    document.body.appendChild(tag);
}
*/
