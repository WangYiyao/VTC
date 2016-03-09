var cje = function(tag_name){
		return jQuery(document.createElement(tag_name));
};
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) 
		return unescape(r[2]);
	return null;
};
var flag;
function getUserLiveVideo(user, cbyes, cbno){
	var url = "ajx/cameraBoxVideo.do";
		$.ajax({
			type: "POST",
			url: url,
			data: "user=" + user,
			dataType: "JSON",
			success: function(res){
				
				if(res.reason){
					//var shareURL = "www.vtc365.cn/vid=" +res.reason;
					//alert(shareURL);
					$(".share-link").val("www.vtc365.cn/vid=" +res.reason);
					if(cbyes){
						cbyes(res.reason);
					}
				}else{
					$(".share-link").val("");
					if(cbno){
						cbno();
					}
				}
			}		
		});
}


function hideVideo(box, user, psk){
	if(box){
		box.empty();
		$('#camera').addClass('btn-start');
		$('#camera').removeClass('btn-stop');
		var startLinkdiv = cje("div");
		var startbox = cje("div").html("<span class='starting'>启动");
		endtime();
		$('.current-time').css({visibility:"hidden"});
		startLinkdiv.append(startbox);
		
		startLinkdiv.click(function(){
			
			//修改标题
			var name =$('#liveName').val() ;
			var devid =$("#devid").html() ;
			var videoId = null;
			var data = "db.name='"+name+"'&db.devid="+devid+"&db.videoId="+videoId;
			
			$.ajax({
				type: "POST",
				url: "ajx/changeTitle.do",
				data: data,
				dataType: "JSON",
				success: function(res){
				}
			});
			var title = $('#liveName').val();
			var groupId = $("#groupId").val();
			var rate = $("#rate").val();
			var description = $("#description").val();
			startbox.html("<span class='starting'>启动中</span><i class='loading'></i>");
			var url = "ajx/cameraBoxStart.do";
			var data = "user=" + user + "&key=" + psk + "&title=" + title + "&groupId="+ groupId + "&rate="+ rate + "&desc="+ description;
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				dataType: "JSON",
				success: function(res){
					if(res){
						setTimeout(function(){
							getUserLiveVideo(user, function(vid){
								showVideo(box, vid, user, psk);
							}, function(){
								hideVideo(box, user, psk);
							});
						}, 5000);
					}
				}
			});
		});
		box.append(startLinkdiv);
	}
}

function showVideo(box, vid, user, psk){
	if(box){
		box.empty();
		
		var vlinkdiv = cje("div");
		$('#view_video').html('');
		//vlinkdiv.append(cje("a").attr("href", "play.do?video.videoId=" + vid).attr("target", "_blank").text("观看"));
		$('#view_video').append(cje("a").attr("href", "play.do?video.videoId=" + vid).attr("target", "_blank").text("观看"));
		//$('.view-area').attr("href", "play.do?video.videoId=" + vid).attr("target", "_blank"));
		var stopLinkdiv = cje("div");
		var stopbox = cje("div").html("<span class='starting'>停止</span>");
		starttime();
		$('.current-time').css({visibility:"visible"});
		$('#camera').addClass('btn-stop');
		$('#camera').removeClass('btn-start');
		stopLinkdiv.append(stopbox);
		stopLinkdiv.click(function(){
			stopbox.html("<span class='starting'>停止中</span><i class='loading'></i>");
			var url = "ajx/cameraBoxStop.do";
			var data = "user=" + user + "&key=" + psk;
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				dataType: "JSON",
				success: function(res){
					if(res){
						setTimeout(function(){
							getUserLiveVideo(user, function(vid){
								showVideo(box, vid, user, psk);
							}, function(){
								hideVideo(box, user, psk);
							});
						}, 5000);
					}
				}
			});
		});
		//box.append(vlinkdiv).append(stopLinkdiv);
		box.append(stopLinkdiv);
	}
};
//This function will prepare the contents in the boxid<div>
function init_camerabox(user, psk, boxid){
	var cbox = $("#" + boxid);
	if(cbox){
		getUserLiveVideo(user, function(vid){
			
			showVideo(cbox, vid, user, psk);
		},function(){
			hideVideo(cbox, user, psk);
		});
	}
}

function startBox(user,psk,title,groupId,rate,description){
	var url = "ajx/cameraBoxStart.do";
	var data = "user=" + user + "&key=" + psk + "&title=" + title + "&groupId="+ groupId + "&rate="+ rate + "&desc="+ description;
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		dataType: "JSON",
		success: function(res){
			
		}
	});
}
function endBox(user,psk){
		var url = "ajx/cameraBoxStop.do";
		var data = "user=" + user + "&key=" + psk;
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			dataType: "JSON",
			success: function(res){
			}
		});
}


function settime(a){
	if(a<10)
		a = "0"+a;
	return a;
}

function initializeTime(){
	// 如果视频一开始启动，返回的是什么
	var videoString = "2016-03-09 12:40:00";
	videoString = videoString.replace(/-/g,"/");
	var videoTime = new Date(videoString);
	var now = new Date();
	alert(now);
  	var ms = parseInt((now - videoTime)/1000);//7910
  	s = ms%60;//50
  	var a = parseInt(ms/60);//131
  	m = a%60;
  	h = parseInt(a/60);
  	alert(h+":"+m+":"+s);

}

 var t =0;  //setTimeout的返回标志
 initializeTime();

function starttime(){
	
  	var showh = settime(h);
	var showm = settime(m);
	var shows = settime(s);
		var show_span = $(".current-time");
		var show_time = showh+":"+showm+":"+shows;
		show_span.text(show_time);

	s++;
	if(s == 60)
	{
		s = 0;
		m++;
	}
	if(m == 60){
	    m = 0;
		h++;
	}

	t = setTimeout("starttime()",1000);
		
}


function endtime() {
	clearTimeout(t);
	h = 0;
	m = 0;
	s = 0;
}

