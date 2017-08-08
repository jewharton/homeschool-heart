$(document).ready(function() {
	
	function doTopBar() {
		//var metabar = document.getElementsByClassName("preheadernav")[0];
		//metabar.parentNode.removeChild(topbar);    //Remove it? Nah, too invasive. Just make it invisible.
		//metabar.style.display = "none";
		var metabar = $('div.preheadernav');
		metabar.hide();
		metabar.before('<div id="new_metabar" metabar="regular"> </div>'); 
		var newmeta = $('#new_metabar'); //Remember! this is a jQuery object.
		
		/* New metabar --------------------------------------------------------------- */
		newmeta.append('<ul id="meta_container">');
		var metacontainer = $('#meta_container');
		
		/* Make the ribbon container */
		metacontainer.append('<li id="heartribbon"></li>');
		var heartribbon = $('#heartribbon');
		
		/* Make the actual ribbon */
		heartribbon.append('<img id="ribbon1" src="https://rawgit.com/xaresys/homeschool-heart/master/assets/images/logo%20ribbon%201%20long.png"></img>');
		heartribbon.append('<img id="ribbon2" src="https://rawgit.com/xaresys/homeschool-heart/master/assets/images/logo%20ribbon%202%20long.png"></img>');
		metacontainer.append('<a class="metaitem" id="ribbon_placeholder"></li>');
		
		/* Make the mobile ribbon */
		newmeta.before('<div id="mobile_ribbon"></div>');
		var mobileribbon = $("#mobile_ribbon");
		mobileribbon.append('<div class="ribbonblue" id="rbleft"></div>');
		mobileribbon.append('<img id="mobilelogo" src="https://rawgit.com/xaresys/homeschool-heart/master/assets/mini%20logo.png"></img>');
		mobileribbon.append('<div class="ribbonblue" id="rbright"></div>');
		
		/* Make the items. Hooray! */
		$('.topTextLinks').children('li').not("#topBookmark").not(":has(a#loginButton)").not(":has(a[title='Logout'])").each(function () {
			/*console.log( $(this).html() );*/
			
			var words = $(this).text();
			var href = $(this).find("a[href]").attr('href');
			
			/*console.log( $(this).html() );*/
			
			metacontainer.append('<a class="metaitem" href="'+href+'">'+words+'</a>');
		});
		
		/* Is there a login button? If so, make a new one */
		$('.topTextLinks').children('li').has("a#loginButton").each(function () {
			metacontainer.append('<div class="loginbutton"><a href="#">Login</a></div>');
			
			var loginbutton = $('.loginbutton');
			var loginbox = "<div id=\"loginBox\" >\r\n\t\t\t\t<img id=\"loginArrow\" src=\"\/images\/login-arrow.png\">\r\n\t\t\t\t<form action=\"\/506\/\" method=\"post\" target=\"_top\" name=\"login\" id=\"loginForm\" class=\"clearfix\" onsubmit=\"return validatefields(document.login);\">\r\n\t\t\t\t\t<p id=\"login-error\" style=\"font-weight:bold; font-style:italic; display:none;\"><\/p>\r\n\t\t\t\t\t<input type=\"text\" name=\"username\" maxlength=\"15\" title=\"User Name\" defvalue=\"User Name\" placeholder=\"User Name\" required=\"\"><br>\r\n\t\t\t\t\t<input type=\"password\" name=\"password\" maxlength=\"15\" title=\"Password\" defvalue=\"Password\" placeholder=\"Password\" required=\"\">\r\n\t\t\t\t\t<div class=\"clearfix\" style=\"float:left; width:50%; text-align:left;\">\r\n\t\t\t\t\t\t<input type=\"submit\" name=\"login\" title=\"Secure Login\" value=\"Secure Login\">\r\n\t\t\t\t\t\t<input type=\"hidden\" name=\"remember_login_feature\" value=\"1\">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"login-checkbox\" name=\"remember_login\" value=\"1\"> \r\n\t\t\t\t\t\t\t<label for=\"login-checkbox\" style=\"line-height:14px;\">Keep me signed in until I sign out.<\/label>\r\n\t\t\t\t\t\t\t<div id=\"remember_div\" style=\"display:none;\">\r\n\t\t\t\t\t\t\t\t<p style=\"font-style:italic; line-height:14px; margin-top:8px;\">Caution: uncheck this box if you are on a public computer (i.e. Hotel, Coffee Shop)<\/p>\r\n\t\t\t\t\t\t\t<\/div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t<\/div>\r\n\t\t\t\t\t<div class=\"clearfix\" style=\"float:right; width:45%;\">\r\n\t\t\t\t\t\t<a href=\"javascript:void(0);\" title=\"Forgot Username\" class=\"forgotLink clearfix\">Forgot Username?<\/a>\r\n\t\t\t\t\t\t<a href=\"javascript:void(0);\" title=\"Forgot Password\" class=\"forgotLink clearfix\">Forgot Password?<\/a>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<p style=\"margin:10px 0;\"><a href=\"\/506\/signup\">Request Membership in this Homeschool Group!<\/a><\/p>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t<\/div>\r\n\t\t\t\t<\/form>\r\n\t\t\t<\/div>";
			loginbutton.append(loginbox);
		});
		
		/* Is there a logout button? If so, make a new one */
		$('.topTextLinks').children('li').has("a[title='Logout']").each(function () {
			var href = $(this).find("a[href]").attr('href');
			metacontainer.append('<a class="logoutbutton" href="'+href+'">Logout</div>');
		});
	};
	
	function doNavBar() {
		/* First things first: hide the old navbar.*/
		oldnav = $('div#topNav');
		oldnav.hide();
		
		/* Remove the mobile one */
		$('#topNav-mobile').remove();
		
		/* Create the new one */
		var metabar = $('div#new_metabar');
		metabar.after('<div id="navbar"></div>');
		var navbar = $('div#navbar');
		navbar.append('<div id="navbar_inner"></div>');
		var innernav = $('div#navbar_inner');
		
		/* Make the items */
		$('div#topNav > ul').children('li').each(function () { //Gets children that are 'li'
			var words = $(this).clone().children().remove().end().text();
			var ishome = false;
			var linkwords = "";
			var href = "";
			
			/* No home allowed. Get link text and href. */
			$(this).children('a').each(function () {
				linkwords = $(this).clone().children().remove().end().text();
				href = $(this).attr("href");
				//if (linkwords.includes("Home") === true) {
				if (linkwords.indexOf("Home") > -1) {  //Stupid IE!!
					ishome = true;
				};
				//linkwords = linkwords.replace(" » "," ▼");
				/* Above code doesn't seem to work in production. Let's try something else...*/
				/*See if has any children */
				linkwords = linkwords.replace(" » ","");
				var haslistchild = false;
				$(this).parent().children('ul').each(function () {
					haslistchild = true;
				});
				if (haslistchild === true) {
					linkwords = linkwords+" ▼";
				}
			});
			if (ishome === true) {return true;};
			
			/* New skill acquired! SKill: "appendTo"!!! */
			var thisitem = $('<li class="navbar_item"></li>').appendTo(innernav);
			var thislink = $('<a href="'+href+'">'+linkwords+'</a>').appendTo(thisitem);
			var underlist = "";
			
			/* Make sub-items, if any */
			$(this).children('ul').children('li').children('a').each(function () {
				var thistext = $(this).clone().children().remove().end().text();
				var href = $(this).attr("href");
				
				/* If no <ul> to go inside of, then make it */
				if (!underlist) {
					underlist = $('<ul></ul>').appendTo(thisitem);
				}
				
				underlist.append('<li><a href="'+href+'">'+thistext+'</a></li>');
			});
		});
	};
	
	function makeVerse() {
		var header = $('div.header');
		header.append('<div id="headerversebox">"My son, do not forget my teaching, but keep my commands in your heart..." Proverbs 3:1-4</div>'); 
	};
	
	doTopBar();
	doNavBar();
	makeVerse();
	
	/* Do the dropdown thing */
	$(".navbar_item").click(function () {
        $('.navbar_item > ul').not($(this).children("ul").toggle()).hide();
        
        $('#navbar_inner').children('.navbar_item').each(function () {
			var navitem = $(this);
        	var html = navitem.html();
            
			if (navitem.children("ul").is(":visible")) {
                  navitem.html(html.replace("▼", "▲"));
			} else {
				navitem.html(html.replace("▲", "▼"));
			};
		});
        
    });
	
	/* Dropdown for login */
	$("div.loginbutton a").click(function () {
		$("ul#meta_container div.loginbutton").children('div#loginBox').toggle();
	});
});
