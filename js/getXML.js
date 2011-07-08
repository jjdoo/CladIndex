var getDataFlag=0;
function submit(info){
	
	$.ajax({
		   type: "POST",
		   cache:false,
		   url: "http://device.mobroad.com/dress/userinfo",		 
		   data: info,
		   //访问网络失败部分
		   timeout:15000,
			error:function(dat){
			getDataFlag++;
			if(getDataFlag>3)
				{
			/*alert("获取数据失败，请检查网络！");*/
			getDataFlag=0;
				}
			submit(info);
		},
		//访问网络成功部分
		   success: function(msg){
		   //  alert(msg);
		     Dorm_URL=msg;
		     setCookie("url",Dorm_URL);
		     FRoomDetail_F(Dorm_URL);
		   }
		});	
}

function Floor_list()
{	
	var i=0;
$.ajax({
	type:"GET",
	cache:false,
	url:"http://device.mobroad.com/dress/temperatures/locations/list",
	dataType:"xml",
	timeout:15000,
	error:function(dat){
	getDataFlag++;
	if(getDataFlag>3)
		{
	/*alert("获取数据失败，请检查网络！");*/
	getDataFlag=0;
		}
	Floor_list();
},
//访问网络成功部分
    success: function(data){
	   var items=$("item",data);	   
	   $.each(items, function(){
		   unit_id[i] = $("unit_id",this).text();
		   unit_name[i] = $("unit_name",this).text();
		   unit_URL[i] = $("unit_url",this).text();
		   //alert("unit_URL[i]");
	       i++;
	    
	   });
	   getUnitList();
	}
});
//getUnitList();
}
function Room_List(url)
{
	var UI=unit_URL[url]+"?serialnumber="+serie_num;
	//alert(UI);
	for(var i=1;i<=6;i++){
		   
		$("#Room_list"+i).empty();
		$("#Room_list"+i).append("更新中…");
		}
	var i=0;
$.ajax({
	type:"GET",
	cache:false,
	url:UI,
	dataType:"xml",
	 //访问网络失败部分
	timeout:15000,
	error:function(dat){
		getDataFlag++;
		if(getDataFlag>3)
			{
		/*alert("获取数据失败，请检查网络！");*/
		getDataFlag=0;
			}
		Room_List(url);
	},
	//访问网络成功部分
	
    success: function(data){
		emptyData();
	   var items=$("item",data);	   
	   $.each(items, function(){
		   Room_num[i] = $("room_id",this).text();
		   //alert(Room_num[i]);
		   room_position[i] = $("position",this).text();
		   Room_temp[i] = $("temp_value",this).text();
		   Room_diff[i] = $("temp_diff",this).text();
		   Room_dress[i] = $("dress_value",this).text();
		   Room_URL[i] = $("room_url",this).text();		
		   Room_Tnum[i] =  Room_num[i];
		   //alert(Room_Tnum[i]);
		   room_Tposition[i] = room_position[i];
		   Room_Ttemp[i] =Room_temp[i];
		   Room_Tdiff[i] = Room_diff[i];
		   Room_Tdress[i] = Room_dress[i];
		   Room_TURL[i] =Room_URL[i];	
	       i++;
	       
	   });
	   NUM=i;
	   //alert(NUM);
	   
	   Room_list_add();
	}
});

}

