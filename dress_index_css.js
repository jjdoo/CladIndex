var unit_id= new Array();//用于保存楼房名称
var unit_name= new Array();//用于保存楼房名称
var unit_URL= new Array();//用于保存楼房链接
var serie_num;
//var Room_num=new Array();
var Room_temp=new Array();
var Room_num= new Array();
var room_position= new Array();
var Room_temp= new Array();
var Room_diff= new Array();
var Room_URL= new Array();
var Room_Ttemp=new Array();
var Room_Tnum= new Array();
var room_Tposition= new Array();
var Room_Ttemp= new Array();
var Room_Tdiff= new Array();
var Room_TURL= new Array();
var Room_dress= new Array();
var Room_Tdress= new Array();
var Room_DT=new Array();
var Focus_pos=new Array();
var Focus_temp=new Array();
var Focus_diff=new Array();
var Focus_val=new Array();
var Focus_sug=new Array();
var FL=true;
var Floor_N=12;
var Str=Floor_N-1;
var cur_Floor=0;
var Floor_S=new Array();
var page_Room=0;  //标记全部界面列表当前显示的页码
var pageC_Room=0;  //标记收藏界面列表当前显示的页码
var page_Focus=0;//标记收藏界面列表当前显示的页码	
var SR_num=0;
var Dorm_URL;
var NUM=0;
/*用于记录用户注册信息*/
var dorm_Floor="学五";
var Dorm_num=101;
var Height=187;
var Weight=150;
var Age=21;
var tempa=90;
var myAccount = Widget.Device.AccountInfo;
function init() {	
	jQuery(document).ready(function(){
		   $("#Location_Lis1t").click(function(e){   //定义了mousemove事件发生时的处理函数
		      alert(e.pageY +', '+ e.pageX);  //事件处理函数的参数是一个event对象，从这个对象中可以获取当前鼠标的位置（e.pageX和e.pageY），然后将它们显示在status页面元素中
		   }); 
		})
		var info=getCookie("info");
	//alert("info="+info);
	if(info!=null)
	{ submit(info);}
		serie_num=getCookie("serie_num");	
     	//serie_num=15165254863;
		$("#Floor_list").append("数据更新中……");		
		var flag=getCookie("serie_num"); 
		Dorm_URL=getCookie("url");
		//alert(Dorm_URL);
		if(serie_num!=null)			
			{	
			$("#daohang").show();
			go_ALLoc();
			setTimeout("go_Focus();",200);		
			
			}
		 SR_num=getCookie("num"); 
		 if(SR_num==null&&serie_num!=null)
			 {
			 SR_num=0;
			 setCookie("num",SR_num);
			 go_ALLoc();
			$("#daohang").show();
			 }
		 if(serie_num==null)
			{
			getPhoneMSISDN();
			alert(serie_num);		
			}
		 Dorm_URL=getCookie("url");
		 getFloorseries();
		 getFloornum(Floor_N-1);
}
function UserInfo_OK() {
	var info= "serial_number="+serie_num+"&location="+dorm_Floor+"-"+Dorm_num+"&height="+Height+"&weight="+Weight+"&age="+Age;
	//alert(info);
	submit(info);
	setCookie("info",info);
	User_Unit();
	go_ALLoc();
}
function go_Focus(){
	$("#daohang1").css("background-image","url('img/Focus_D.png')");
	$("#daohang2").css("background-image","url('img/All_loc.png')");
	$("#daohang3").css("background-image","url('img/health.png')");
	$("#daohang4").css("background-image","url('img/Set.png')");
	$("#Location_List").hide();
    $("#First_login").hide();
	$("#Focus_List").show();
	$("#Health_info").hide();
	pageC_Room=0;
	getDormInfo();  //挂载宿舍信息
	getFocusInfo();	
	
	
}
function go_ALLoc(){
	$("#daohang1").css("background-image","url('img/Focus.png')");
	$("#daohang2").css("background-image","url('img/All_loc_D.png')");
	$("#daohang3").css("background-image","url('img/health.png')");
	$("#daohang4").css("background-image","url('img/Set.png')");
	$("#Location_List").show();
	$("#First_login").hide();
	$("#Focus_List").hide();
	$("#Health_info").hide();
	for(var i=1;i<=6;i++)  //初始化作用
		{
	$("#Room_add"+i).css("background-image","url('img/btn_Focus.png')");
		}
	$("#Floor_list").append("&nbsp;&nbsp;数据更新中……");
	Floor_list();
	back_list();
	getUnitList();
	
	
	}
