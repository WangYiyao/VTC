<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>VTC云直播订单管理</title>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet"  type="text/css" href="css/bootstrap-datetimepicker.min.css">
<link rel="stylesheet"  type="text/css" href="style/m_admin.css">
<script src="js/jquery-1.6.2.min.js?version=9" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="js/bootstrap-datetimepicker.zh-CN.js"></script>

<script type="text/javascript" src="js/jquery.dataTables.js"></script>
</head>
<style>
.bd-body{
	background-color: #fff;
	margin:1% 10px;
}
.wrapper{
	/*height:auto;*/
	padding: 0 15px;

}
.wrapper li{
	float:left !important;
}
a{
	cursor:pointer;
}
a:hover{
	text-decoration:none !important;


}
.hd-order{
	padding-top: 1%;
	margin-bottom:15px;
	overflow:hidden;
}
.time-box{
}
.col-xs-2{
	padding-left:0;
}
.form-control{
	border-radius:3px;
}
.cnt-order{
	margin-top:10px;
}
.btn{
	border-radius:3px;
}
.title{
	text-align:center;
}
.bootstrap-datetimepicker-widget>ul{
 	padding-left:0; 
}
.ft-order{
	text-align:center;
}
.pagination li{
	float: right;
}
.now{
	float:left;
	margin-right:15px;

}
.cnt-order{
	margin-top:15px;
}
.hd-order span{
	font-size:20px;
	font-weigth:bold;
	margin-right:15px;
	display:inline-block;
	
}
.band{
	color:#ff6633;
}
.glyphicon-warning-sign{
	color:#ff6633;s
	margin-left:10px;
}
.ft-order{
	float: right;
	margin-right: 10px;
}
.nextPage, .prevPage{
	margin:0 5px;
}
#currPage{
	border-radius: 3px;
	text-align: center;
}
</style>


<body>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand  logo " href="#">VTC后台管理系统</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li ><a href="m_ctrlGroup.jsp">直播组管理<span class="sr-only">(current)</span></a></li>
        <li><a href="m_adminBand.jsp">带宽控制</a></li>
        <li class="active"><a href="m_adminOrder.jsp">订单管理</a></li>
        <li><a href="#">4G卡管理</a></li>
        
      </ul>
     
      
    </div>
  </div>
</nav>

<div class="bd-body">
	<div class="wrapper">
		<div class="hd-order">
			
			<button id="btn_query" class="btn btn-info pull-right">查询</button>
			<div id="endTime" class="input-append date col-xs-2 time-box pull-right">
	    		<input class="form-control add-on" data-format="yyyy-MM-dd hh:ii:ss" type="text" placeholder="结束时间" required></input>
	  		</div>
	  		<div id="starTime" class="input-append date col-xs-2 time-box pull-right">
	   			<input class="form-control  add-on"  style="display:inline-block !important;" data-format="yyyy-MM-dd hh:mm:ss" type="text" placeholder="开始时间" required></input>
	 		</div>
			<button id="get_now" class="btn btn-info  now pull-right">NOW</button>
	  	
		</div>
		<div class="cnt-order">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>groupId</th>
						<th>开始时间</th>
						<th>结束时间</th>
						<th>观看人数</th>
						<th>码率(Kbps)</th>
						<th>订单号</th>
						<th>交易金额(元)</th>
						<th>存储空间(G)</th>
						<th>存储有效期</th>
						<th>userId</th>
						<th>交易时间</th>
					</tr>
				</thead>
				<tbody class="orderList">
				</tbody>
			</table>
		</div>
	</div>
	<div class="ft-order center">
		<ul class="pagination">
		<li style="float: right;"><a href="#" onclick="last()">末页</a></li>
			  	<li style="float: right;"><a href="#" onclick="next()">下一页</a></li>
			  	<li style="float: right; width: 10%;"><a href="#" id="currPage"></a></li>
			  	<li style="float: right;"><a href="#" onclick="prev()">上一页</a></li>
			  	<li style="float: right;"><a href="#" onclick="first()">首页</a></li>
		</ul>
	</div>

	</div>
</body>
<script>



var pageNumber=1;
var pageCount;
var status=1;
var pageSize=10;
var s=null;
var e=null;
var band=[];
var upperLimit=100*0.7;

/**var dd = new Date(); 
var d=dd.getDate();
var y = dd.getFullYear(); 
var m = dd.getMonth()+1;
var today=y+'/'+m+'/'+d+' 00:00:00';
console.log('today初始值：'+today);
today=Date.parse(today);
var next=today+24*60*60*1000;
console.log('today--'+today);
console.log('next--'+next);**/



$(function(){
  queryOrder(s,e,1,1, pageSize);
  init();
});

