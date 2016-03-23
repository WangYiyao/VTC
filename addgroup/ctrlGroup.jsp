<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta http-equiv="content-Type" content="text/html; charset=utf-8 "/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>

	<style type="text/css">
		.table-bordered{
			font-size: 1.2em;
			width: 70%;
			margin:2% auto;
		}
		.table-bordered td{
			box-sizing: border-box;
			text-align: center;
			height: 20px;
			padding: 20px auto;
			cellpadding:5px;
			line-height:3em;
		}
		#addLine{
		    display:block;
		    margin-left:15%;
			color:#337ab7;
			font-size: 1.2em;
			font-weight: 500;
			border:1px solid #ddd;
			border-radius:3px;
			background-color:#fff;
			padding:10px 10px 10px 40px;
			position: relative;
		} 
		#addLine:after{
			content: "";
			width: 10px;
			height: 10px;
			background-color: #79c12f;
			border-left: 10px solid #79c12f;
			border-right: 10px solid #79c12f;
			border-top: 5px solid transparent;
			border-bottom: 5px solid transparent;
			position: absolute;
			left: 10px;
			top:17px;
		}
		#addLine:before{
			content: "";
			width: 10px;
			height: 10px;
			background-color: #79c12f;
			border-bottom: 10px solid #79c12f;
			border-top: 10px solid #79c12f;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			position: absolute;
			left: 15px;
			top:12px;
		}
		.footPage{
			position: absolute;
			right: 15%;
		}
		.page-title{
			font-size:2.5em;
			font-weight:bolder;
			text-align: center;
            padding:2%;
            border-bottom:1px solid #ddd;
		}
		
	</style>