function emptyData(){
	for(var ii=0;ii<room_Tposition.length;ii++)
	{
		 Room_num.length=0;
		// Room_num[ii].empty();
		   //alert(Room_num[i]);
		   room_position.length=0;
		   Room_temp.length=0;
		   Room_diff.length=0;
		   Room_dress.length=0;
		   Room_URL.length=0;		
		   Room_Tnum.length=0;
		   //alert(Room_Tnum[i]);
		   room_Tposition.length=0;
		   Room_Ttemp.length=0;
		   Room_Tdiff.length=0;
		   Room_Tdress.length=0;
		   Room_TURL.length=0;
		
	}
}
function RoomDetail(url){
	var UI=Room_URL[url]+"?serialnumber="+serie_num;
	//alert(UI);
	var i=0;	
$.ajax({
	type:"GET",
	cache:false,
	url:UI,
	dataType:"xml",
	 //访问网络失败部分
	   timeout:15000,
		error:function(dat){
		getDataFlag++;
		if(getDataFlag>3)
			{
		/*alert("获取数据失败，请检查网络！");*/
		getDataFlag=0;
			}
		RoomDetail(url);
	},
	//访问网络成功部分
    success: function(data){
	  var items=$("item",data);	   
	   $.each(items, function(){
		   Room_DT[0] = $("position",this).text();
		   Room_DT[1] = $("temp_value",this).text();
		   Room_DT[2] = $("temp_diff",this).text();
		   Room_DT[3] = $("dress_value",this).text();
		   Room_DT[4] = $("dress_suggestion",this).text();
		   //alert(Room_DT[2]);
		   $("#Room_detail_c").empty();
			$("#Room_detail_c").append("<br>&nbsp;&nbsp;"+Room_DT[0]+"<br>");
			$("#Room_detail_c").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前温度："+Room_DT[1]+"°<br>");
			$("#Room_detail_c").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;与宿舍温差："+Room_DT[2]+"°<br>");
			$("#Room_detail_c").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;穿衣指数："+Room_DT[3]+"<br>");
			$("#Room_detail_c").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;穿衣建议："+Room_DT[4]+"<br>");
	  
	   });
	  
	}
});
	
}
function FRoomDetail(url,i){
	var UI=url+"?serialnumber="+serie_num;
	//alert(UI);
	
$.ajax({
	type:"GET",
	cache:false,
	url:UI,
	dataType:"xml",
	//访问网络失败部分
	   timeout:15000,
		error:function(dat){
		getDataFlag++;
		if(getDataFlag>3)
			{
		/*alert("获取数据失败，请检查网络！");*/
		getDataFlag=0;
			}
		FRoomDetail(url,i);
	},
	//访问网络成功部分
    success: function(data){
	   var items=$("item",data);	   
	   $.each(items, function(){
		   
		   
		   Focus_pos[pageC_Room*6+i] = $("position",this).text();
		   Focus_temp[pageC_Room*6+i] = $("temp_value",this).text();
		   Focus_diff[pageC_Room*6+i] = $("temp_diff",this).text();
		   Focus_val[pageC_Room*6+i] = $("dress_value",this).text();
		   Focus_sug[pageC_Room*6+i] = $("dress_suggestion",this).text();		  
		  });	  
	    $("#Focus_room").append("<div id='roomdetail"+i+"'></div>");	   
		$("#Focus_room").append("<div id='room"+i+"'class='Focus_roomIn' onclick=\"getC_detail("+i+")\"><br>"+ Focus_pos[pageC_Room*6+i]+"&nbsp&nbsp当前温度："+ Focus_temp[pageC_Room*6+i]+"°</div>");
		$("#room"+i).append("<div class='del_focus'  onclick=\"del_collect("+pageC_Room*6+i+")\">&nbsp&nbsp</div>");
		
	}
});
}
function FRoomDetail_F(url){
	var UI=url+"?serialnumber="+serie_num;
$.ajax({
	type:"GET",
	cache:false,
	url:UI,
	dataType:"xml",
	//访问网络失败部分
	   timeout:15000,
		error:function(dat){
		getDataFlag++;
		if(getDataFlag>3)
			{
		/*alert("获取数据失败，请检查网络！");*/
		getDataFlag=0;
			}
		FRoomDetail_F(url);
	},
	//访问网络成功部分
    success: function(data){	
	   var items=$("item",data);	   
	   $.each(items, function(){
		   var pos = $("position",this).text();
		   var temp = $("temp_value",this).text();
		   var diff = $("temp_diff",this).text();
		   var val = $("dress_value",this).text();
		   var sug = $("dress_suggestion",this).text();
		   $("#Focus_dorm").empty();
			$("#Focus_dorm").append("<br>&nbsp;&nbsp;"+pos+"<br>");
			$("#Focus_dorm").append("&nbsp;&nbsp;&nbsp;&nbsp;当前温度："+temp+"°<br>");
			$("#Focus_dorm").append("&nbsp;&nbsp;&nbsp;&nbsp;与宿舍温差："+diff+"°<br>");
			$("#Focus_dorm").append("&nbsp;&nbsp;&nbsp;&nbsp;穿衣指数："+val+"<br>");
			$("#Focus_dorm").append("&nbsp;&nbsp;&nbsp;&nbsp;穿衣建议："+sug+"<br>");
			});
	   }
});
}
