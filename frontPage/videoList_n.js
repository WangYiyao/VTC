//全局变量

//全局变量标识当前是显示的哪个视频列表(TAB) 
// - 直播视频列表Tab - 1
// - 历史视频列表Tab - 2

var intervalID;

var global={};

//鼠标点击tab时的切换函数
var last_click=null;
var pageNumber=1;
var current_class="所有";
var flag;
function getVideoList(type)
{
	var data="pageNumber="+pageNumber+"&pageSize=20&current_tag="+type;
	if(type==5)
		data+="&searchStr="+$("#searchStr")[0].value;

	if(currentDisplayList==2 && current_class!="所有"){
		data+="&current_class="+current_class;
	}
		
	var url="./ajx/listVideo.do";
	$.ajax({
		 "url":url,
		 "type":"POST",
		 "data":data,
		 "success":function(data)
		 {	
			 displayVideoList(data);
			}
		});
}
//此函数用于删除视频
function deleteVideo(url) {
	if(confirm("您确认删除吗？")) {
		$.ajax({
		     url: url,
		     type: "post",
		     success:function(data) {
		    	 var st = "res=" + data;
		    	 eval(st);
		    	 if(res.result == "ok") {
		    		 hover();
		    	 } 
		     }
	   });
    }	

}

function deleteVideo_n(videoId) {
	if(confirm("你确定要删除吗？")){
		var url="./deleteVideo.do";
		var data="video.videoId="+videoId;
		$.ajax({
			url:url,
			data:data,
			type:"post",
			success:function(data){
				var st="res="+data;
				eval(st);
				if(res.result=="ok"){
					 hover();
				}
				
			}
		    
		});
		
	}
}
function generatePageList(pageNumber,pageCount,func_name)
{
	function gen_one(pageNumber,content)
	{
		content=content||pageNumber;		
		return "<li><a href='#' onclick='javascript:pageNumber=" + pageNumber + ";"+func_name+";return false;'>"+content+"</a></li>&nbsp";
	}
	var content="";
	if (pageNumber > 1) {
		content += gen_one((pageNumber - 1),"上一页");
	}
		if (pageCount <= 10) {
			for ( var i = 1; i <= pageCount; i++) {	
				if (pageNumber == i) {
					content += "<li><a style='border:1px solid #a6a3a3;background:#b2b2b2;color:#fff;' href='#' onclick='javascript:pageNumber=" + i
					+ ";"+func_name+";return false;'><b>" + i + "</b>";
				} else {
					content += "<li><a href='#' onclick='javascript:pageNumber=" + i
						+ ";"+func_name+";return false;'>" + i;
				}
				content += "</a></li>&nbsp";
			}
		} else {
			if (pageNumber <= 4) {
				for ( var i = 1; i < pageNumber; i++) {
					content += "<li><a href='#' onclick='javascript:pageNumber=" + i
							+ ";"+func_name+";return false;'>" + i + "</a></li>&nbsp";
				}
				content += "<li><a style='border:1px solid #a6a3a3;background:#b2b2b2;color:#fff;' href='#' onclick='javascript:pageNumber=" + pageNumber
						+ ";"+func_name+";return false;'><b>" + pageNumber + "</b></a></li>&nbsp";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber + 1)
						+ ";"+func_name+";return false;'>" + (pageNumber + 1) + "</a></li>&nbsp";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber + 2)
						+ ";"+func_name+";return false;'>" + (pageNumber + 2) + "</a></li>&nbsp";
				content += "<li>...</li>";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + pageCount
						+ ";"+func_name+";return false;'>" + pageCount + "</a></li>&nbsp";

			}
			if (pageNumber > 4 && (pageNumber <= pageCount - 3)) {
				content += "<li><a href='#' onclick='javascript:pageNumber=" + 1
						+ ";"+func_name+";return false;'>1</a></li>&nbsp";
				content += "<li>...</li>";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber - 2)
						+ ";"+func_name+";return false;'>" + (pageNumber - 2) + "</a></li>&nbsp";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber - 1)
						+ ";"+func_name+";return false;'>" + (pageNumber - 1) + "</a></li>&nbsp";
				content += "<li><a style='border:1px solid #a6a3a3;background:#b2b2b2;color:#fff;' href='#' onclick='javascript:pageNumber=" + pageNumber
						+ ";"+func_name+";return false;'><b>" + pageNumber + "</b></a></li>&nbsp";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber + 1)
						+ ";"+func_name+";return false;'>" + (pageNumber + 1) + "</a></li>&nbsp";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber + 2)
						+ ";"+func_name+";return false;'>" + (pageNumber + 2) + "</a></li>&nbsp";
				content += "<li>...</li>";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + pageCount
						+ ";"+func_name+";return false;'>" + pageCount + "</a></li>&nbsp";
			}
			if (pageNumber > pageCount - 3) {
				content += "<li><a href='#' onclick='javascript:pageNumber=" + 1
						+ ";"+func_name+";return false;'>1</a></li>&nbsp";
				content += "<li>...</li>";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber - 2)
						+ ";"+func_name+";return false;'>" + (pageNumber - 2) + "</a></li>&nbsp";
				content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber - 1)
						+ ";"+func_name+";'>" + (pageNumber - 1) + "</a></li>&nbsp";
				content += "<li><a style='border:1px solid #a6a3a3;background:#b2b2b2;color:#fff;' href='#' onclick='javascript:pageNumber=" + pageNumber
						+ ";"+func_name+";return false;'><b>" + pageNumber + "</b></a></li>&nbsp";
				for ( var i = pageNumber + 1; i <= pageCount; i++) {
					content += "<li><a href='#' onclick='javascript:pageNumber=" + i
							+ ";"+func_name+";return false;'>" + i + "</a></li>&nbsp";
				}
			}
		}
		if (pageNumber < pageCount) {
			content += "<li><a href='#' onclick='javascript:pageNumber=" + (pageNumber + 1)
					+ ";"+func_name+";return false;'>下一页</a></li>";
		}
	return content;	
}

