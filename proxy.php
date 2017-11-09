<?php

	header('Content-Type:text/json;charset=utf-8');//设置返回文件的类型
	header('Access-Control-Allow-Origin: *');//设置允许所有跨域
	$url= $_SERVER['REQUEST_URI']; //获取url localhost后面部分
	if($url=='/' || $url=='/proxy.php'){
		$data['msg']="你填写你的url参数";
		echo (json_encode($data));
		die();
	}else{
		$arr=explode('apiProxy=',$url); 
		$data =file_get_contents($arr[1]);
		echo $data;
	}
    


    