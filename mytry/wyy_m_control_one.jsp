

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9, IE=8, chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta http-equiv="Cache-Control" content="no-siteapp" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="stylesheet" type="text/css" href="style/common.css">
	<!-- <link rel="stylesheet" href="layout.css" type="text/css" /> -->
	<!-- <link rel="stylesheet" href="type.css" type="text/css" /> -->
	
	<!-- <script src="js/jquery-1.6.2.min.js?version=9" type="text/javascript"></script> -->
	<!-- <script src="js/m_camerabox.js?version=8" type="text/javascript" charset="utf-8"></script> -->
	<title>微特喜，与我视频互动</title>
	<style type="text/css">
.log-ctrl, .equip-ctrl, .config-ctrl, .title-ctrl{
	width: 100%;
	margin-bottom: 2.7%;
	background-color: white;
	/*border-top: 1px solid #b3b3b3;*/
	/*border-bottom: 1px solid #b3b3b3;*/
}

.top-banner{
	width: 100%;
	padding: 1.3%;
}
.log-ctrl{
	padding: 4.2%;
}

.equip-ctrl, .title-ctrl{
	padding: 3.2% 4.2%;
}

.button-log{
	padding: 2% 4%;
	margin-top: 1.5%;
}

.config-ctrl{
	padding: 2.5% 4.2%;
}
.hd-settings{
	padding-bottom: 2%;
	padding-top: 2%;
}

.epuip-num{
	margin-top: 1.7%;
}
.bd-settings p{
	padding: 4.6% 0 4.6% 10.8%;
}
.title-input{
	float: right;
	padding: 2.1%;
	width: 60%;
}
.start-btn{
	margin: 8% 4.2%;
	background-color: #79c12f;
	padding: 2.5% 23%;
	text-align: center;
	border-radius: 3px;
}
.start-btn:hover{
	background-color:#508915;
	cursor: pointer;
}
.share-box{
	margin:4% 4.2%;
	vertical-align: middle;
}
.share-link{
	width: 73%;
	/*height: 42%;*/
	/*font-size: 14px;*/
	overflow: hidden;
	padding: 0.85em 0.5em;
	margin-right: 3%;
	border-radius: 3px;
	border:1px solid #ccc;
	background-color: #f0f0f0;
}
.button-view{
	border-color: #ff6537;
	padding: 1.72% 7.5%;
}
.button-view:hover{
	background-color: #ff6537;
	color:white;
}
.logo{
	display: inline-block;
	padding: 5.8%;
	background: url("img/logo.png") no-repeat scroll center center / 100% auto;
	margin-right: 2.5%;
	vertical-align: middle;
	
}
.logo-text{
	font-size: 20px;
}
.camera-icon{
	background: url("img/camera.png") no-repeat scroll center center / 100% auto;
}
.setting-icon{
	background: url("img/setting.png") no-repeat scroll center center / 100% auto;
}
.title-icon{
	background: url("img/title.png") no-repeat scroll center center / 100% auto;
}
	</style>
</head>
<body>
 	<div class="top-banner blue-back"></div>
 	<div class="log-ctrl">
 		<i class="logo"></i>
 		<span class="blue-color logo-text">VTC云直播</span>
 		<a href="???????" class="button-a button-log blue-color">管理员登陆</a>
 	</div>
 	<div class="equip-ctrl">
 		<i class="icon camera-icon"></i>
 		<span class="black-color">设备号</span>
 		<span class="settings-show gray epuip-num">9</span>
 	</div>
 	<div class="config-ctrl">
 		<div class="settings">
 			<div class="hd-settings">
 				<i class="icon setting-icon"></i>
 				<span class="black-color">直播配置</span>
 				<a href="?????" class="button-a blue-color">购买</a>
 			</div>
 			<div class="bd-settings">
 				<p>直播观看人数<span class="settings-show gray">0人</span></p>
 				<p>直播有效期<span class="settings-show orange-color">试用5分钟</span></p>
 			</div>
 		</div>
 		<div class="settings">
 			<div class="hd-settings">
 				<i class="icon setting-icon"></i>
 				<span class="black-color">存储配置</span>
 				<a href="?????" class="button-a blue-color">购买</a>
 			</div>
 			<div class="bd-settings">
 				<p>总存贮空间<span class="settings-show gray">0G</span></p>
 				<p>剩余存贮空间<span class="settings-show gray">0G</span></p>
 				<p>存储有效期<span class="settings-show orange-color">不限</span></p>
 			</div>
 		</div>
 	</div>
 	<div class="title-ctrl">
 		<i class="icon title-icon"></i>
 		<span class="black-color">直播标题</span>
 		<input class="title-input" type="text" name="liveTitle" placeholder="VTC云直播" />
 	</div>
 	<div class="switch-ctrl">
 		<div class="start-btn">
 			<span style="color: white;">启动</span>
 		</div>
 		<div class="share-box">
 			<input name="share-link" class="share-link" />
 			<a href="?????" class="button-view button-a orange-color">观看</a>
 		</div>
 	</div>
</body>
</html>