//页面加载的时候调用，生成正确比例的缩略图
function set_image_size(img)
{
	var img_width = img.width;
	var img_height = img.height;
	ratio = img_width/img_height;
	standard = 170/128;
	if(ratio > standard){//图片宽大于高
		img_width = 170;
		img_height = Math.round(170/ratio);
	}else{
		img_height = 128;
		img_width = Math.round(128*ratio);
	}
	var temp=$(img);
	temp.attr("width",img_width+"px");
	temp.attr("height",img_height+"px");
}
function windowOpen(url,target){
    var a = document.createElement("a");
    a.setAttribute("href", url);
    if(target == null){
        target = '';
    }
    a.setAttribute("target", target);
    document.body.appendChild(a);
    if(a.click){
        a.click();
    }else{
        try{
            var evt = document.createEvent('Event');
            a.initEvent('click', true, true);
            a.dispatchEvent(evt);
        }catch(e){
            window.open(url);
        }
    }
    document.body.removeChild(a);
}
function prep_download(icon_control, video_id){
	var url="downloadVideo.do";
	var data="video.videoId="+video_id;
	$.ajax({
		url:url,
		data:data,
		type:"post",
		success:function(data){
			if(data==""){
				alert("失败，请重试，如果不行请联系技术人员。");
			}else{
				
//				var dialog = new Dialog_e();
//				dialog.Width = 240;
//				dialog.Height = 40;
//				dialog.InnerHtml="&nbsp;<br>鼠标右键点击<a href=\"" + data + "\" target=\"_blank\">链接</a>,选择另存为下载。";
//				dialog.Title = "下载";
//				dialog.SM="关闭";
//				var position = $(icon_control).offset();
//				dialog.Left= position.left - 120;
//				dialog.Top = (position.top + 20);
//				dialog.OKEvent = function(){
//					dialog.close();
//				};
//				//dialog.CancelEvent=function(){dialog.close();};
//				dialog.show();
				var url = data;
				var videoName = video_id;
				windowOpen("fileDownload.do?url="+url+"&videoName="+videoName,'_blank');
			}
		},
		timeout:function(){
			alert("失败，请重试，如果不行请联系技术人员。");
		}
	});
}

//以前的分享功能 目前没有用该函数
function prep_share_icon(icon_control,video_index)
{
	function common_init(video){
		var parameter={};
    	parameter.url="http://"+location.host+"/LiveVideoServer/play.do?video.videoId="+video.videoId;
    	parameter.pic="http://"+location.host;
    	if(video.image.indexOf("/LiveVideoServer")!=0)
    		parameter.pic+="/liveVideoServer/";
    	parameter.pic+=video.image;
    	parameter.title=video.title+"-微特喜-手机视频直播";
    	return parameter;
	}
	if(typeof(prep_share_icon_div)=="undefined"){
		prep_share_icon_div=$("<div>");
		var icon=[{name:"sina",url:'http://service.weibo.com/share/share.php?searchPic=false&appkey=2386326227&'},
		          {name:"renren",url:'http://widget.renren.com/dialog/share?',
			init:function(parameter){
			parameter.srcUrl=parameter.url;
		}}
		//,{name:"qq",url:'http://share.v.t.qq.com/index.php?c=share&a=index&appkey=e7ad0b0199994bda85ecc0a44c9915f&',
		//	init:function(p,v){p.line1=v.title;}}
		];
		for(var index=0;index<icon.length;index++)
		{
			var span=$("<a target='_blank' href='#'>");
			span.addClass("forward_icon");
			//span.append("&nbsp;&nbsp;&nbsp;&nbsp;");
			span.addClass(icon[index].name+"_icon");
			span.bind("click",(function(){var me=span; me.target=icon[index];return function(){
				var parameter=common_init(global.video[prep_share_icon_div.video_index]);
				me.target.init&&me.target.init(parameter,global.video[prep_share_icon_div.video_index]);
		        var parameter_url = [];
		    	  for( var p in parameter ){
		    		  parameter_url.push(p + '=' + encodeURIComponent( parameter[p] || '' ) )
		    	}
		    	me.attr("href",me.target.url+parameter_url.join('&'));
		    }})());
			prep_share_icon_div.append(span);
		}
		prep_share_icon_div.addClass("prep_share_icon_div_css");
		$(document.body).append(prep_share_icon_div);
	}
	function hideme(){
		prep_share_icon_div.hide();
		$(document).unbind("mouseup",hideme);
	}
	prep_share_icon_div.video_index=video_index;
	$(document).bind("mouseup",hideme);
	var pos=$(icon_control).offset();
	/*prep_share_icon_div.css("top",pos.top-prep_share_icon_div.outerHeight()-4);*/
	prep_share_icon_div.css("top",pos.top);
	/*prep_share_icon_div.css("left",pos.left-(prep_share_icon_div.outerWidth()-$(icon_control).width())/2);*/
	prep_share_icon_div.css("left",pos.left+$(icon_control).width());
	prep_share_icon_div.show();
	return prep_share_icon_div;
}

//用于鼠标滑过图片展开的时候显示正确的比例
function set_image_size_ex(img){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/msie ([\d.]+)/) == null || ua.match(/msie ([\d.]+)/)[1] != 6.0){
		var width;
		var height;
		width = img.width;
		height = img.height;
		scale = width/height;
		if(width<300){
			width = img.width;
			height = Math.round(width/scale);
		}else{
			width = 300;
			height = Math.round(300/scale);
		}
		$(img).attr("width",width+"px");
		$(img).attr("height",height+"px");
	}
}

