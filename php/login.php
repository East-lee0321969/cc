<?php
//1.连接数据库
include "conn.php";

if(isset($_POST['telphone']) && isset($_POST['pass'])){
    $tel = $_POST['telphone'];
    $pass = sha1($_POST['pass']);//加密和加密进行匹配
    $result=$conn->query("select * from registry where telphone='$tel' and password='$pass'");
    if($result->fetch_assoc()){
        echo true;//用户名和密码匹配成功
    }else{
        echo false;//用户名和密码匹配失败
    }
}