function go_Health(){
	$("#daohang1").css("background-image","url('img/Focus.png')");
	$("#daohang2").css("background-image","url('img/All_loc.png')");
	$("#daohang3").css("background-image","url('img/health_D.png')");
	$("#daohang4").css("background-image","url('img/Set.png')");
	$("#Location_List").hide();
	$("#First_login").hide();
	$("#Focus_List").hide();
	$("#Health_info").show();
	getItems();	
}
function go_Set(){
	$("#daohang1").css("background-image","url('img/Focus.png')");
	$("#daohang2").css("background-image","url('img/All_loc.png')");
	$("#daohang3").css("background-image","url('img/health.png')");
	$("#daohang4").css("background-image","url('img/Set_D.png')");
	$("#Location_List").hide();
	$("#First_login").show();
	$("#Focus_List").hide();
	$("#Health_info").hide();
	
	
	
}

function get_dorm_place(obj){
	dorm_Floor=obj.options[obj.selectedIndex].text;
	}
function get_dorm_info(){	
	Dorm_num= document.getElementById("dorm_num").value;
	if(Dorm_num==null||Dorm_num=="")
		Dorm_num=101;
	
	}
function get_height_info(){	
	Height= document.getElementById("set_height").value;
	if(Height==null||Height=="")
		Height=187;
}
function get_weight_info(){
	Weight = document.getElementById("set_weight").value;
	if(Weight==null||Weight=="")
		Weight=75;
	Weight=Weight/2;
}
function get_age_info(){
	Age = document.getElementById("set_age").value;
	if(Age==null||Age=="")
		Age=21;
}
function getUnitList(){
	$("#Floor_list").empty();	
	 for(var i=0;i<unit_name.length;i++){		 
		 $("#Floor_list").append("<div id='unit"+i+"'class='unitshow' onclick=\"unit_OK("+i+")\">"+unit_name[i]+"</div>");
	 }
	 unit_OK(0);
	
}
function getRoomDetail(i){	
	for(var j=1;j<7;j++){
		$("#Room_list"+j).css("background-image","url('img/btn_Room.png')");
	}
	$("#Room_list"+i).css("background-image","url('img/btn_Room_D.png')");
	$("#Location_List #Floor_list").hide();
	$("#Location_List #Room_detail").show();
	$("#Room_detail_c").empty();
	$("#Room_detail_c").append("<br>&nbsp;&nbsp;数据更新中……<br>");
	RoomDetail(i+page_Room*6-1);
	var currentRoom=i-1+page_Room*6;
	}
function back_list(){
	$("#Location_List #Room_detail").hide();
	for(var j=1;j<7;j++){
		$("#Room_list"+j).css("background-image","url('img/btn_Room.png')");
	}
	$("#Location_List #Floor_list").show();
}
function saveRoom(i){
	if(Room_URL[i+page_Room*6-1]==null)
		{
		alert("无法收藏空房间！");
		return;
		}
	if(i+page_Room*6-1<Room_num.length){
	$("#Room_add"+i).css("background-image","url('img/btn_Focus_D.png')");	
	for(var j=0;j<SR_num;j++)
		{
		var compare=getCookie(j);
		if(compare==Room_URL[i+page_Room*6-1])
			{
			alert("该房间已经收藏！");
			return;
			}
		}
	
	setCookie(SR_num,Room_URL[i+page_Room*6-1]);
	SR_num++;
	setCookie("num",SR_num);
	}
	/*else
		alert("无法收藏空房间！");*/
}
function unit_OK(i){
	//alert("before");
	for(var j=0;j<unit_name.length;j++){
		if(i!=j)
		$("#unit"+j).css("text-decoration","underline");
	}
	cur_Floor=0;
	getFloornum(Floor_N-1);
	Str=Floor_N-1;
	//alert("become");
	//$("#unit"+i).css("background-color","red");	
	//alert("after");
	Room_List(i);
	$("#unit"+i).css("text-decoration","none");	//text-decoration : underline;
	var len=Room_num.length;
	page_Room=0;//单击相应楼重置当前页数	
	}