function displayVideoList(data)
{ 
	console.log(data)
	var res;
	if(typeof(data)=="string")
		res=parseJSON(data);
	else
		res=data;
	global.video=res.videos;
	currentDisplayList=parseInt(res.current_tag);
	if(currentDisplayList==2 || currentDisplayList==6) {
		if(currentDisplayList==2){
			get_tab_list().select("视频大厅");
		}else{
			get_tab_list().select("图片大厅");
		}
		get_class_list().select(res.current_class||"所有");
		
	}
	if(currentDisplayList==1){
		get_tab_list().select("直播大厅");
		//clear_refresh_timer();
		intervalID =window.setTimeout(function(){
            getVideoList(currentDisplayList);
          //  intervalID = setTimeout(arguments.callee,5000);
        },5000);
	}
	if(currentDisplayList==3)
		get_tab_list().select("我的视频");
	var content_div=$("#content");
	if(res.current_tag==2  || currentDisplayList==6)
	{
		show_nav_two("class_list");
	}
	else
	{
		$("#nav_two").hide();
	}
	if(res.videos.length==0){
		content_div.empty();
		if(res.current_tag==1){
			content_div.append("<div class='now-player-main'><div class='now-player-nr'><p>点击我要直播将你的快乐分享给你的朋友，亲人</p>" +
					"<input type='button' value='我要直播' class='now-zb' onclick='check_vtc_forLive();'></div></div>");
		}else if(res.current_tag==3){
			 content_div.append("<p><center><span class='tipsFontForProfile'>您还没有上传视频，赶快点击<a href='./apk/vtc365.apk'>下载手机客户端</a>，上传属于你的视频，分享属于你的精彩！</span></center>");
		}
		return;
	}
	var table=$("<table style='width:960px;margin:10px auto;border-spacing:0px;'>");
	var tbody=$("<tbody>");
	table.append(tbody);
	var content=" ";
	for(var index=0;index<4;index++)//四行
	{
		var tr=$("<tr style='width:960px;'>");
		tbody.append(tr);
		for(var i=0;i<5;i++)//每行五个
		{
			var td=$("<td class='preview_td'>");
			var video_index=index*5+i;
			var video=res.videos[video_index];
		/*	var a=new smallIcon(video);		
			if(video.liveFlag==4)
				a.setDrawer(new ImageDrawer());
			td.append(a.getElement());
			tr.append(td);
			continue;*/
			

			var videoSysTime = res.sysTime;
			if(video){
				if(video.title == null|| video.title == "") {			
					video.title = "无标题";
				}
				var videoShortTitle = cutString(video.title, 22);
				var videoTime = "";
				var	videoBeginTime = new Date(video.uploadTime).getTime();
				var	videoDuration = Math.round((videoSysTime - videoBeginTime)/1000);//秒
				var hours = Math.round(videoDuration/3600);//小时
				var minutes = Math.round(videoDuration/60);//分钟
				var videoLength = (video.tsCount * video.tsLength);
				if(video.duration)
					videoLength=video.duration;
				var videoLenStr = "";
				if(video.liveFlag == 1) {			
			    	if (videoDuration < 60) {
			    		videoTime = "" + videoDuration + "" + "秒" + "前";
			    	} else if (videoDuration >= 60 && videoDuration < 7200 ) {
			            videoTime = "" + minutes + "" + "分钟" + "前";
			    	} else if (videoDuration >= 7200) {
			    		videoTime = "" + hours + "" + "小时" + "前";
			    	}
			    	videoLenStr = "正在直播";
				}else {
					videoTime = video.webDispTime;
			    	var minute = 0;
			    	var second = 0;
			    	if(videoLength >= 60) {
			    		minute = Math.floor(videoLength / 60);
			    		second = Math.floor(videoLength % 60);
			    		if(minute >= 10) {
			    			videoLenStr = "" + minute; 
			    		} else {
			    			videoLenStr = "0" + minute;
			    		}
			    		if(second >=10 ) {
			    			videoLenStr += ":" + second;
			    		} else {
			    			videoLenStr += ":0" + second;
			    		}
			    	} else {
			    		second = videoLength;
			    		if(second >=10 ) {
			    			videoLenStr += "00:" + second;
			    		} else {
			    			videoLenStr += "00:0" + second;
			    		}
			    	}
				}
				/*var a=$("<a>");
				a.attr("href","servlet/PlayVideoAction?VID="+video.videoId);
				a.attr("target","_blank");
				var image=$("<img>");
				image.width(180);
				image.height(140);
				image.attr("src",video.image);
				a.append(image);*/
				if(video.liveFlag==1){
					content="<div  class='preview_div' style='height:auto;'>";
				}else{
					content="<div  class='preview_div'>";
				}
				if(video.liveFlag==4){
					content+="<center id='preview_"+video.videoId+"' style='height:139px;'>";
				}else{
					content+="<center id='preview_"+video.videoId+"'>";
				}
				
				if(video.liveFlag!=4){
					if(video.liveFlag==1){
						content+="<a href='#' onclick='play_2({videoId},{shareModel},\"{author}\",\"{current_viewerid}\",\"{current_viewer_role}\");return false;'>" +
						  "<div style='z-index:2;position:absolute;margin:0px;width:184px;height:150px;'>" +
					      "<img class='fixPng' src='./img/playbutton.png' style='z-index:2;margin-top:50px;'></div>" +
					      "<div style='width:184px;height:150px;'><span style='display:inline-block;height:100%;vertical-align:middle;'></span>" +
						  "<img border='0' src='{image}' onerror='defaultImage(this);'" +
						  " style='z-index:1;position:relative;max-width:170px;max-height:139px;display:inline-block;vertical-align:middle;'>" +
					      "<span style='position:absolute;z-index:2;margin-top:9%;margin-left:-9%;color:red;'>正在直播中...</span></div></a>";
					}else{
						content+="<a href='#' onclick='play_2({videoId},{shareModel},\"{author}\",\"{current_viewerid}\",\"{current_viewer_role}\");return false;'>" +
						  "<div style='z-index:2;position:absolute;margin:0px;width:184px;height:150px;'>" +
					      "<img class='fixPng' src='./img/playbutton.png' style='z-index:2;margin-top:50px;'></div>" +
					      "<div style='width:184px;height:150px;'><span style='display:inline-block;height:100%;vertical-align:middle;'></span>" +
						  "<img border='0' src='{image}' onerror='defaultImage(this);'" +
						  " style='z-index:1;position:relative;padding:7px 7px 10px 7px;max-width:170px;max-height:139px;display:inline-block;vertical-align:middle;'></div></a>";
					}
				}else {
					//图片的播放
					/*content+="<a href='"+video.URL+"' class='highslide' onclick='return hs.expand(this);' onDblClick='playPicture({videoId},\""+video.URL+"\");return false;'>"+
					         "<img width='188' height='154' border='0' src='"+video.URL+"' style='z-index:1;position:relative;margin:1px'></a>";*/
					content+="<a href='#' title='点击进入观看' onmouseout='expand_close("+video.videoId+");' onmouseover='expand("+video.videoId+");' onClick='playPicture({videoId},\""+video.URL+"\");return false;'>"+
			         "<img id='expandImg_"+video.videoId+"' onload='set_image_size_ex(this,"+video.videoId+");' src='"+video.URL+"' style='z-index:3;position:absolute;display:none;' onmouseout='expand_close("+video.videoId+")'; onmouseover='expand("+video.videoId+
			         ",this);'><div class='img_center'><p><img onload='set_image_size(this);' src='"+video.image+"'></p></div></a>";
				
				}
				content+="</center>";
				if(video.liveFlag!=1){
					content+="<div style='font-size:12px;padding:0 10px;margin-bottom:10px;letter-spacing:0px;'>" +

					"<span style='font-size:13px;display:block;height:8px;'><a href='showUser.do?user.userId={author}' onclick='javascript:update_n(0,\"ajx/showUser.do?user.userId={author}\",HISTORY_CALL_BACK.UPDATE_CONTENT,\"用户信息\",HISTORY_CALL_BACK.INIT_USER_PAGE_LEFT);return false'>{nickname}</a></span></br>"+
					"<span style='display:block;height:8px;color:#444;' title='{title}'>{videoShortTitle}";
				}else{
					content+="<div style='background:#3995de;padding:10px 10px;'><div style='font-size:12px;letter-spacing:0px;'>" +
					"<span style='font-size:13px;display:block;height:10px;color:#fff;'><a style='color:#fff;' href='showUser.do?user.userId={author}' onclick='javascript:update_n(0,\"ajx/showUser.do?user.userId={author}\",HISTORY_CALL_BACK.UPDATE_CONTENT,\"用户信息\",HISTORY_CALL_BACK.INIT_USER_PAGE_LEFT);return false'>{nickname}</a>" +
					"<span style='height:10px;color:#fff;float:right;'>"+videoTime+"</span></span></br>"+
					"<span style='display:block;height:10px;font-weight:bold;color:#fff;' title='{title}'>{videoShortTitle}";
				}  	
				video.current_viewer_role=current_viewer_role;
				video.current_viewerid=current_viewerid;
				video.videoShortTitle=videoShortTitle;
				content=content.format(video);
				if(video.shareModel==4)
				{
					content+='<span style="float:right;width:auto;" ><img src="./pic/passwd.png" width="13" height="13" title="凭密码观看" border="0"></span>&nbsp&nbsp';
				}
				else if(video.shareModel==3)
				{
					content+='<span style="float:right;width:auto;" ><img src="./pic/friends.png" width="13" height="13" title="仅指定的圈子可以观看" border="0"></span>&nbsp&nbsp';
				}
				if((video.author==current_viewerid || (current_viewer_role=="admin" && video.appId==current_viewer_appId))&& (video.liveFlag==0 ||video.liveFlag==4 ) )
				{
					content+='<span style="float:right;width:auto;" ><a href="#" onclick="deleteVideo_n(\'' + video.videoId + '\');return false;">' + '<img src="./pic/delete.gif" width="13" height="13" title="删除" border="0"></a></span>';
				}
				content+="</span>";
				if(video.liveFlag!=1){
					content+="<br><div style='height:8px;color:#a9a9a9;'>"+videoTime;
				}else{
					
				}	
				if(video.liveFlag!=4 && video.liveFlag!=1){
					content+="\t\t\t\t<span style='float:right;width:auto;color:#a9a9a9;'>" + videoLenStr + "</span>";
				}
				content+="</div>";


				//观看次数
				if(video.liveFlag!=1){
					content+='</br><a title="观看次数" href="javascript:void(0)"  style="12px/1.125 Arial,Helvetica,sans-serif;margin-right:8px;" class="img"><span class="fixPng" style="background:url(\'./images/db.png\') no-repeat;padding-left:14px;">&nbsp;'+video.viewCnt+'</span></a>';
					//好评次数
					content+='<a title="好评次数" href="javascript:void(0)"  style="12px/1.125 Arial,Helvetica,sans-serif;margin-right:8px;" class="img"><span class="fixPng" style="background:url(\'./images/hp.png\') no-repeat;padding-left:15px;">'+video.likeCnt+'</span></a>';
					//差评次数
					//share
					content+="<a  title='分享' href='###' onclick='sharePanel(this,"+JSON.stringify(video)+");' style='12px/1.125 Arial,Helvetica,sans-serif;margin-right:8px;cursor:pointer;' class='img share2'><span class='fixPng' style='background:url(./images/fx2.png) no-repeat;padding-left:8px;'>&nbsp;&nbsp;分享</span></a>";
					content+='<a title="下载" href="#" onclick="prep_download(this,'+video.videoId+');return false;"  style="12px/1.125 Arial,Helvetica,sans-serif;cursor:pointer;float:right;" class="img"><span class="fixPng" style="background:url(\'./pic/dl.png\') no-repeat;padding-left:17px;padding-bottom:2px;color:#fff;"></span></a>';
				}else{
					content+='</br><a title="观看次数" href="javascript:void(0)"  style="12px/1.125 Arial,Helvetica,sans-serif;" class="img"><span class="fixPng" style="background:url(\'./images/player_2.png\') no-repeat;padding-left:17px;padding-bottom:2px;"></span><span style="color:#fff;padding:0 5px;">'+video.viewCnt+'</span></a>';
					//好评次数
					content+='<a title="好评次数" href="javascript:void(0)"  style="12px/1.125 Arial,Helvetica,sans-serif;" class="img"><span class="fixPng" style="background:url(\'./images/zan.png\') no-repeat;padding-left:17px;padding-bottom:2px;;"></span><span style="color:#fff;padding:0 5px;">'+video.likeCnt+'</span></a>';
					//差评次数
					//share
					content+='<a title="分享到" href="#" onclick="showShareDialog();return false;"  style="12px/1.125 Arial,Helvetica,sans-serif;cursor:pointer;" class="img"><span class="fixPng" style="background:url(\'./images/share_2.png\') no-repeat;padding-left:17px;padding-bottom:2px;color:#fff;">&nbsp;&nbsp;分享到</span></a>';
				}	
				//content+='&nbsp;&nbsp;&nbsp;&nbsp;<span><img src="./pic/share.png" width="13" height="13" title="share" border="0">share</span></div></div>';
				if(video.liveFlag==1){
					content+="</div>";//直播时显示的preview下面的蓝色部分的结束
				}
				content+="</div></div>";
				td[0].innerHTML=content;
				//a.append("hello");
			}
			else
				td.append(" ");
			    tr.append(td);
		}
	}
	if(res.pageCount>1){
	
	content=generatePageList(res.pageNumber,res.pageCount,"hover(this,"+currentDisplayList+")");
	}
	content_div.empty();
	content_div.append(table);
	if(res.pageCount>1){
	var line_div=$("<div class='video-fy'>");
	line_div[0].innerHTML="<ul>"+content+"</ul>";
	content_div.append(line_div);
	}
	
}

