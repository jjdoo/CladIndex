function getItems(){
	var i=0;
	$("#detail").hide();
	$.ajax({
		type:"GET",
		url:"http://anxin.qeexin.com/rss.php?rssid=33",
		dataType:"xml",
	    success: function(data){
		   var items=$("item",data);
		   var title = new Array();
		   $("#main").empty();
		   $.each(items, function(){
			   i++;
			   var link = $("link",this).text();
			   var des = $("description",this).text();
			   if(i<=10)
			   { $("#main").append("<div class='items' id='"+link+"'>"+$("title",this).text()+"</div>");
			     $(".items:last").click(function(){
				  getDiscription(des,link);
			   });
			   }
		   });
		}
	});
}

function getDiscription(des,link){
	 $("#main").empty();
	 $("#detail").show();
	 $("#detail").click(function(){
		  getComment(link);
	   });
	 $("#main").append("&nbsp;&nbsp;&nbsp;&nbsp;"+des);
}

function getComment(l){
	this.url=l;
	$.ajax({
		type:"GET",
		url:url,
		dataType:"html",
	    success: function(data){
		var items=$("endtext",data);
		  $("#main").empty();
		  $("#main").html(items);
		}
	});
}

