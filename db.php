<?php
/**
* 一个用来访问MySQL的类
* 仅仅实现演示所需的基本功能，没有容错等
*/
class DataAccess {
var $db; //用于存储数据库连接
var $query; //用于存储查询结果
var $lastsql;

/* 创建一个新的DataAccess对象
* @param $host 数据库服务器名称
* @param $user 数据库服务器用户名
* @param $pass 密码
* @param $db 数据库名称
*/
function __construct($host,$user,$pass,$db) {
$this->db=mysql_pconnect($host,$user,$pass); //连接数据库服务器
mysql_select_db($db,$this->db); //选择所需数据库
mysql_query("set names 'utf8'");
}

/**
* 执行SQL语句，获取一个查询源并存储在数据成员$query中
* @param $sql 被执行的SQL语句字符串
* @return void
*/
function fetch($sql) {
try{
	$this->lastsql=$sql;
	$this->query=mysql_unbuffered_query($sql,$this->db); // Perform query here
}catch(Exception $e){
  //todo log
}

}

function insertComment($inputComment,$username){
	$sql = sprintf("insert into tbcomment(user_name,comments) values('%s','%s')",   
        mysql_real_escape_string($username),   
        mysql_real_escape_string($inputComment));  
        mysql_unbuffered_query($sql,$this->db); 
}

/**
* 以数组形式返回查询结果的一行记录，通过循环调用该函数可遍历全部记录
* @return mixed
*/
function getRow () {
	if(!$this->query){ return false;}
	if ( $row=mysql_fetch_array($this->query,MYSQL_ASSOC) )
		return $row;
	else
		return false;
}

function getCount() {
if($this->query){       
	$count = mysql_fetch_row($this->query);
	return $count[0];
}
return 0;
       
}
}
?> 
