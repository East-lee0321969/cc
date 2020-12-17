<?php
//1.连接数据库
include "conn.php";
if(isset($_POST['telphone'])){
    $tel = $_POST['telphone'];
    $result=$conn->query("select * from registry where telphone='$tel'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}

if(isset($_POST['submit'])){
    $tel = $_POST['telphone'];
    $pass = sha1($_POST['password1']);
    $confirm = $_POST['password2'];
    $conn->query("insert registry values(null,'$tel','$pass','$confirm',NOW())");
    header('location:http://192.168.64.3/dashboard/jiuxian/src/login.html');
}


