<%@page import="com.vtc.livemedia.base.GlobalConfig"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%
String hostname =GlobalConfig.HTTPHOST;
int maxOnlineCnt = GlobalConfig.maxOnlineCnt;
%>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9, IE=8, chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta http-equiv="Cache-Control" content="no-siteapp" />
	<meta name="format-detection" content="telephone=no" />

	<!-- <link rel="stylesheet" type="text/css" href="votePage.css"> -->
	<style type="text/css">
		@media only screen and (min-width: 480px){
	body{
		width:480px;
		margin:0 auto;
	}
}

*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	text-decoration: none;
	list-style-type: none;
	color: #888;
	/*font-size: 16px;*/
}
@media screen and (max-width:340px){
	*{
		font-size:15px;
	}
}
@media screen and (min-width: 410px){
	*{
		font-size: 16px;
	}
	.vote-title, .vote-title span{
		font-size: 20px;
	}
}
@media screen and (min-width: 340px) and (max-width: 410px){
	*{
		font-size: 16px;
	}
	.vote-title, .vote-title span{
		font-size: 18px;
	}
}
.banner-div img{
	width: 100%;
}
.search-div{
	padding: 2px 3% 3.4%;
}
.search-div span{
	display: inline-block;
	padding: 1%;
}
.search-input{
	width: 80%;
	padding: 1.5% 0 1.5% 10%;
	border-radius: 2px;
	border: 1px solid #a3a3a3;
	background: url(img/search.png) no-repeat border-box;
	background-size: 20px 20px;
	background-position: 5% 50%;
}

.search-btn{
	width: 17%;
	float: right;
	text-align: center;
	display: inline-block;
	padding: 1.5%;
	background-color: #ea5c48;
	box-shadow: 2px 2px #c14635;
	color: #fff;
}

.search-btn:hover, .vote-btn:hover{
	background-color: #c14635;
}
.search-div p{
	color: #999;
	margin:3% 0;
}
.show-div{
	border-top: 1px solid #d6d6d6;
	padding: 2% 8%
}
.bh-show{
	width: 100%;
	border:1px solid #28a6d4;
	margin-top: 3%;
	border-radius: 22px;
}
.show-new{
	display: inline-block;
	width: 48%;
	text-align: center;
	padding: 3px 0;
	border-top-left-radius: 22px;
	border-bottom-left-radius: 22px;
	background-color: #28a6d4;
	color:#fff;
}
.show-rank{
	display: inline-block;
	width: 49%;
	text-align: center;
	padding: 3px 0;
	border-top-right-radius: 22px;
	border-bottom-right-radius: 22px;
	color: #28a6d4;
}
.show-cell{
	margin: 6% 2px 0 2px;
	padding-bottom: 3%;
	border-bottom: 1px solid #d6d6d6;
	position: relative;
}
.show-cell img{
	width: 27%;
	margin-right: 8%;
}
.vote-title{
	position: absolute;
	top: 0;
	/*font-size: 20px;*/
	left:38%;
}
.vote-title span{
	/*font-size: 20px;*/
}
.vote-btn{
	position: absolute;
	bottom: 13%;
	left:38%;
	padding: 2px 8%;
	border-radius: 20px;
	background-color: #ea5c48;
	color: #fff;
}
.vote-count{
	position: absolute;
	bottom: 9%;
	right: 0;
}
.vote-count span{
	/*font-size: 20px;*/
	color: #ea5c48;
}
.vote-done{
	background-color: #d3d3d3;
	padding: 2px 6%;
}
.bt-show{
	margin-top: 5%;
	font-size: 
}
.bt-show p{
	padding-bottom: 3%;
}
.bt-show li{
	padding-bottom: 3%;
	/*list-style-type: decimal;*/
}
	</style>
	<title>投票</title>
</head>

<body>
	<div class="banner-div">
		<img src="img/banner.png"/>
	</div>
	<div class="search-div">
		<div>
			<input type="text" class="search-input" placeholder=" 搜索" />
			<div class="search-btn">确定</div>
		</div>
		<p>已报名<span>1002</span>&#47投票数<span>19532</span>&#47访问量<span>6265</span></p>
	</div>
	<div class="show-div">
		<div class="bh-show">
			<span class="show-new">最新</span>
			<span class="show-rank">排行</span>
		</div>
		<div class="bd-show">
			<div class="show-cell">
				<img src="img/example.jpg">
				<div class="vote-title">
					<span class="vote-num">001</span>女神候选人：<span>陈梦怡</span>
				</div>
				<div class="vote-btn">投票</div>
				<div class="vote-count"><span>56</span>票</div>
			</div>
			<div class="show-cell">
				<img src="img/example.jpg">
				<div class="vote-title">
					<span class="vote-num">001</span>女神候选人：<span>陈梦怡</span>
				</div>
				<div class="vote-btn">投票</div>
				<div class="vote-count"><span>56</span>票</div>
			</div>
			<div class="show-cell">
				<img src="img/example.jpg">
				<div class="vote-title">
					<span class="vote-num">001</span>女神候选人：<span>陈梦怡</span>
				</div>
				<div class="vote-btn vote-done">已投票</div>
				<div class="vote-count"><span>56</span>票</div>
			</div>
		</div>
		<div class="bt-show">
			<p>投票结果说明:</p>
			<ul>
				<li>1.第一名，可获得10000元奖金；</li>
				<li>2.前三名，可获得IPhone6 plus一部；</li>
				<li>3.前十名，可获得苹果iPad mini 4一台。</li>
			</ul>
		</div>
	</div>
</body>
</html>