<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>商家直播审批</title>
<link rel="stylesheet" href="css/bootstrap.min.css">
<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
</head>
<style>
.wrapper{
	height:auto;
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
</style>
<body>
<script>

location.href="qbao_exam.do";


	var pageNumber =1;
	var pageCount =1;
	var status=0;
	function getData(sta,pageNumber) {
		status = sta;
		console.log(status);
		$.ajax({
			type : 'post',
			url : 'ajx/qbao_getApplyList.do',
			dataType : 'json',
			data:"pageNumber="+pageNumber+"&pageSize=10&lab.status="+status,
			async : true,
			success : function(res) {
				var applyList = res.applyList;
				pageCount = res.pageCount;
				pageNumber = res.pageNumber;
				$("#currPage").html(pageNumber+"/"+pageCount);
				$("#applyList_body").html("");
				for(i in applyList){
					var apply = applyList[i];
					var trStr ="<tr><td>"+apply.username+"</td>"+
					"<td class='text-left'>"+apply.topic+"</td>"+
					"<td>"+apply.applyTime+"</td>"+
					"<td>"+apply.startTime+"</td>"+
					"<td>"+apply.endTime+"</td>"+
					"<td ><a onclick='viewDetail("+apply.tid+")' data-toggle='modal' data-target='#cdbModal'>查看详情</a></td>";
					if(apply.status==0){
						trStr += "<td><a onclick='audit(1,"+apply.tid+")'>通过</a></td><td><a onclick='audit(2,"+apply.tid+")'>驳回</a></td>"+
						"</tr>";
					}else{
						trStr += "<td><a onclick='delApply("+apply.tid+","+apply.status+")'>删除</a></td>"+
						"</tr>";
					}
					
					$("#applyList_body").append(trStr);
				}
				
			}
		})
	}
	getData(status,pageNumber);
	function prev(){
		if(pageNumber > 1){
			pageNumber = pageNumber -1;
			getData(status,pageNumber);
		}
	}
	function next(){
		if(pageNumber < pageCount){
			pageNumber = pageNumber +1;
			
			getData(status,pageNumber);
		}
		
	}
	function first(){
		pageNumber = 1;
			getData(status,pageNumber);
	}
	function last(){
		pageNumber = pageCount;
			getData(status,pageNumber);
	}
	
	function audit(status,tid){
		$.ajax({
			type : 'post',
			url : 'ajx/qbao_audit.do',
			dataType : 'json',
			data:"lab.tid="+tid+"&lab.status="+status,
			success : function(res) {
				var result = res.result;
				if(result=="success"){
					alert("审核成功！");
					getData(0,1);			
				}
			}
		})
	}
	function delApply(tid,status){
		$.ajax({
			type :'post',
			url : 'ajx/qbao_deleteApply.do',
			dataType : 'json',
			data:"lab.tid="+tid,
			success : function(res) {
				var result = res.result;
				if(result=="success"){
					alert("删除成功！");
					getData(status,1);			
				}
			}
		})
	}
	function viewDetail(tid){
		$.ajax({
			type : 'post',
			url : 'ajx/qbao_getCommodityListByApplyId.do',
			dataType : 'json',
			data:"lab.tid="+tid,
			async : true,
			success : function(res) {
				var cdbList = res.cdbList;
				$("#cdbList_body").html("");
				for(var i in cdbList){
					var cdb = cdbList[i];
					var trStr ="<tr><td>"+cdb.commodityCode+"</td>"+
					"<td class='text-left'>"+cdb.commodityName+"</td>"+
					"<td ><a onclick='viewCdbDetail("+JSON.stringify(cdb)+")' data-toggle='modal' data-target='#myModal' >查看详情</a></td>";
					$("#cdbList_body").append(trStr);
				}
			}
		})
	}
	function  viewCdbDetail(data){
		
		var cdb = data;
				$("#commodityCode").val(cdb.commodityCode);
				$("#commodityName").val(cdb.commodityName);
				$("#description").val(cdb.description);
				$("#link").val(cdb.link);
				$("#commodityImg").attr("src",cdb.imgPath);
	}
</script>
</body>
</html>