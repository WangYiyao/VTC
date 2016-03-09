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

jQuery.cookie = function(name, value, options) {
if (typeof value != 'undefined') {
  options = options || {};
  if (value === null) {
  value = '';
  options = $.extend({}, options);
  options.expires = -1;
  }
  var expires = '';
  if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
  var date;
  if (typeof options.expires == 'number') {
   date = new Date();
   date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
  } else {
   date = options.expires;
  }
  expires = '; expires=' + date.toUTCString();
  }
  var path = options.path ? '; path=' + (options.path) : '';
  var domain = options.domain ? '; domain=' + (options.domain) : '';
  var secure = options.secure ? '; secure' : '';
  document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
} else {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
   var cookie = jQuery.trim(cookies[i]);
   if (cookie.substring(0, name.length + 1) == (name + '=')) {
   cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
   break;
   }
  }
  }
  return cookieValue;
}
};



function settime(a){
	if(a<10)
		a = "0"+a;
	return a;
}

 if(($.cookie("cookieH")  == null) && ($.cookie("cookieM")  == null) && ($.cookie("cookieSe") == null) ){
 var h =0;  //timer--hour
 var m =0;  //timer--minute
 var s =0;  //timer--second
 }
 var t =0;  //setTimeout的返回标志

function starttime(){
	$.cookie("cookieH",//写入cookie
  h,//需要cookie写入的业务
  {
  "path":"/", //cookie的默认属性
  "expires":2 //有效天数
});
$.cookie("cookieM",//写入cookie
  m,//需要cookie写入的业务
  {
  "path":"/", //cookie的默认属性
  "expires":2 //有效天数
});
$.cookie("cookieSe",//写入cookie
  s,//需要cookie写入的业务
  {
  "path":"/", //cookie的默认属性
  "expires":2 //有效天数
});
h = $.cookie("cookieH");
m = $.cookie("cookieM");
s = $.cookie("cookieSe");
  
 // function begintime(){
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
  //}
		
}


function endtime() {
	clearTimeout(t);
	h = 0;
	m = 0;
	s = 0;
	$.cookie("cookieH", null);
	$.cookie("cookieM", null);
	$.cookie("cookieSe", null);
}

