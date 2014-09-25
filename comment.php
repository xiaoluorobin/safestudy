<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>查看评论</title>

<script language="javascript" type="text/javascript" src="login.js">
</script>
</head>
<body style="background-color:#AA9999">
<div style="margin:20px">

<input type="text" length="100px" id="inputCondition"> <input type="button" value="查找评论" onclick="login.redirect()"/>
<br/>
<br/>

<?php
Session_start();
$username = $_SESSION["name"];
 
$cond = $_GET["condition"];
$conditionDesc = "";
if(empty($cond)){
	$cond = "";
}
else{
	$conditionDesc =$cond."查询结果如上。";
	$cond = " where comments like '%".$cond."%'";
}
require_once('db.php');
$dao= new DataAccess('10.152.21.110','robindemo','1111','robindemo');
$inputComment = $_GET["inputComment"];
if(!empty($inputComment) && isset($username)){
	$dao->insertComment($inputComment,$username);
	header('Location: comment.php');
}


$dbcolarray = array('用户名', '评论内容');
$sql = "select count(*) from tbcomment".$cond;
$dao->fetch($sql);
$count = $dao->getCount();
echo "共有 $count 条评论<br />";
$sql = "SELECT  user_name,comments FROM tbcomment".$cond;
$dao->fetch($sql);
//表格
echo '<table id="Table" border=1 width=500px cellpadding=10 cellspacing=2 bordercolor=#ffaaoo>'; 
//表头
$thstr = "<th>" . implode("</th><th>", $dbcolarray) . "</th>";
echo $thstr;
//表中的内容
while ($row=$dao->getRow())
{
        $user_name = $row["user_name"];
	$comments = $row["comments"];
        echo "<tr>";
        $tdstr = "";
                $tdstr .= "<td>$user_name</td>"."<td>$comments</td>";
        echo $tdstr;
        echo "</tr>";
}
echo "</table>";
?> 
</div>
<div style='color:red;padding-left:50px;font-size:50px'>
</br>
<?php echo($conditionDesc) ?>
<div style="margin:20px">
<input type="text" length="100px" id="inputComment"> <input type="button" value="添加评论" id="btnAddComment" onclick="login.redirectInsert()"/>
</div>

<body>
</html>
