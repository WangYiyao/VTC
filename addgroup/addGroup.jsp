<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta http-equiv="content-Type" content="text/html; charset=utf-8 "/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link rel="stylesheet" type="text/css" href="jquery.dataTables.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript">

		$.ajax({
			url:"ajx/m_queryAllGroup.do",
			type:"POST",
			data:data,
			async:false,
			success:function(data){
			
				}
			});


		var data = [{
			"groupName":"jsjjsjs",
			"author":"xiaoming"
		},
		{
			"groupName":"jsaj",
			"author":"xiaohong"
		},
		{
			"groupName":"1hao",
			"author":"11"
		},
		{
			"groupName":"2hao",
			"author":"22"
		}]



			$(function() {
				$("#groupTable").DataTable({
					bLengthChange:false,
					bProcessing:false,
					bAutoWidth:true,
					bScrollCollapse:true,
					bPaginate:true,
					bInfo:false,
					bSort:false,
					bDestory: true,
					bRetrieve: true,
					bFilter:false,

					processing:true,
					serverSide:true,
					ajax:"ajx/m_queryAllGroup.do",

					data: data,

					columns: [
					{data: 'groupName'},
					{data: 'author'},
					{data: ''},
					{data: ''}
					],
					aoColumnDefs:[ {
						"aTargets": [ 2 ],
						"mData": "download_link",
						"mRender": function ( data, type, full ) {
							return '<a href="##" onclick="showModal(this)">添加</a>';
						}
					} ,
					{
						"aTargets": [ 3 ],
						"mData": "download_link",
						"mRender": function ( data, type, full ) {
							return '<a href="##" onclick="checkNumber()">查看</a>';
						}
					}],
					// "sDom": "<'row-fluid'<'span6 myBtnBox'><'span6'f>r>t<'row-fluid'<'span6'i><'span6 'p>>"
					"sPaginationType":"full_numbers",
					"oLanguage":{"sZeroRecords":"表中无数据存在！",
					"sEmptyTable": "表中无数据存在！",
					"sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
					"sInfoEmpty": "显示0条记录",
					"oPaginate": {
						"sFirst": "首页",
						"sPrevious": "上一页",
						"sNext": "下一页",
						"sLast": "末页"}}, 
					});
			});

		function showModal(mod){
			var p = $(mod).parent().prev().prev().text();
			alert(p);
			$("#myModal").modal("show");
		}
		function showGroupModal(){
			$("#groupModal").modal("show");
		}

		function addNewUser(){
			$("#myModal").modal("hide");
			$("#registerModal").modal("show");
		}

		function addToLine(){

			//var t = $("#groupTable").DataTable()
			var a = $("#addGroupName").val();
			var b = $("#addAdmin").val();
			var newline = {groupName:a,
						author:b	
				}
	  
	  		$("#groupTable").dataTable().fnAddData(newline,true);  
			$("#groupModal").modal("hide");

		}

		function addUser(){
			alert("添加组成员")
			$("#myModal").modal(hide);
		}

		function register(){
			alert("新用户创建完成")
			var registerId = $("#registerId").val();
			var registerRole = $("#registerRole").val();
			$("#userId").val(registerId);
			$("#userRole").val(registerRole);
			$("#registerModal").modal("hide");
			$("#myModal").modal("show");
		}

		function checkNumber(){
			var content;
			$("#checkBody").html('');
			for(var i = 0; i < data.length; i++){
				var groupName = data[i].groupName;
				var author = data[i].author;

				content+="<tr><td class='col-xs-3'>"+groupName+"</td><td class='col-xs-3'>"+author+"</td></tr>"
			}
			$("#checkBody").append(content);
			//var content = "<p>nnnnnn</p>";
			//$("#checkBody").append(content);
			$("#checkModal").modal("show");
		}

	</script>
</head>
<body>
	<div>
		<button type="button" class="btn" id="addLine" onclick="showGroupModal()" style="color:#337ab7">添加群组</button>
	</div>
	<div class="">
		<table id="groupTable" class="display">
			<thead>
				<tr>
					<td>直播组名称</td>
					<td>管理员</td>
					<td>添加成员</td>
					<td>查看成员</td>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
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
									<option value="ordinaryUser">普通用户</option>t
									<option value="administrator">管理员</option>
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


	<!-- 新建成员框 -->
	<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width: 60%;">
				<div class="modal-header" style="background-color: #337ab7;color: #fff;">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">创建新用户</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="addUserForm" method="post">
						<div class="form-group">
							<label for="registerId" class="col-xs-2 control-label">UserId</label>
							<div class="col-xs-5">
								<input type="text" id="registerId" name="registerId" onblur="">
							</div>
						</div>
						<div class="form-group">
							<label for="registerRole" class="col-xs-2 control-label">身份</label>
							<div class="col-xs-5">
								<!-- <input type="text" id="userRole" name="userRole" > -->
								<select id="registerRole">
									<option value="ordinaryUser">普通用户</option>t
									<option value="administrator">管理员</option>
								</select>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="register()">确认创建</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 查看组成员 -->
	<div class="modal fade" id="checkModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="width:25%;">
			<div class="modal-content">
				<div class="modal-body">
					<table class="table table-striped">
						<thead>
							<tr><td class="col-xs-3">UserId</td><td class="col-xs-3">UserRole</td></tr>
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

</body>
</html>