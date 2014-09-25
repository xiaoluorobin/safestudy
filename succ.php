<?php
Session_start();
$username = $_SESSION["name"];
$tips = "尚未登录，请返回登录页.<a href='login.php'>*登录*</a>";
$display = "block";
if(!isset($username)){	
	$display = "none";
}
else{
	$tips = $username."登录成功，你可以管理以下信息：";

}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml">
 <head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <title>登录成功</title>
 <script language="javascript" type="text/javascript" src="login.js">
 </script>
 </head>


 <body style="text-align:center;">

 <div style="height:200px"></div>
 <div style="background-color:red;width:400px;margin-left:300px;padding:50px;color:white;">
 
 <p><?php echo($tips) ?></p>

<div style="display: <?php echo($display) ?> ">
<a href="">管理银行卡信息</a>
<br/>
<a href="">修改注册资料</a>
<br/>
<a href="">修改手机号码</a>
<br/>
<a href="comment.php">发表评论</a>

</div>
 </div>
 </body>
 <html>