function expand(vid){
	if(ua.match(/msie ([\d.]+)/) !=null && ua.match(/msie ([\d.]+)/)[1] == 6.0){
		$("#expandImg_"+vid).show();
		var image = new Image();
		image.src = $("#expandImg_"+vid)[0].src;
		var ex_width = image.width;
		var ex_height = image.height;
		scale = ex_width/ex_height;
		if(ex_width<300){
			ex_width = image.width;
			ex_height = Math.round(ex_width/scale);
		}else{
			ex_width = 300;
			ex_height = Math.round(300/scale);
		}
		$("#expandImg_"+vid).width(ex_width);
		$("#expandImg_"+vid).height(ex_height);
	}else{
		$("#expandImg_"+vid).show();
	}
	
}

function expand_close(vid){
	$("#expandImg_"+vid).hide();
}

function playPicture(vid,URL){
	window.open("./play.do?video.videoId="+vid + "&video.liveFlag=4", "_blank");
}


var last_tab;
var last_tag;
var currentDisplayList;
function hover(me,n,tag) {

    //设置当前要显示的Tab为
	$('.footer').show();
	if(n){
	//	if(n!=currentDisplayList)
	//		pageNumber=1;
		    currentDisplayList = n;	 
	}
	var url;
	var title;
	switch (currentDisplayList)
	{
	case 1:
		title="正在直播";
		//解决刷新tab后不再计时的bug,将其放入displayVideolist
		/*intervalID =window.setTimeout(function(){
            getVideoList(currentDisplayList);
            intervalID = setTimeout(arguments.callee,5000);
        },5000);*/
		break;
	case 2:	
		title="视频大厅";	
		get_tab_list().select("视频大厅");
		/*get_tag().select("所有");*/
		break;
	case 3:
		title="我的视频";
		get_tab_list().select("我的视频");
		break;	
	case 5:
		title="视频搜索";
		get_tab_list().clear();
		break;
	case 6:
		title="图片大厅";
		get_tab_list().select("图片大厅");
		break;
	}

   /*if(tag==true)
    {
		if(last_tag)
			last_tag.removeClass('hover').addClass('normal');
	        last_tag=$(me);
	    $(me).removeClass('normal').addClass('hover');
    }
	else
	{
		if(last_tab)
			last_tab.removeClass('hover').addClass('normal');
	        last_tab=$(me);
	        $(me).removeClass('normal').addClass('hover');
	}*/
    

	var data="pageNumber="+pageNumber+"&pageSize=20&current_tag="+currentDisplayList;
	if(currentDisplayList==5)
		data+="&searchStr="+$("#searchStr")[0].value;
	if(currentDisplayList==2 && current_class!="所有")
		data+="&current_class="+current_class+"&searchStr=video";
	if(currentDisplayList==6 && current_class!="所有")
		data+="&current_class="+current_class+"&searchStr=picture";
	var url="ajx/listVideo.do";
	
	update_n(0,url,0,title,undefined,data);
}
function clear_refresh_timer()
{
	intervalID && window.clearTimeout(intervalID);
    intervalID=undefined;
}