function Room_list_add(){ 
	/*if(FL==true)
		{
		$("#unit"+0).css("background-color","red");
		FL==false;
		}*/
	//alert(cur_Floor);//实现动态多页面挂载
	//alert(SR_num);
	for(var i=0;i<Room_Tnum.length;i++)
	{		
	 Room_num[i] = Room_Tnum[i];
	 //alert(Room_num[i]);
	 room_position[i] =room_Tposition[i];
	   Room_temp[i] =Room_Ttemp[i];
	   Room_diff[i] = Room_Tdiff[i];
	   Room_dress[i] = Room_Tdress[i];
	   Room_URL[i] =  Room_TURL[i];			
	}
	NUM=Room_Tnum.length;	
	if(cur_Floor!=0){
		var j=0;
		page_Room=0;
		for(var i=0;i<NUM;i++)
			{
			 Room_URL[i] =null;
			//alert(SR_num);
			var tag=Math.floor(Room_num[i]/100);
			//alert(tag);
			if(tag==cur_Floor)
				{
				 Room_num[j] = Room_num[i];
				   //alert(Room_num[i]);
				   room_position[j] =room_position[i];
				   Room_temp[j] =Room_temp[i];
				   Room_diff[j] = Room_diff[i];
				   Room_dress[j] = Room_dress[i];
				   Room_URL[j] =  Room_TURL[i];
				   j++;
				}
			}
		NUM=j;
		for (var k=0;k<6;k++)
			{$("#Room_list"+k).empty();}
		//SR_num=j-1;
		//alert(NUM);
	}
		var pagea=page_Room*6;	
	for(var i=1;i<=6;i++){
		   
		$("#Room_list"+i).empty();
		if(i+pagea-1<NUM)
			{
			$("#Room_list"+i).append("<span>"+Room_num[i+pagea-1]+"  </span><span class='tempblue'>"+Room_temp[i+pagea-1]+"°</span>");	
		//$("#Room_list"+i).append(Room_num[i+pagea-1]+" "+Room_temp[i+pagea-1]+"°");
		$("#Room_add"+i).css("background-image","url('img/btn_Focus.png')");    
		for(var j=0;j<=SR_num;j++){
			
			var RURL=getCookie(j);
			if(Room_URL[i+pagea-1]==RURL)
				{
			  	$("#Room_add"+i).css("background-image","url('img/btn_Focus_D.png')");
				continue;
				}		
			}
	}
		else
			$("#Room_add"+i).css("background-image","url('img/btn_Focus.png')");
		}	
	}	


function getDormInfo(){
	//alert(Dorm_URL);
	FRoomDetail_F(Dorm_URL);
	//alert(Dorm_URL);
	
}
function getFocusInfo(){
	$("#Focus_room").empty();
	
	for(var i=0;i<6;i++){		
	    var RURL=getCookie(pageC_Room*6+i);
	    if(SR_num<=(pageC_Room*6+i))
	    	break;
	       FRoomDetail(RURL,i); 
	
	}
	}
function getC_detail(i){	
	/*if(tempa<7&&tempa>=0)
		{back_collect(tempa);
		}
	    tempa=i;*/
	for(var j=0;j<6;j++)
	{
	if(i!=j)
		back_collect(j);
	}
	
	$("#roomdetail"+i).addClass("Focus_roomdetailIn");
	$("#room"+i).slideUp(2000);
	$("#roomdetail"+i).empty();
	$("#roomdetail"+i).append("<br>&nbsp;&nbsp;"+Focus_pos[pageC_Room*6+i]+"<br>");
	$("#roomdetail"+i).append("<br>&nbsp;&nbsp;&nbsp;&nbsp;当前温度："+Focus_temp[pageC_Room*6+i]+"°<br>");
	$("#roomdetail"+i).append("&nbsp;&nbsp;&nbsp;&nbsp;与宿舍温差："+Focus_diff[pageC_Room*6+i]+"°<br>");
	$("#roomdetail"+i).append("&nbsp;&nbsp;&nbsp;&nbsp;穿衣指数："+Focus_val[pageC_Room*6+i]+"<br>");
	$("#roomdetail"+i).append("&nbsp;&nbsp;&nbsp;&nbsp;穿衣建议："+Focus_sug[pageC_Room*6+i]+"<br>");
	$("#roomdetail"+i).append("<div class='colse_focus'  onclick=\"back_collect("+i+")\"></div>");
	$("#roomdetail"+i).slideDown(1000);
	/*setTimeout("showcollect("+i+")",2000);*/
	}
function showcollect(i)
{
	$("#roomdetail"+i).slideDown(2000);	
}
function back_collect(i){
	/*$("#roomdetail"+i).slideUp(1000);
	$("#room"+i).show();*/
	$("#roomdetail"+i).slideUp(2000);
	setTimeout($("#room"+i).show(),2000);
	
	//$("#roomdetail"+i).slideUp();
	
	}
