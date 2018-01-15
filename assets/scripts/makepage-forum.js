String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

$(document).ready(function() {
	
	var iterspeed = 3; //speed of operation in milliseconds
	
	/* Master forum */
	function doForum1() {
		var thistable = $('div.pagecontent.clearfix').children('table').last();
		var tablebody = thistable.children('tbody').first();
		
		/*Style the table */
		thistable.addClass('forumtablestyle');
		
		/* Style the cells */
		tablebody.children('.even, .odd, .bg1color').children('td').each(function(k,v) {
			var thisthing = this;
			
			setTimeout(function () {
				$(thisthing).addClass('forumcellstyle');
			}, k*iterspeed);
		});
		
		/* Cell font */
		/* Style the 'Last posted' cell */
		tablebody.children('.even, .odd').children('td:last-child').each(function(k,v) {
			var thisthing = this;
			setTimeout(function() {
				var thishtml = $(thisthing).html();
				var datestring = thishtml.substring(0,thishtml.lastIndexOf('<'));
				var namestring = thishtml.substring(thishtml.indexOf('by'), thishtml.length-1);

				/* Bolden the date and time ---------------- */
				/* Do the date */
				var realdate = datestring.substring(datestring.indexOf('/')-2, datestring.lastIndexOf('/')+3);
				var dateindex = datestring.indexOf(realdate);
				datestring = datestring.replace(realdate, '');
				datestring = datestring.insert(dateindex, '<span class="celldatestyle">' + realdate + '</span>');

				/* Now do the time */
				var realtime = datestring.substring(datestring.lastIndexOf(':')-2, datestring.lastIndexOf(':')+6);
				var timeindex = datestring.indexOf(realtime);
				datestring = datestring.replace(realtime, '');
				datestring = datestring.insert(timeindex, '<span class="celldatestyle">' + realtime + '</span>');

				/* Bolden the names --------------- */
				var realname = namestring.substring(namestring.indexOf('by')+3, namestring.length);
				var nameindex = namestring.indexOf(realname);
				namestring = namestring.replace(realname, '');
				namestring = namestring.insert(nameindex, '<span class="cellnamestyle">' + realname + '</span>');

				$(thisthing).html( datestring + '<br>' + namestring );
			}, k*iterspeed);
		});
		
		/* Style the top bar */
		$('tr.adminHeadRow th').addClass('forumtopbar');
	}
	
	/* sub-forum */
	function doForum2() {
		var thistable = $('div.pagecontent.clearfix').children('table:has(tbody tr.adminHeadRow)');
		
		/*Style the table */
		thistable.addClass('subforumtablestyle');
		
		/* Style the top bar */
		$('tr.adminHeadRow th').addClass('forumtopbar');
	}
	
	function doPosts() {
		// title bar goes like this:
		// <div class="forumpostbar">
		//   <div style="display:table-cell;float:left;"> Name </div>
		//   <div style="display:table-cell;float:right;"> at date </div>
		// </div>
		
		var thistable = $('div.pagecontent.clearfix').children('table:has(tbody:has(.odd))');
		thistable.addClass('subforumtablestyle');
		
		var tablebody = thistable.children('tbody').first();
		
		tablebody.children().each(function(k,v) {
			var postblock = $(this);
			var infoblock = postblock.children('td').first();
			infoblock.addClass("forumpostcontent");
			
			/* Organize the information */
			var author = infoblock.children('span').first().text();
			var postdate = "";
			var posttime = "";
			
			$(infoblock)
  			.contents()
  			.filter(function() {
    				return this.nodeType === 3 && $.trim(this.nodeValue) !== '';	//Only text nodes
  			}).each(function() {
				if (this.nodeValue.includes("Posted")) {
					postdate = this.nodeValue.slice(7);
				} else if (this.nodeValue.includes(":")) {
					posttime = this.nodeValue;
				}
			});
			
			//We do not need infoblock anymore. Goodbye infoblock. May you be forever not-seen.
			infoblock.hide();
			
			var posttopbar = $('<div class="postbarwrapper"></div>').insertBefore(postblock);
			posttopbar.append('<div class="postbarname">'+author+'</div>');
			posttopbar.append('<div class="postbardate">' + postdate + ', ' + posttime + (k===0 ? '<span style="font-family:Merriweather;font-size:14px;"> (Latest)</span>' : "") + '</div>');
			
			//Migrate over all child links
			$(infoblock).children('a').appendTo(posttopbar.children(".postbardate")[0]);
		});
	}
	
	if (window.location.pathname == "/506/forum/forum") {
		doForum1();
	} else if ((window.location.pathname.indexOf("/member/forum/forum.cfm") > -1) && !(window.location.href.indexOf("threadid") > -1)) {
		doForum2();
	} else if ((window.location.pathname.indexOf("/member/forum/forum.cfm") > -1) && (window.location.href.indexOf("threadid") > -1)) {
		doPosts();
	};
});