function search_people() {
	$("#switch_nav").toggle();
}

function toSearchVideo(){
	var searchVal = document.getElementById("searchStr").value;
    if((searchVal == "") || (searchVal == null) || 
       (searchVal.length < 1) || (searchVal == "请输入关键字")) {
    	alert("请输入搜索关键字");
        return false;
    }  	
   	hover(undefined,5);
}


function toSearchPeople(){
		var searchVal = document.getElementById("searchStr").value;
	    if((searchVal == "") || (searchVal == null) || 
	       (searchVal.length < 1) || (searchVal == "请输入关键字")) {
	    	alert("请输入搜索关键字");
	        return false;
	    }  
	 if(current_viewerid==""){//没有登录
		 get_tab_list().clear();
			var data="search_key_word="+searchVal+"&pageNumber=1&pageSize=20";
			var url="./ajx/searchnewbuddy.do";
			jQuery.ajax({
				url:url,
				data:data,
				type:"POST",
				success:function(data)
				{
					var res=parseJSON(data);
					if(res.result!="")
						alert(res.result);
					else
					{
						var buddy_div=$("#content");
						if(res.friends.length==0){
							buddy_div.empty();
							return;
						}
						
						var table=$("<table style='width:960px;margin:10px auto;border-spacing:0px;'>");
						var tbody=$("<tbody>");
						table.append(tbody);
						var content=" ";	
						for(var index=0;index<4;index++)//四行
						{
							var tr=$("<tr style='width:960px;'>");
							tbody.append(tr);
							for(var i=0;i<5;i++)//每行五个
							{
								var td=$("<td class='preview_td'>");
								var friend_index=index*5+i;
								var friend=res.friends[friend_index];
								if(friend){	
										content="<div  class='preview_div' style='border:none;height:auto;'>";
										content+="<center id='preview_"+friend.userId+"' style='height:139px;'>";
										content+="<a href='#' onclick=''>" +
											  "<img border='0' src='{image}' onerror='defaultImage(this);'" +
											  " style='z-index:1;position:relative;max-width:170px;max-height:139px;display:inline-block;vertical-align:middle;'></a>";
									
									content+="</center>";
									
										content+="<div style='font-size:12px;padding:0 30px;margin-bottom:10px;letter-spacing:0px;'>";
										var nickname;
										if(friend.nickname.length>8){
											nickname = friend.nickname.substring(0,5) + "...";
										}else{
											nickname = friend.nickname;
										}
										if(friend.gender==2){
											content+="<span class='buddy_man_img'><a href='showUser.do?user.userId={userId}' title='{nickname}' onclick='javascript:update_n(0,\"ajx/showUser.do?user.userId={userId}\",HISTORY_CALL_BACK.UPDATE_CONTENT,\"用户信息\",HISTORY_CALL_BACK.INIT_USER_PAGE_LEFT);return false'>"+nickname+"</a></span>";
										}else if(friend.gender==1){
											content+="<span class='buddy_woman_img'><a href='showUser.do?user.userId={userId}' title='{nickname}' onclick='javascript:update_n(0,\"ajx/showUser.do?user.userId={userId}\",HISTORY_CALL_BACK.UPDATE_CONTENT,\"用户信息\",HISTORY_CALL_BACK.INIT_USER_PAGE_LEFT);return false'>"+nickname+"</a></span>";
										}else{
											content+="<span class='buddy_woman_img'><a href='showUser.do?user.userId={userId}' title='{nickname}' onclick='javascript:update_n(0,\"ajx/showUser.do?user.userId={userId}\",HISTORY_CALL_BACK.UPDATE_CONTENT,\"用户信息\",HISTORY_CALL_BACK.INIT_USER_PAGE_LEFT);return false'>"+nickname+"</a></span>";
										}
										content+="<span class='toFocus' onclick='tipsToLogin();'>+关注</span>";
										content+="</br><span style='display:block;padding-top:10px;color:#444;'>{firstLocation}{secondLocation}";
									
							
									content=content.format(friend);
									
									content+="</span>";
									
									content+="</div></div>";
									td[0].innerHTML=content;
									//a.append("hello");
								}
								else
									td.append(" ");
								    tr.append(td);
							}
						}
						if(res.pageCount>0){
							var list = generatePageList(parseInt(res.pageNumber),parseInt(res.pageCount),"searchNewBuddyPagingForNoLogin(\""+searchVal+"\")");
						}
						buddy_div.empty();
						buddy_div.append(table);
						if(res.pageCount>1){
							var line_div=$("<div class='video-fy'>");
							line_div[0].innerHTML="<ul>"+list+"</ul>";
							buddy_div.append(line_div);
					    }
					}
				}
				});
	    }else{//登录用户找人跳转到圈子管理
	    	var url =  window.location.href;
	    	if(url.indexOf("mycircle")<0 && url.indexOf("showMySearch")<0){
	    		top.location.href="./showMySearch.do?search_key_word="+searchVal;
	    	}else{
	    		search_new_buddy(searchVal);
	    	}
	    	
	    	
	    }
		
	}