function init(){
			var total = document.body.clientHeight;
			console.log(total);
			var offset = document.getElementsByClassName("bd-body")[0].offsetTop;
			console.log(offset);
			var colHeight = total-offset*1.2;
			document.getElementsByClassName("bd-body")[0].style.height=colHeight+"px";
}


 $(function() {
    $('#starTime input').datetimepicker({
      language: 'zh-CN',
      format: 'yyyy-mm-dd hh:ii'
    }); 
    $('#endTime input').datetimepicker({
	      language: 'zh-CN'
	 });
		
		
$('#btn_query').click(function(){
		pageNumber=1;
		s=$('#starTime input').val();
		e=$('#endTime input').val();
		s=s+':00';
		e=e+':00';
		console.log('s---'+s);
		console.log('e---'+e);
		queryOrder(s,e,1,pageNumber, pageSize);
	});
  });
  
  $('#get_now').click(function(){
  		$('#starTime input').val(getNow(0));
  	
  });

function queryOrder(startTime,endTime,status,pageNumber,pageSize){
	
	$.ajax({
		type:'get',
		url:'ajx/m_queryAllOrder.do',
		dataType : 'json',
		data:"lgob.startTime="+startTime+"&lgob.endTime="+endTime+"&lgob.status="+status+"&pageNumber="+pageNumber+"&pageSize="+pageSize,
		success : function(res){
			console.log(res);
			var orderList=res.orderList;
			orderList.sort(function(a,b){return b.startTime-a.startTime});
			
			$('.orderList').html('');
			pageCount = res.pageCount;
			pageNumber = res.pageNumber;
			if(orderList.length==0){
				pageNumber=0;
			}
			$("#currPage").html(pageNumber+"/"+pageCount);
			for(var i=0;i<orderList.length;i++){
				orderItem=orderList[i];
				var disk=orderItem.disk;
				var diskExpDate=orderItem.diskExpDate;
				var endTime=orderItem.endTime;
				var fee=orderItem.fee;
				var groupId=orderItem.groupId;
				var liveCnt=orderItem.liveCnt;
				var rate=orderItem.rate;
				var startTime=orderItem.startTime;
				var tid=orderItem.tid;
				var tradeNo=orderItem.tradeNo;
				var tradeTime=orderItem.tradeTime;
				var userId=orderItem.userId;
				if(tradeTime!=null){
					tradeTime = tradeTime.replace(/T/g, " ");
				}
				if(startTime!=null){
					startTime = startTime.replace(/T/g, " ");
				}else{
					startTime='空';
					
				}
				if(endTime!=null){
					endTime = endTime .replace(/T/g, " ");
				}else{
					endTime='空';
				}
				
				
				if(diskExpDate!=null){
					diskExpDate =diskExpDate.replace(/T/g, " ");
				}else{
					diskExpDate='空';
				}
				
				var strItem='<tr>'+
				'<td>'+groupId+'</td>'+
				'<td>'+startTime+'</td>'+
				'<td>'+endTime+'</td>'+
				'<td>'+liveCnt+'</td>'+
				'<td>'+rate+'</td>'+
				'<td>'+tradeNo+'</td>'+
				'<td>'+fee+'</td>'+
				'<td>'+disk+'</td>'+
				'<td>'+diskExpDate+'</td>'+
				'<td>'+userId+'</td>'+
				'<td>'+tradeTime+'</td>'+
				'</tr>';
				$('.orderList').append(strItem);
			
			}
		}
	
	});

}
function prev(){
		if(pageNumber > 1){
			pageNumber = pageNumber -1;
			queryOrder(s,e,1,pageNumber, pageSize);
		}
	}
function next(){
		if(pageNumber < pageCount){
			pageNumber = pageNumber +1;
			queryOrder(s,e,1,pageNumber, pageSize);
		}
		
	}
	function first(){
			pageNumber = 1;
			queryOrder(s,e,1,pageNumber, pageSize);
	}
	function last(){
		pageNumber = pageCount;
			queryOrder(s,e,1,pageNumber, pageSize);
	}
	
	
	
	function getNow(n){
   			var today=new Date();
   			var y=parseInt(today.getFullYear());
    		var m=parseInt(today.getMonth())+1;
    		var d=parseInt(today.getDate());
    		var h=parseInt(today.getHours());
    		var mi=parseInt(today.getMinutes());
    		m=m<10?'0'+m:m;
    		d=d<10?'0'+d:d;
    		h=h<10?'0'+h:h;
    		mi=mi<10?'0'+mi:mi;
    		
    		if(n==0){
    			
    			console.log("y--"+y);
    			console.log("m--"+m);
    			console.log("d--"+d);
    			console.log("h--"+h);
    			console.log("mi--"+mi);
    			return y+"-"+m+"-"+d+" "+h+":"+mi;
    		}
    		else{
    			h=parseInt(h)+1;
    			return y+"-"+m+"-"+d+" "+h+":"+mi;
    		}
    	}

</script>
</html>