function del_collect(i){	
	var compareU=getCookie(i) ;
	for(var j=0;j<SR_num;j++){			
		if(j>=i)
			{
			 var temp=getCookie(j+1) ;
			 setCookie(j,temp);	
			 /*Focus_pos[j] = Focus_pos[j+1];
		     Focus_temp[j] =  Focus_temp[j+1];
			 Focus_diff[j] = Focus_diff[j+1];
			 Focus_val[j] = Focus_val[j+1];
		     Focus_sug[j] = Focus_sug[j+1];*/
			}
		
		
	}
	setCookie(SR_num,null);
	SR_num--;
	setCookie("num",SR_num);
	getFocusInfo();
}
function All_left(){
	if(page_Room==0)
		{
		alert("这是第一页");
	    return;
		}
	    else 
	    	{
	    	for(var j=1;j<7;j++){
	    		$("#Room_list"+j).css("background-image","url('img/btn_Room.png')");
	    	}
	    	back_list();
	    page_Room-- ;   
	    Room_list_add();
	    	}
}
function All_right(){
	var allpage=NUM/6;
	if(page_Room+1>=allpage)
		{
		alert("这是最后一页");
	return;
		}
	else{
		for(var j=1;j<7;j++){
			$("#Room_list"+j).css("background-image","url('img/btn_Room.png')");
		}
		back_list();
		page_Room++;
	Room_list_add();
	}
}
function ResetAll(){
	$( '#dormitory_Floor' ).val( 5 );
	document.getElementById("dorm_num").value="";
	document.getElementById("set_height").value="";
	document.getElementById("set_weight").value="";
	document.getElementById("set_age").value="";
	
}
function Focus_left(){
	if(pageC_Room==0)
	{
	alert("这是第一页");
    return;
	}
    
    pageC_Room-- ;   
    getFocusInfo();
   }
	
function Focus_right(){
	var allpage=SR_num/6;
	if(pageC_Room+1>=allpage)
		{
		alert("这是最后一页");
	return;
		}
	
	pageC_Room++ ; 
	
    getFocusInfo();
   }
function getFocusInfo2(){
	$("#Focus_room").empty();
	
	for(var i=0;i<6;i++){		
	    var RURL=getCookie(pageC_Room*6+i);
	    if(SR_num<=(pageC_Room*6+i))
	    	break;	  
	    $("#Focus_room").append("<div id='roomdetail"+i+"'></div>");	   
		$("#Focus_room").append("<br><div id='room"+i+"'class='Focus_roomIn' onclick=\"getC_detail("+i+")\">"+ Focus_pos[pageC_Room*6+i]+i+"&nbsp&nbsp当前温度："+ Focus_temp[pageC_Room*6+i]+"°</div>");
		$("#room"+i).append("<div class='del_focus'  onclick=\"del_collect("+pageC_Room*6+i+")\">&nbsp&nbsp</div>");
		
	
	}
	}	
function getFloorseries(){
	var Floor_N=12;
	var Floor_S=new Array();
	for(var i=0;i<2*Floor_N;i++)
		{
		if(i<=Floor_N)
			Floor_S[i]=i;
		else
			Floor_S[i]=2*Floor_N-i;
		//alert(Floor_S[i]);
		
		}
	
}

function getFloornum(start){
	$(".Floor_num").empty();
	if((start+6)<=Floor_N)	
	{
	    for (var i=0;i<6;i++)
		{		
	    $("#choice_Floor").append("<div id='num_"+i+"'   class='Floor_num'>"+(i+start)+"</div>");
	    }
	}
	else	{
		for (var j=0;j<6;j++)
			{
			if(j+start<=Floor_N)
		$("#choice_Floor").append("<div id='num_"+j+"'   class='Floor_num'>"+(j+start)+"</div>");
			else
		$("#choice_Floor").append("<div id='num_"+j+"'   class='Floor_num'>"+(j+start-Floor_N-1)+"</div>");		
		}
	
}
}
function decstart(){
	   Str--;
	   if(Str==-1)
		   Str=Floor_N;
	  // else
	   back_list();	
	$(".Floor_num").empty();
	cur_Floor=(Str+2)%(Floor_N+1);
	//alert(cur_Floor);
	getFloornum(Str);
	Room_list_add();
	
}
function addstart(){
	    if(Str==Floor_N)
	    	Str=0;
	    else
		Str++;	
	    back_list();
	$(".Floor_num").empty();
	cur_Floor=(Str+2)%(Floor_N+1);
	//alert(cur_Floor);
	getFloornum(Str);	
	Room_list_add();
}

function getPhoneMSISDN(){
	serie_num = myAccount.phoneUserUniqueId;
	setCookie("serie_num",serie_num);
} 
function KeyPress(objTR)
{//只允许录入数据字符 0-9 和小数点
   //var objTR = element.document.activeElement;  
   var txtval=objTR.value;  
  
   var key = event.keyCode;
   if((key < 48||key > 57)&&key != 46)
   {  
    event.keyCode = 0;
   }
   else
   {
    if(key == 46)
    {
     if(txtval.indexOf(".") != -1||txtval.length == 0)
      event.keyCode = 0;
    }
   }
}