function tipsToLogin(){
	alert("请先登录");
}

function clearSeachStr() {
    document.getElementById("searchStr").value="";
    document.getElementById("searchStr").style.color = "#000000";
}
function check_vtc_forLive(){
	
	//TODO
	 var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	
	clear_refresh_timer();
	var content="<div class='player-first'><div class='player-first-nr'>";
	if(flag){
	var res=check_vtc();
     if(res&2){/*check if new plugin;*/
       word=(res&1?"升级":"安装");
       if(res&1){//升级可以暂不升级，允许用户直播
    	   content+="<div class='player-computer' style='margin-left:27%;padding-top:20%;'><div align='center'><a href='javascript:web_live();'><div style='float:left;'><img src='images/w1.png' height='70' width='41' /></div>" +
			"<div class='chajian_an'>使用电脑直播</div>"+
           "<div style='float:left;'><img src='images/w3.png' height='70' width='42'/></div></a></div></div>";
       }else{
    	   content+="<div class='player-computer' style='margin-top:80px;'><div><a href='resource/VTCWebPlugin_"+PLUGINVERSION+".msi'  target='_blank' class='chajian_tu'></a></div>" +
      		"<div class='chajian_zi'><p class='z1'>点击下载并"+word+"<span><a href='resource/VTCWebPlugin_"+PLUGINVERSION+".msi' target='_blank'>VTC插件</a></span></p><p class='z2' style='color:red;'>安装完成后需要重启浏览器</p></div>" +
      		"<p class='smno'>插件安装遇到问题，<a href=''>点击查看帮助>></a></p></div>";
       } 
    }else{//如果已经安装插件
    	content+="<div class='player-computer' style='margin-left:27%;padding-top:20%;'><div align='center'><a href='javascript:web_live();'><div style='float:left;'><img src='images/w1.png' height='70' width='41' /></div>" +
    			"<div class='chajian_an'>使用电脑直播</div>"+
                "<div style='float:left;'><img src='images/w3.png' height='70' width='42'/></div></a></div></div>";
    }   
    //手机直播step
    content+='<div class="step_phone" style="display:none"><div class="left_arr"><a href="#" onclick="prev_one()"><img src="images/left_arr.png" alt="上一步"/></a></div>'+
    	     '<div class="ph_bg"> <ul class="phone_steps"><li class="step1">'+
    	     '<div class="ph_bg_left"><p class="android2"><a href="./apk/vtc365.apk" class="xz_1" target="_blank"></a></p>'+
             '<p class="iphone2"><a href="https://itunes.apple.com/cn/app/wei-te-xi/id695407059?mt=8&amp;ls=1" target="_blank" class="xz_2"></a></p></div>'+
             '<div class="zb_ma" title="扫一扫二维码"></div></li>'+
             '<li class="step2" style="display:none;"><div class="two" style="position:absolute; left:-110px; top:-50px;"></div></li>'+ 
             '<li class="step3" style="display:none;"><a href="listVideo.do?pageNumber=1&pageSize=20&current_tag=1"><div class="player2"></div></a></li></ul></div>'+
             '<div class="right_arr"><a href="#" onclick="next_one()"><img src="images/right_arr.png" alt="下一步"/></a></div>'+
             '<ul id="step_w"><li><p class="step">第一步&nbsp;&nbsp;&nbsp;扫描二维码或点击按钮下载手机客户端，安装并登陆</p></li>'+
             '<li style="display:none"><p class="step">第二步&nbsp;&nbsp;&nbsp;只需点击3次便可开始直播</p></li>'+
			 '<li style="display:none"><p class="step">第三步&nbsp;&nbsp;&nbsp;点击播放图标在电脑上观看！</p></li></ul>'+
			 '<p class="line2"><img src="images/line2.png" /></p></div>';
	
	content+="</div></div>";
    content+="<div class='player_bottom_qh'><div class='computer_zb'><div class='comp'><p class='jiao'></p>" +
    		"<span class='cp'></span><span class='p1'>通过电脑直播</span></div><div class='pic_com' style='display:block'></div></div>" +
    		"<div class='phone_zb'><div class='pho'><span class='cp'></span><span class='p1'>通过手机直播</span></div><div class='pic_ph' style='display:none'></div></div></div>";   
	}else{
		 //手机直播step
	    content+='<div class="step_phone" style="display:block"><div class="left_arr"><a href="#" onclick="prev_one()"><img src="images/left_arr.png" alt="上一步"/></a></div>'+
	    	     '<div class="ph_bg"> <ul class="phone_steps"><li class="step1">'+
	    	     '<div class="ph_bg_left"><p class="android2"><a href="./apk/vtc365.apk" class="xz_1" target="_blank"></a></p>'+
	             '<p class="iphone2"><a href="https://itunes.apple.com/cn/app/wei-te-xi/id695407059?mt=8&amp;ls=1" target="_blank" class="xz_2"></a></p></div>'+
	             '<div class="zb_ma" title="扫一扫二维码"></div></li>'+
	             '<li class="step2" style="display:none;"><div class="two" style="position:absolute; left:-110px; top:-50px;"></div></li>'+ 
	             '<li class="step3" style="display:none;"><a href="listVideo.do?pageNumber=1&pageSize=20&current_tag=1"><div class="player2"></div></a></li></ul></div>'+
	             '<div class="right_arr"><a href="#" onclick="next_one()"><img src="images/right_arr.png" alt="下一步"/></a></div>'+
	             '<ul id="step_w"><li><p class="step">第一步&nbsp;&nbsp;&nbsp;扫描二维码或点击按钮下载手机客户端，安装并登陆</p></li>'+
	             '<li style="display:none"><p class="step">第二步&nbsp;&nbsp;&nbsp;只需点击3次便可开始直播</p></li>'+
				 '<li style="display:none"><p class="step">第三步&nbsp;&nbsp;&nbsp;点击播放图标在电脑上观看！</p></li></ul>'+
				 '<p class="line2"><img src="images/line2.png" /></p></div>';
	}
    $("#content").empty();
    $("#content").html(content);
}
//手机直播引导