</head>
<body>
<h1 class="page-title">VTC云直播摄像头管理</h1>
	<div>
		<button type="button" id="addLine" onclick="showGroupModal()">添加群组</button>
	</div>
	<div class="">
		<table id="groupTable" class="table-bordered" style="margin-top:10px;">
			<thead style="font-weight: 500;font-size: 1.3em">
				<tr>
					<td>直播组ID</td>
					<td>直播组名称</td>
					<td>管理员</td>
					<td>添加成员</td>
					<td>查看成员</td>
					<td>删除群组</td>
				</tr>
			</thead>
			<tbody id="groupBody">
			</tbody>
		</table>
		<div class="footPage">
			<button class="prevPage" onclick="first()" style="float: right;">首页</button>
			<button class="prevPage" onclick="prev()" style="float: right;">&lt上一页</button>
			<input readonly="true" id="currentNumber" style="width: 10%;float: right;"></input>
			<button class="nextPage" onclick="next()" style="float: right;">下一页&gt</button>
			<button class="nextPage" onclick="last()" style="float: right;">末页</button>
		</div>
	</div>

	<!-- 添加群组框 -->
	<div class="modal fade" id="groupModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">添加群组</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="addUserForm" method="post">
						<div class="form-group">
							<label for="addGroupName" class="col-xs-3 control-label">直播组名称</label>
							<div class="col-xs-8">
								<input type="text" id="addGroupName" name="addGroupName" onblur="">
							</div>
						</div>
						<div class="form-group">
							<label for="addAdmin" class="col-xs-3 control-label">管理员</label>
							<div class="col-xs-8">
								<input type="text" id="addAdmin" name="addAdmin" >
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="addToLine()">确认添加</button>
				</div>
			</div>
		</div>
	</div>


	<!-- 添加成员框 -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">添加组成员</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="addUserForm" method="post">
						<div class="form-group">
							<label for="userId" class="col-xs-3 control-label">UserId</label>
							<div class="col-xs-8">
								<input type="text" id="userId" name="userId" onblur="">
								<button type="button" class="btn-default" onclick="addNewUser()">新建</button>
							</div>
						</div>
						<div class="form-group">
							<label for="userRole" class="col-xs-3 control-label">身份</label>
							<div class="col-xs-8">
								<!-- <input type="text" id="userRole" name="userRole" > -->
								<select id="userRole">
									<option value="user">普通用户</option>t
									<option value="admin">管理员</option>
								</select>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="addUser()">确认添加</button>
				</div>
			</div>
		</div>
	</div>



	<!-- 查看组成员 -->
	<div class="modal fade" id="checkModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="width:45%;">
			<div class="modal-content">
				<div class="modal-body">
					<table class="table table-striped" style="margin-bottom: 0;">
						<thead style="font-size: 16px;color: #337ab7;">
							<tr><td class="col-xs-1">用户Id</td><td class="col-xs-1">角色</td><td class="col-xs-3">摄像头控制码</td><td class="col-xs-1">状态</td></tr>
						</thead>
						<tbody id="checkBody">
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>

				</div>
			</div>
		</div>
	</div>


	<!-- 删除组成员 -->
	<div class="modal fade" id="rem" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="width:15%;">
			<div class="modal-content">
				<div class="modal-body">
					<p style="text-align: center;font-size: 1.2em;font-weight: 500;">确定删除？</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="removeGroup()">确定</button>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">

		var pageNumber =1;
		var pageCount =1;

	function getData(pageNumber){
		$.ajax({
			url:"ajx/m_queryAllGroups.do",
			type:"POST",
			data:"pageNumber="+pageNumber+"&pageSize=10",
			async:true,
			success:function(data){
				console.log(data);
				var groupList = data.groupList;
				pageNumber = data.pageNumber;
				pageCount = data.pageCount;
				$("#groupBody").html("");
				var content = "";
				for( i in groupList){
					var group = groupList[i];
					content += "<tr><td>"+groupList[i].tid+"</td><td>"+groupList[i].groupName+"</td><td>"+groupList[i].author+"</td><td><a href='##' onclick='showModal("+JSON.stringify(group)+")'>添加</a></td><td><a href='##' onclick='checkNumber("+JSON.stringify(group)+")'>查看</a></td><td><a href='##' onclick='showRem("+JSON.stringify(group)+")'>删除</a></td></tr>";
				}
				$("#groupBody").append(content);
				$("#currentNumber").val(pageNumber);

			}
		});
	}
	getData(pageNumber);
	function prev(){
		if(pageNumber > 1){
			pageNumber = pageNumber -1;
			getData(pageNumber);
		}
	}
	function next(){
		if(pageNumber < pageCount){
			pageNumber = pageNumber +1;
			
			getData(pageNumber);
		}
		
	}
	function first(){
		pageNumber = 1;
		getData(pageNumber);
	}
	function last(){
		pageNumber = pageCount;
		getData(pageNumber);
	}

	function showModal(group){
		//console.log(group);
		$("#myModal #userId").val("");
		$("#myModal .modal-header .tid").remove();
		var groupID = group.tid;
		content = "<p class = 'tid' style='visibility:hidden;'>"+groupID+"</p>"
		$("#myModal .modal-header").append(content);
		$("#myModal").modal("show");
	}

	function showRem(group){
		//console.log(group);
		$("#rem .modal-body .tid").remove();
		var groupID = group.tid;
		content = "<p class = 'tid' style='visibility:hidden;'>"+groupID+"</p>"
		$("#rem .modal-body").append(content);
		$("#rem").modal("show");
	}

	function showGroupModal(){
		$("#addGroupName").val("");
		$("#addAdmin").val("");		
		$("#groupModal").modal("show");
	}

	function addNewUser(){
		$.ajax({
			url:'ajx/m_createAnonymous.do',
			type:'post',
			dataType:'json',
			async:true,
			success:function(res){
					//alert(res);
					console.log(res);
					$("#userId").val(res.result);
				}
			});
		getData(pageNumber);
	}

	function addToLine(){
		var a = $("#addGroupName").val();
		var b = $("#addAdmin").val(); 
		var content = "";
		$("#groupModal").modal("hide");
		$.ajax({
			url:'ajx/m_createLiveGroup.do',
			type:'post',
			dataType:'json',
			data:"lgb.author="+b+"&lgb.groupName="+a,
			async:true,
			success:function(res){
				getData(pageNumber);
			}
		});
		$("#groupModal").modal("hide");

	}
	function randomString(len) {
		len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	}
	function addUser(){
		var a = $("#myModal .modal-header .tid").text();
		var b = $("#myModal #userId").val();
		var c = $("#myModal #userRole").val();
		var randomStr = randomString(32);
		$.ajax({
			url:'ajx/m_add2LiveGroup.do',
			type:'post',
			dataType:'json',
			data:"lgmb.groupId="+a+"&lgmb.userId="+b+"&lgmb.role="+c+"&randomStr="+randomStr,
			async:true,
			success:function(res){
				console.log(res);
			}
		});
		$("#myModal").modal("hide");
			//alert("添加组成员成功！");
		}

	function removeGroup(){
		var a = $("#rem .modal-body .tid").text();
		//var b = $("#myModal #userId").val();
		//var c = $("#myModal #userRole").val();
		$.ajax({
			url:'ajx/m_delLiveGroup.do',
			type:'post',
			dataType:'json',
			data:"groupId="+a,
			async:true,
			success:function(res){
				console.log(res);
				//res.result
			}
		});
		$("#rem").modal("hide");
		getData(pageNumber);
	}

		function checkNumber(group){
			var content;
			$("#checkBody").html('');
			var gid = group.tid;
			//console.log(gid);
			$.ajax({
				url:'ajx/m_queryGroupMembers.do',
				type:'post',
				dataType:'json',
				data:"groupId="+gid,
				async:true,
				success:function(res){
					var memberList = res.memberList;
					for(var i = 0; i < memberList.length; i++){
						if(memberList[i].topicAuthor)
							var flag = "已启用";
						else
							flag = "未启用";
						content+="<tr><td class='col-xs-1'>"+memberList[i].userId+"</td><td class='col-xs-1'>"+memberList[i].role+"</td><td class='col-xs-3'>"+memberList[i].randomStr+"</td><td class='col-xs-1'>"+flag+"</td></tr>"
					}
					$("#checkBody").append(content);
				}
			});
			$("#checkModal").modal("show");
		}

		

	</script>

</body>
</html>