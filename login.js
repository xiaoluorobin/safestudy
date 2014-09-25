function $(id){return document.getElementById(id)}; 

function UrlEncode(str){     
  var ret="";     
  var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%";     
  var tt= "";    

  for(var i=0;i<str.length;i++){     
   var chr = str.charAt(i);     
    var c=str2asc(chr);     
    tt += chr+":"+c+"n";     
    if(parseInt("0x"+c) > 0x7f){     
      ret+="%"+c.slice(0,2)+"%"+c.slice(-2);     
    }else{     
      if(chr==" ")     
        ret+="+";     
      else if(strSpecial.indexOf(chr)!=-1)     
        ret+="%"+c.toString(16);     
      else     
        ret+=chr;     
    }     
  }     
  return ret;     
}  
function str2asc(strstr){
	return ("0"+strstr.charCodeAt(0).toString(16)).slice(-2);
} 

var LoginFun = function(){};

LoginFun.prototype.checkInput = function( ){
  	var username = $("username").value;
	var password = $("password").value;
	//return true;
	if(username == "" || password == ""){
	   alert("请输入用户名、密码");
	   return false;
	}
	if(!/^[\da-zA-Z]+$/.test(username) || !/^[\da-zA-Z]+$/.test(password)){
		alert("请不要输入特殊字符");
		return false;
	}
	return true;
        }

LoginFun.prototype.getCookie = function(){

	objname = "PHPSESSID";
	var arrstr = document.cookie.split("; "); 
	for(var i = 0;i < arrstr.length;i++){ 
	var temp = arrstr[i].split("="); 
	var cookieVal = "";
	if(temp[0] == objname) {
		cookieVal= unescape(temp[1]); 
        }
    }
    alert(cookieVal);

}

LoginFun.prototype.redirect = function(){
	var condition = $("inputCondition").value;
	location.href="comment.php?condition="+UrlEncode(condition);

}
LoginFun.prototype.redirectInsert = function(){
	var condition = $("inputComment").value;
	location.href="comment.php?inputComment="+UrlEncode(condition);

}



var login = new LoginFun();