var i = 0;
function prev_one(){
  if(i > 0){
  i--;
  $(".phone_steps li:eq(" + i + ")").show().siblings().hide(); 
  $("#step_w li:eq(" + i + ")").show().siblings().hide();   
  }
}
function next_one(){  
 var li = $(".phone_steps li");
 var n = li.length - 1;
 if(i < n){
 i++;
 $(".phone_steps li:eq(" + i + ")").show().siblings().hide(); 
 $("#step_w li:eq(" + i + ")").show().siblings().hide();   
 }
}
function web_live(){
	if(!current_viewerid){
		alert("请先登录再进行网页端直播");
		return false;
	}else{
        return check_plugin();
	}
}

function sharePanel (icon_control,v){
	
console.log(v);
	$(".video_share").remove();
	var videoId = v.videoId;
	var videoTitle = v.title;
	var videoPreviewPic = v.image;
	var hostname= window.location.hostname;
	var shareDiv ="<div class='video_share' style='display:block;width:535px;height:90px;position:absolute;z-index:3;border:1px solid #efefef;background:#ffffff;' ><ul>" +
	" <li style='margin-left:5px;float:left;width:60px'><a target='_blank' style='margin-left:5px;color:#666;' href='http://service.weibo.com/share/share.php?url=http%3A%2F%2F"+hostname+"%3A8080%2FLiveVideoServer%2Fplay.do%3Fvideo.videoId%3D"+videoId+"&type=3&language=zh_cn&title=微特喜%20手机直播%20"+videoTitle+"&pic=http%3A%2F%2F"+hostname+"%3A8080"+videoPreviewPic+"&&searchPic=false&appkey=2386326227'><i style='background:url(./images/share-icon.png) no-repeat;background-position: 0 0;display:block;width:35px;height:35px;margin-left:6px;margin-top:10px;'></i> 新浪微博</a> </li>" +
	"<li style='margin-left:5px;float:left;width:60px'><a target='_blank' style='margin-left:5px;color:#666;' href='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http%3A%2F%2F"+hostname+"%3A8080%2FLiveVideoServer%2Fplay.do%3Fvideo.videoId%3D"+videoId+"&type=3&language=zh_cn&title=微特喜%20手机直播%20"+videoTitle+"&pic=http%3A%2F%2F"+hostname+"%3A8080"+videoPreviewPic+"&&searchPic=false&appkey=2386326227'><i style='background:url(./images/share-icon.png) no-repeat;background-position: -55px 0;display:block;width:35px;height:35px;margin-left:6px;margin-top:10px;'></i>  QQ空间 </a> </li>"+
	"<li style='margin-left:5px;float:left;width:60px'><a target='_blank' style='margin-left:5px;color:#666;' href='http://v.t.qq.com/share/share.php?url=http%3A%2F%2F"+hostname+"%3A8080%2FLiveVideoServer%2Fplay.do%3Fvideo.videoId%3D"+videoId+"&type=3&language=zh_cn&title=微特喜%20手机直播%20"+videoTitle+"&pic=http%3A%2F%2F"+hostname+"%3A8080"+videoPreviewPic+"&&searchPic=false&appkey=2386326227'><i style='background:url(./images/share-icon.png) no-repeat;background-position: -110px 0;display:block;width:35px;height:35px;margin-left:6px;margin-top:10px;'></i> 腾讯微博  </a></li>"+
	"<li style='margin-left:5px;float:left;width:60px'><a target='_blank' style='margin-left:5px;color:#666;' href='http://widget.renren.com/dialog/share?url=http%3A%2F%2F"+hostname+"%3A8080%2FLiveVideoServer%2Fplay.do%3Fvideo.videoId%3D"+videoId+"&type=3&language=zh_cn&title=微特喜%20手机直播%20"+videoTitle+"&pic=http%3A%2F%2F"+hostname+"%3A8080"+videoPreviewPic+"&&searchPic=false'><i style='background:url(./images/share-icon.png) no-repeat;background-position: -165px 0;display:block;width:35px;height:35px;margin-left:6px;margin-top:10px;'></i>  &nbsp;人人网  </a>   </li>"+
	"<li style='margin-left:5px;float:left;width:60px'><a target='_blank' style='margin-left:5px;color:#666;' href='http://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2F"+hostname+"%3A8080%2FLiveVideoServer%2Fplay.do%3Fvideo.videoId%3D"+videoId+"&type=3&language=zh_cn&title=微特喜%20手机直播%20"+videoTitle+"&pic=http%3A%2F%2F"+hostname+"%3A8080"+videoPreviewPic+"&&searchPic=false'><i style='background:url(./images/share-icon.png) no-repeat;background-position: -220px 0;display:block;width:35px;height:35px;margin-left:6px;margin-top:10px;'></i>  QQ好友 </a></li>"+
	"<li style='margin-left:5px;float:left;width:60px'><a class='showWx' style='margin-left:5px;color:#666;' ><i style='background:url(./images/share-icon.png) no-repeat;background-position: -275px 0;display:block;width:35px;height:35px;margin-left:6px;margin-top:10px;'></i>微信好友 </a></li>"+
	"<li style='margin-left:5px;float:left;width:60px'><a class='showWx' style='margin-left:5px;color:#666;' ><i style='background:url(./images/share-icon.png) no-repeat;background-position: -330px 0;display:block;width:35px;height:35px;margin-left:6px;margin-top:10px;'></i>&nbsp;朋友圈 </a></li>"+
	"<li style='margin-left:5px;float:left;width:60px'><a target='_blank' style='margin-left:5px;color:#666;' href='http://tieba.baidu.com/f/commit/share/openShareApi?url=http%3A%2F%2F"+hostname+"%3A8080%2FLiveVideoServer%2Fplay.do%3Fvideo.videoId%3D"+videoId+"&type=3&language=zh_cn&title=微特喜%20手机直播%20"+videoTitle+"&pic=http%3A%2F%2F"+hostname+"%3A8080"+videoPreviewPic+"&&searchPic=false'><i style='background:url(./images/share-icon.png) no-repeat;background-position: -385px 0;display:block;width:35px;height:35px;margin-left:6px;margin-top:10px;'></i>百度贴吧 </a></li>"+
	"<li><a id='close_btn' href='###' onclick='closeBtn(event)' title='关闭' style='position: absolute; right: 7px; top: 3px; color: #8e8e8e;font-family: tahoma,Helvetica,Arial,sans-serif;font-size: 16px; line-height: 10px'> X </a> </li> "+
	"</ul></div>";

	$(icon_control).append(shareDiv);
	/*function closeBtn(e){
		if ( e && e.stopPropagation )
			e.stopPropagation(); 
		else
			window.event.cancelBubble = true;
		alert("soso");
		$(".video_share").remove();
	}*/

	$(".showWx").bind("click",function(){
		show_shareWx(videoId);
	});
	
}


var share_dialog;
		function show_shareWx(videoId)
		{
			if(share_dialog===undefined)
			{
				 var url = "http://" + window.location.hostname + "/vid=" + videoId;
				var imgurl = "http://" + window.location.hostname + "/c/qrcode.pl?text=" + escape(url) + "&size=3&margin=2&mode=8-bit&case=1&level=M&format=png";
				var div =" <div id='video_share_weixin' style='display: none;height:auto;margin-top:10%;text-align:center'> <img id='qrcode' src='"+imgurl+"' style='width:300px;height:300px'> </img> <p>手机微信扫一扫，分享给你的好友 </p>    </div>"
				var opt={
					title:"分享到微信",
					content:div,
					size:{width:600,height:500},
					button_panel:{type:"CLOSE",
					cancel:{value:"关闭"}
					}
				};
				share_dialog=new Dialog(opt);
			}
			share_dialog.show();
		}

		function closeBtn(e){
		var myE = e?e:(window.event?window.event:null)
		if ( myE && myE.stopPropagation )  //非IE浏览器
			myE.stopPropagation(); 
		else
			myE.cancelBubble = true; //IE浏览器
			$(".video_share").remove();
	}
