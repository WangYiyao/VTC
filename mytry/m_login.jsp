<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9, IE=8, chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta http-equiv="Cache-Control" content="no-siteapp" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="stylesheet" type="text/css" href="style/common.css">
	<title>微特喜，与我视频互动</title>

	<style type="text/css">
.top-banner{
	width: 100%;
	padding: 1.3%;
}
.logo-box, .reg-box{
	text-align: center;
	background-color: white;
}
.logo-box{
	padding-top: 22%;
	padding-bottom: 16.5%;
}
.reg-box{
	padding-bottom: 2.3%;
}
.logo-img{
	background: url("img/logo.png") no-repeat scroll center center / 100% auto;
	padding: 9.3%;
	margin-bottom: 9.3%;
}
.logo-text{
	margin-top: 20%;
	font-size:25px;
}
.user-name, .pass-word{
	border-radius:3px;
	border:1px solid #b9babf;
	width: 87%;
	margin:0 auto 6.9%;
	height: 66px;
}
.user-name i{
	background: url("img/uspic.png") no-repeat scroll center center / 50% auto;
	padding: 32px;
	float: left;
	background-color: #f1f2f6;
} 
.pass-word i{
	background: url("img/lock.png") no-repeat scroll center center / 50% auto;
	padding: 32px;
	float: left;
	background-color: #f1f2f6;
}
.user-name input, .pass-word input{
	border: 0;
	height: 64px;
	width: 84.2%;
	padding-left: 4.7%;
}
.log-box{
	margin: 8% 4.2%;
	padding: 3% 23%;
	text-align: center;
	border-radius: 3px;
}
.log-box:hover{
	background-color:#006fb8;
}
	</style>
</head>
<body>
	<div class="top-banner blue-back"></div>
	<div class="logo-box">
		<i class="logo-img"></i>
		<p class="blue-color logo-text">移动云直播</p>
	</div>
	<div class="reg-box">
		<form id="loginForm">
			<div class="user-name">
				<i></i>
				<input type="text" name="user.userId" placeholder="账户名/用户" />
			</div>
			<div class="pass-word">
				<i></i>
				<input type="password" name="user.password" placeholder="请输入密码" />
			</div>
		</form>
	</div>
	<div class="log-box blue-back" onclick="login()">
		<span style="color: white;">登录</span>
	</div>
	<script type="text/javascript">
		function login(){
			document.getElementById("loginForm").submit();
		}
	</script>
</body>
</html>