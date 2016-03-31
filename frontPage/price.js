var P2;
var initPrice=0;
var P1;
var fb;
var Td=1;
var s_now;
var m;
var U;
var Tm;

function storTotalPrice(U,Tm){
		 // U=$('#storage_bubble').html();
		 // Tm=$('#stortime_bubble').html();
		if(U<=1&&Tm<=1||U==0){
			P2=0;
		}else{
			var Pu=1;//云存储磁盘单价
			var Rs=0.31;
			var Rm=1.5;
			var Pe=Pu*U* Tm*(1+ Rs);
			 P2=Math.ceil(Pe*(1+Rm));
		}
		var str=P2.toString();
		var price=priceFomat(str);
		
		// $('.store-price').html("¥ "+price);
		return P2;
	}

	function LiveTotalPrice(){
			// var liveAmount=$("#bubble").html();
			if(s_now>0){
				var liveAmount=$("#bubble").html()-liveCnt;
				Td=now_e;
				initPrice=0;
			}
		
			
			var Rc;
			// fb=$('.selected-opt').html();//视频分辨率
			
			if(Td>0&&Td<=24){Rc=0.73}
			else if(Td>24&&Td<=240){Rc=15/Td+0.1;}
			else if(Td>240&&Td<=720){Rc=24/Td+0.05}
			else if(Td>720&&Td<=8640){Rc=0.03;}
			
			
			if(fb=='480P-标清'){
				fb=512;
			}else if(fb=='720P-高清'){
				fb=1024;
			}
			if(liveAmount<=0||Td==0){
				P1=0;
			
			}else{
			
				 
				// m=$('#bubble').html();//视频直播的路数
				// m = liveAmount;
				var Pb=80;//核心网单价
				var Pm=384;//云主机组件	
				
				var Pc=(fb/1024*m* Pb+ Pm)/30/24*Td;
			   
			   	var Pg=15;//4G流量卡单价
			   	var Pr=(fb * Td *3600)/8/1024/1024 * Pg;//4G流量总价
			   	var Pt=0.4;
				var Ps= m*Td * Pt;
					Ps=Ps>=1000?1000:Ps;
				var Rs=0.31;//税率
				var Pz=( Pc/(1- Rc)+ Pr+ Ps )*(1+Rs);
				var Rm=1.5;
				P1=Math.ceil(Pz * (1+Rm));//直播配置销售价
			}
			var str=P1.toString();
			var price=priceFomat(str);
			$('.total-price').html("¥ "+price);
			var factPrice=P1-initPrice;
			factPrice=factPrice>=0?factPrice:0;
			var str2=factPrice.toString();
			var price2=priceFomat(str2);
			$('.fact-price').html("¥ "+price2);
			console.log("initPrice--"+initPrice);
			console.log("price2--"+price2);
			console.log("P1--"+P1);
		    return P1;		
		}