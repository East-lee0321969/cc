<?php

include "conn.php";
//2.输出接口
$result=$conn->query("select * from taobaogoods");

$arr = array();

for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);