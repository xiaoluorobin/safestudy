<?php
Session_start();
error_reporting(E_ALL);
ini_set("display_errors", 1);
$tips="请输入用户名密码";
$debugInfo = "";
$username = "";
?>
<?php
require_once('db.php');
if($_SERVER['REQUEST_METHOD'] == "POST")
{
	$username = $_POST["username"];
	$passwd = $_POST["passwd"];

	if(empty($username) || empty($passwd)){
		$tips = "用户名密码不能为空！";
	}
	else{
	
		$dao= new DataAccess('10.152.21.110','robindemo','1111','robindemo');
		$result = $dao->fetch("select * from tbuser where user_name='".$username."' and pwd='".$passwd."'");
                $row=$dao->getRow();
		if($row == false){
			$tips = "用户名、密码错误！";
		}
		else{ //登录成功
			$tips="登录成功啦";
			$_SESSION["name"]=$row["user_name"];
			header('Location: succ.php');
		}
		$debugInfo = $dao->lastsql;
	}
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>测试sql注入</title>
<script language="javascript" type="text/javascript" src="login.js">
</script>
</head>


<body style="text-align:center;">

<form action="login.php" method="post">
<div style="height:200px"></div>
<div style="background-color:green;width:400px;margin-left:300px;padding:50px">  
<p>账号: <input type="text"id="username"  name="username" value= <?php echo("\"".$username."\"") ?> /></p>
  <p>密码：<input type="password" id="password"  name="passwd" /></p>
<div id="divTips" style="color:red"><?php echo($tips)  ?></div>
 <input  type="submit" value="登录" style="width:100px;margin-top:20px" onclick="return login.checkInput();" />
</div>

<div style="clear;background-color:#444444;height:200px;margin-top:20px;color:#FFFFFF;text-align:left;padding:10px">
 调试信息：</br></br>
<?php echo($debugInfo)  ?>
<br/>
  <input  type="button" value="获取cookie" onclick="return login.getCookie();" />
</div>
</form>
</body>
<html>


