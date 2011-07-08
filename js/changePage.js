function User_Unit(){
	$("#First_login").hide();
	$("#daohang").show();
	$("#Location_List").show();
	setCookie("loc","true");
	
}
function Unit_Room(){
	$("#Unit_info").hide();
	$("#Room_info").show();
}
function User_Fav(){
	$("#User_info").hide();
	$("#Favorite_info").show();
	
}
function Back(){
	$("#User_info").hide();
	$("#Unit_info").hide();
	$("#Room_info").hide();
	$("#Favorite_info").hide();
	$("#User_info").show();
}
function Floor_Room(){
	
}