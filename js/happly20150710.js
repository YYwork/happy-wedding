function tabImg(option){
	var moveCls=option.moveCls || ".J-pub-topcon",
		  oBox=option.oBox || $(".J-pub-top"),
		  index=option.index||0,
		  event=option.event || false,
		  callback=option.callback || function(){},
			 even        = {
				star:0,
				end:0,
				starY:0,
				endY:0,
				move:0,
				moveY:0
			};
	if ($(moveCls).length>0){
		var oCon=$(moveCls),
			  oUl=oCon.find("ul"),
			  oList=oCon.find("li"),
			 // nw=$(window).width(),
				nw=640,
			  nl=-index*nw,num=0,tabtimer=null;
		if (oList.length/2>1){
			oUl.width(nw*oList.length/2);
			oCon.css({"-webkit-transition":"none .5s linear","-webkit-transform":"translateX("+nl+"px)"});
			oCon.width(nw*oList.length);
			for (var i=0;i<oBox.length;i++){
				oBox[i].addEventListener('touchstart', eventDown);
				oBox[i].addEventListener('touchend', eventUp);
				oBox[i].addEventListener('touchmove', eventMove);
				oBox[i].addEventListener('mousedown', eventDown);
				oBox[i].addEventListener('mouseup', eventUp);
				oBox[i].addEventListener('mousemove', eventMove);
				oBox[i].addEventListener("webkitTransitionEnd", function(){ //动画结束时事件
					animated=true;
				}, false);
			}
			//touchstart
			function eventDown(e){
				//e.preventDefault();
				mousedown=true;
				e.changedTouches ? (even.star = e.changedTouches[0].clientX) : (even.star = e.pageX);
				e.changedTouches ? (even.starY = e.changedTouches[0].clientY) : (even.starY = e.pageY);
			}
			//touchmove
			function eventMove(e){
				e.changedTouches ? (even.move = e.changedTouches[0].clientX) : (even.move = e.pageX);
				e.changedTouches ? (even.moveY = e.changedTouches[0].clientY) : (even.moveY = e.pageY);
				if(mousedown){
					if(Math.abs(even.starY-even.moveY)<Math.abs(even.star-even.move)){
						e.preventDefault();	
					}
				}
			}
			//eventUp
			function eventUp(e){
				if(mousedown){
					//e.preventDefault();
					mousedown = false;
					e.changedTouches ? (even.end = e.changedTouches[0].clientX) : (even.end = e.pageX);
					e.changedTouches ? (even.endY = e.changedTouches[0].clientY) : (even.endY = e.pageY);
					if(Math.abs(even.starY-even.endY)<Math.abs(even.star-even.end)){
						if((even.star-even.end)>15){//左
							left();
						}else if ((even.end-even.star)>15){//右
							nl=nl+nw;
							num=Math.abs(nl)/nw;
							oCon.css({"-webkit-transition":"all .5s linear","-webkit-transform":"translateX("+nl+"px)"});
							if (nl==nw){
								oCon.css({"-webkit-transition":"none","-webkit-transform":"translateX("+(-oList.length/2*nw)+"px)"});
								nl=-(oList.length/2-1)*nw;
								num=oList.length/2;
								setTimeout(function(){
									oCon.css({"-webkit-transition":"all .5s linear","-webkit-transform":"translateX("+nl+"px)"});
								},50)
							}
							oBox.attr("data-index",num==oList.length/2?oList.length/2-1:num)
							callback.call(oBox,num==oList.length/2?oList.length/2-1:num);
						}
					}
				}
			}
			if (!event){
				tabtimer=setInterval(function(){
					left();
				},3000);
				oBox.on("touchend",function(){
					clearInterval(tabtimer);
					tabtimer=setInterval(function(){
						left();
					},3000);
				})
			}
			function left(){
				nl=nl-nw;
				num=Math.abs(nl)/nw;
				oCon.css({"-webkit-transition":"all .5s linear","-webkit-transform":"translateX("+nl+"px)"});
				if (nl<=-((oList.length/2+1)*nw)){
					num=1;
					oCon.css({"-webkit-transition":"none .5s","-webkit-transform":"translateX(0px)"});
					setTimeout(function(){
						oCon.css({"-webkit-transition":"all .5s","-webkit-transform":"translateX("+(-nw)+"px)"});
					},50)
					nl=-nw;
				}
				oBox.attr("data-index",num==oList.length/2?0:num)
				callback.call(oBox,num==oList.length/2?0:num);
			}
		}
	}
}
/*function bigImage(obj){
	$("body").on('  touchmove', function (event){
		event.preventDefault();
	});
	var  html=obj.find("ul").html(),
		   oLists=obj.find("li"),
		   len=oLists.length,
		   index=parseInt(obj.attr("data-index"))||0,
		   wid=oLists.eq(0).width(),
		   alertHtml='<div class="m-pub-bigbox J-pub-bigbox" data-index="'+index+'">'
								+'<div class="m-pub-bigclose J-pub-bigclose"></div>'
								+'<div class="m-pinfo-top J-big-box">'
									+'<div class="m-pinfo-topcon J-big-con">'
										+'<ul>'+html+'</ul>'
										+'<ul>'+html+'</ul>'
									+'</div>'
								+'</div>'
								+'<div class="m-pinfo-tnum"><span>'+(index+1)+'</span>/'+len/2+'</div>'
							+'</div>';
	$("body").append(alertHtml);
	tabImg({
		moveCls:'.J-big-con',
		oBox:$(".J-big-box"),
		index:index,
		callback:function(n){
			this.next().find("span").text(n+1);
		}
	});
}*/
$(function(){
	stage();
	pagePub();
	pinfo();
	data();
	selectpage();
	cityPage();
	submitOnline();
	setMessage();
	//locGeolocation();
	selAlert();
	scroll();
	if($('.m-pub-btnbox').length>0){
		publist();
	}
	$("body").on("tap",function(e){
		if ($(e.target)[0].tagName!="INPUT"){
			$("input").blur();
		}
	})
	$(".J-map-close").on("tap",function(){
		$(".m-hotel-mapbag").remove();
	})


})

function submitOnline(){
	if ($(".J-find-btn").length>0){
		$(".J-find-btn").on("tap",function(){
			var forward=$(".J-input-forward").val(),
				  alternative=$(".J-input-alternative").val(),
				  phone=$(".J-input-phone").val(),
				  daterror=$(".J-city-daterror"),
				  //reg = /^0?1[3|4|5|8][0-9]\d{4,8}$/,
				  reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/,
				  phonerror=$(".J-city-phonerror"),
				  form=$(".J-form-sch"),
				  fDate=+new Date(forward),
				  aDate=+new Date(alternative),
				  nDate=new Date(),
				  tDate=+new Date(nDate.getFullYear(),nDate.getMonth(),nDate.getDate()),
				  //tDate=+new Date(nDate.getFullYear(),nDate.getMonth(),nDate.getDate()),
				  datehtml='<div class="m-city-errorbox J-city-daterror">'
									+'<div class="m-submit-error">'
										+'<div class="m-error-con J-error-con">亲，请填写婚期！</div>'
										+'<div class="fix">'
											+'<a href="javascript:;" class="J-error-btn">确定</a>	'
										+'</div>'
									+'</div>'
								+'</div>',
				  phonhtml='<div class="m-city-errorbox J-city-phonerror">'
									+'<div class="m-submit-error">'
										+'<div class="m-error-con">亲，号码出错啦！</div>'
										+'<div class="fix">'
											+'<a href="javascript:;" class="J-error-btn">确定</a>	'
										+'</div>'
									+'</div>'
								+'</div>';
			//可选日期不验证
			$(".J-input-phone").blur();
			if (forward=='' ){
			//if (forward=='' || alternative==''){
				if (daterror.length>0){
					daterror.show();
				}else{
					$("body").append(datehtml);
					daterror=$(".J-city-daterror")
				}
				$(".J-error-con").text("亲，请填写婚期！");
			}else if (fDate<tDate || aDate<tDate){
				if (daterror.length>0){
					daterror.show();
				}else{
					$("body").append(datehtml);
					daterror=$(".J-city-daterror")
				}
				$(".J-error-con").text("亲，请填写正确婚期！");
			}else if (phone==''||!reg.test(phone)){
				if (phonerror.length>0){
					phonerror.show();
				}else{
					$("body").append(phonhtml);
					phonerror=$(".J-city-daterror")
				}
			}else{
				//提交表单
				form.submit();
				righthtml='<div class="m-set-box J-right-box"><div class="m-right-con">提交成功</div></div>';
				$("body").append(righthtml);
				setTimeout(function(){
                    if (from_type == 'one_step') {
                        window.history.go(-1);
                    } else {
                        window.location="/"
                    }
				},2000);

			}
		});
		$("body").on("tap",".J-error-btn",function(){
			$(this).parent().parent().parent().hide();
		})
	}
}

function cityPage(){
	$("body").on("tap",".J-city-selbtn",function(){
			var txt=$(this).prev().val(),has=true,errorBox=$(".J-city-errorbox"),indexStage = $(".J-stage-banner"),
				source = $(this).parent("div").attr('propt'),
				  html='<div class="m-city-errorbox J-city-errorbox">'
								+'<div class="m-city-error">您所搜索的城市我们正在努力开发中，<br/>先去北京看看吧!</div>'
							+'</div>';
			if(indexStage.length>0){//首页的调整方式不一样，单独处理
				if (txt!=''){
					city = $(".J-search-city").text();
					window.location="/Jiudian/index/city/"+city+"/name/"+txt
					return ;
				}else{
					$(this).prev().addClass("m-input-error");
				}
				
			}
			//走ajax判断是否有这个城市，有的话返回 has=false;
			$.getJSON("/Jiudian/checkcity",{city:txt},
				function(data){
				has=false;
				if(data>0){
					has=true;
				}

				$(this).prev().blur();
				if (txt!=''){
					if (!has){
						if (errorBox.length>0){
							errorBox.show();
						}else{
							$("body").append(html);
							errorBox=$(".J-city-errorbox");
						}
						setTimeout(function(){
							if(source!=''&&source=="search"){
								window.location="/Jiudian/search/city/北京"
							}else{
								window.location="/Index/index/city/北京"
							}
						},3000);
					}else{
						$(".J-city-errorbox").hide();
						if(source=="search"){
							window.location="/Jiudian/search/city/"+txt+'/cid/'+data
						}else{
							window.location="/Index/index/city/"+txt+'/cid/'+data
						}
					}
				}else{
					$(this).prev().addClass("m-input-error");
				}
			});

		}).on("tap",".J-city-errorbox",function(){
			$(this).hide();
		})
	var num=0
	$(".J-city-top").on("tap",function(){
			num++;
			setTimeout(function(){
				if (num>0){
					$("body,html").scrollTop(0);
				}
				num=0
			},1000)
	})

}
function selAlert(){
	var oBtn=$(".J-public-selbtn");
	if (oBtn.length>0){
		oBtn.on("tap",function(){
			var html='<div class="m-sel-alcon J-sel-alcon">'
								+'<div class="fix m-sel-altop">'
									+'<input class="city_jiudian" type="text" placeholder="输入酒店或地址"/>'
									+'<a href="javascript:;" class="J-city-selbtn">确定</a>'
								+'</div>'
							+'</div>',
				  oAlert=$(".J-sel-alcon");
			if (oAlert.length>0){
				oAlert.show().find("input").val("");
			}else{
				$("body").append(html);
				oAlert=$(".J-sel-alcon");
			}
			
		})
	$("body").on("tap",".J-sel-alcon",function(e){
		if ($(e.target).hasClass("J-sel-alcon")){
			$(".J-sel-alcon").hide();
		}
	}).on("touchend",".J-sel-alcon",function(e){
		e.preventDefault();
	}).on("tap",".J-sel-alcon input",function(){
		$(this).focus();
	})


	}
}

if ($(".J-data-yearsel").length>0){
	var json = null;
	var json={
		2015:{
			"1":[1,3,5,8,7,21,14,26],
			"2":[1,3,5,8,7,21,14,26],
			"3":[1,3,5,8,7,21,14,26],
			"4":[1,3,5,8,7,21,14,26],
			"5":[1,3,5,8,7,21,14,26],
			"6":[1,3,5,8,7,21,14,26],
			"7":[1,3,5,8,7,21,14,26],
			"8":[1,3,5,8,7,21,14,26],
			"9":[1,3,5,8,7,21,14,26],
			"10":[1,3,5,8,7,21,14,26],
			"11":[1,3,5,8,7,21,14,26],
			"0":[1,3,5,8,7,21,14,26],
		},
		2016:{
			"1":[1,3,5,8,7,21,14,26],
			"2":[1,3,5,8,7,21,14,26],
			"3":[1,3,5,8,7,21,14,26],
			"4":[1,3,5,8,7,21,14,26],
			"5":[1,3,5,8,7,21,14,26],
			"6":[1,3,5,8,7,21,14,26],
			"7":[1,3,5,8,7,21,14,26],
			"8":[1,3,5,8,7,21,14,26],
			"9":[1,3,5,8,7,21,14,26],
			"10":[1,3,5,8,7,21,14,26],
			"11":[1,3,5,8,7,21,14,26],
			"0":[1,3,5,8,7,21,14,26],
		}
	}
}
//首页
function stage(){
	if ($(".J-stage-btnbox").length>0){
		var starY=0,moveY=0,endY=0,st=0,
			  oBox=$(".J-stage-banner"),
			  oBox1=$(".J-stage-banner1"),
			  offset=0,
			  bantimer=null;
		$("body").on("touchstart",function(e){
			e.changedTouches ? (starY = e.changedTouches[0].clientY) : (starY = e.pageY);
			clearInterval(bantimer)
		});
		$("body").on("touchmove",function(e){
			st=$(window).scrollTop();
			e.changedTouches ? (moveY = e.changedTouches[0].clientY) : (moveY = e.pageY);
			if (moveY>starY){
				$(".J-stage-btnbox").show();
			}else{	
				if (st!=$("body").height()-$(window).height()){
					$(".J-stage-btnbox").hide();
				}
			}
			if (oBox.length>0){
			  offset=oBox.offset().top;
				if (st<offset){
					oBox1.hide();
				}else{
					oBox1.show();
				}
			}
		});
		if (oBox.length>0){
			$("body").on("touchend",function(e){
				if ($(e.target)[0].tagName!="INPUT"){
					offset=oBox.offset().top;
					e.changedTouches ? (endY = e.changedTouches[0].clientY) : (endY = e.pageY);
					st=$(window).scrollTop();
					bantimer=setInterval(function(){
						st=$(window).scrollTop();
						console.log(st+"|||"+offset)
						if (st<offset){
							oBox1.hide();
						}else{
							oBox1.show();
						}
					},1);
					setTimeout(function(){
						st=$(window).scrollTop();
						console.log(st+"|||"+offset)
						if (st<offset){
							oBox1.hide();
						}else{
							oBox1.show();
						}
					},10)
					setTimeout(function(){
						clearInterval(bantimer);
					},1000)
					if (st<offset){
						oBox1.hide();
					}else{
						oBox1.show();
					}
				}
			});
		}
		tabImg({
			moveCls:'.J-stage-tabcon',
			oBox:$(".J-stage-tabbox"),
			callback:function(n){
				this.find(".m-stage-tabiconbox").find("span").removeClass("z-on").eq(n).addClass("z-on");
			}
		});
	}
}
//酒店列表
function pagePub(){
	if ($(".J-pub-outmask").length>0){
		if (!$(".J-pub-outmask").hasClass("move")){
			var starY=0,moveY=0,endY=0,st=0,
				  masktimer=null;
			$("body").on("touchstart",function(e){
				e.changedTouches ? (starY = e.changedTouches[0].clientY) : (starY = e.pageY);
				clearInterval(masktimer)
			});
			$("body").on("touchmove",function(e){
				st=$(window).scrollTop();
				e.changedTouches ? (moveY = e.changedTouches[0].clientY) : (moveY = e.pageY);
				if (st>=291){
					$(".J-pub-outmask,.J-pub-outcon").show().addClass("move");
					SetCookie('jiudian_more_pic',1);
				}
			});
		}
		if ($(".J-pub-outmask").length>0){
			$("body").on("touchend",function(e){
				e.changedTouches ? (endY = e.changedTouches[0].clientY) : (endY = e.pageY);
				st=$(window).scrollTop();
				masktimer=setInterval(function(){
					st=$(window).scrollTop();
					if (st>291){
						$(".J-pub-outmask,.J-pub-outcon").show().addClass("move");
						SetCookie('jiudian_more_pic',1);
					}
				},1);
				setTimeout(function(){
					clearInterval(masktimer);
				},1000);
			});
		}
		
		
		
		tabImg({
			moveCls:'.J-stage-tabcon',
			oBox:$(".J-stage-tabbox"),
			callback:function(n){
				this.find(".m-stage-tabiconbox").find("span").removeClass("z-on").eq(n).addClass("z-on");
			}
		});
	}
	if ($(".J-pub-outmask").length>0){
		$(".J-pub-outmask,.J-pub-outcon").on("touchstart",function(e){
			e.preventDefault();
			$(".J-pub-outmask,.J-pub-outcon").remove();
		})
	}
	tabImg({
		callback:function(n){
			this.find(".m-stage-tabiconbox").find("span").removeClass("z-on").eq(n).addClass("z-on");
		}
	});
	if ($(".J-pub-listbox").length>0){
		var oCon=null,num=1,wid=0,oBox=$(".J-pub-listbox"),mousedown1=false,
			 even        = {
				star:0,
				end:0,
				starY:0,
				endY:0,
				move:0,
				moveY:0
			};
		$(".J-pub-list").on("touchstart",function(e){
			if ($(e.target).parents(".J-pub-listbox").length>0){
				
				mousedown1=true;
				e.changedTouches ? (even.star = e.changedTouches[0].clientX) : (even.star = e.pageX);
				e.changedTouches ? (even.starY = e.changedTouches[0].clientY) : (even.starY = e.pageY);
			}
		}).on("touchmove",function(e){
			if ($(e.target).parents(".J-pub-listbox").length>0){
				e.changedTouches ? (even.move = e.changedTouches[0].clientX) : (even.move = e.pageX);
				e.changedTouches ? (even.moveY = e.changedTouches[0].clientY) : (even.moveY = e.pageY);
				if(mousedown1){
					if(Math.abs(even.starY-even.moveY)<Math.abs(even.star-even.move)){
						e.preventDefault();	
					}
				}
			}
		}).on("touchend",function(e){
			if ($(e.target).parents(".J-pub-listbox").length>0){
			if(mousedown1){
				//e.preventDefault();
				mousedown = false;
				e.changedTouches ? (even.end = e.changedTouches[0].clientX) : (even.end = e.pageX);
				e.changedTouches ? (even.endY = e.changedTouches[0].clientY) : (even.endY = e.pageY);
				if(Math.abs(even.starY-even.endY)<Math.abs(even.star-even.end)){
					if((even.star-even.end)>15){//左
						var _this=$(e.target).parents(".J-pub-listbox");
						num=_this.attr("data-num") || 1;
						wid=_this.width();
						oCon=_this.find(".J-pub-listcon");
						if (num<3){
							oCon.css("-webkit-transform","translateX("+-wid*num+"px)");
							num++;
							_this.attr("data-num",num);
						}else if (num==3){
							num++;
							$(".J-pub-listmask,.J-pub-call").show();
						}
					}else if ((even.end-even.star)>15){//右
						var _this=$(e.target).parents(".J-pub-listbox");
						num=_this.attr("data-num") || 1;
						wid=_this.width();
						oCon=_this.find(".J-pub-listcon");
						if (num>1){
							if (num==3){
								setTimeout(function(){
									$(".J-pub-listmask,.J-pub-call").hide();
								},800)
							}
							oCon.css("-webkit-transform","translateX("+-wid*(num-2)+"px)");
							num--;
							_this.attr("data-num",num)
						}
					}
				}
				
				$("body").off("touchmove");
			}
			}
		})	
	}

	if ($(".J-top-select").length>0){
		
		$(".J-top-select").on("tap",function(e){
			//alert($(e.target)[0].nodeName);
			if($(e.target)[0].nodeName!="A"){
				if($(".J-pub-sellist").css('display') == 'block'){//modify by yuhaiqiang ,点击取消select
					$(".J-pub-selmask,.J-pub-sellist").hide();
				}else{
					var index=$(this).attr("data-index");
					//$(".J-pub-sellist").show().find("li").removeClass("m-select-on").eq(index).addClass("m-select-on");
					$(".J-pub-sellist").show();
					$(".J-pub-selmask").show().height($("body").height()-88);
				}
			}
		});
		
		/*
		$(".J-pub-sellist li").on("tap",function(e){
			var oUl=$(this).parents(".J-pub-sellist");
			var txt = $(this).text();
			$(".J-top-select").html(txt).attr("data-index",$(".J-pub-sellist li").index($(this)));
			$(".J-pub-selmask,.J-pub-sellist").hide();
		});
		*/
		$(".J-pub-select li a").on("tap",function(e){
			 e.preventDefault();
		})
		$("body").on("tap",".J-pub-selmask",function(){
			if ($(e.target).hasClass("J-pub-selmask")){
				$(".J-pub-selmask,.J-pub-sellist").hide();
			}
		}).on("touchend",".J-pub-selmask",function(e){
			e.preventDefault();	
		})

	}
}
//酒店详情页
function pinfo(){
	tabImg({
		moveCls:'.J-big-con',
		oBox:$(".J-big-box"),
		index:parseInt($(".J-pub-bigbox").attr("data-index")),
		callback:function(n){
			this.next().find("span").text(n+1);
		}
	});
	$(".J-big-con img").on("doubleTap ",function(){
		var html='<div class="m-pub-bigbox J-double-tap" style="overflow:scroll">'+
			'<img src="'+$(this).attr("src")+'" style="-webkit-transform:scale(2,2)">'+
		'</div>';
		$("body").append(html);
	})
	$("body").on("tap",".J-double-tap",function(){
		$(this).remove();
	})
	tabImg({
		moveCls:'.J-pinfo-topcon',
		oBox:$(".J-pinfo-top"),
		callback:function(n){
			this.find(".m-pinfo-tnum").find("span").text(n+1)
		}
	});
	tabImg({
		moveCls:'.J-pinfo-democon',
		oBox:$(".J-pinfo-demobox"),
		callback:function(n){
			this.find(".m-pinfo-tnum").find("span").text(n+1);
		}
	});
	$(".J-pinfo-title").on("tap",function(){
		if ($(this).hasClass("m-pinfo-titledown")){
			$(this).removeClass("m-pinfo-titledown").next().css("height","0");
		}else{
			$(this).addClass("m-pinfo-titledown").next().css("height","auto");
		}
	});
	/*
	$(".J-pinfo-top").on("tap",function(){
		bigImage($(this));
	})
	$(".J-pinfo-demobox").on("tap",function(){
		bigImage($(this));
	})
	$(".J-check-allImg").on("tap",function(){
		bigImage($(this).parent().prev());
	})*/
	$(document).on("tap",".J-pub-bigbox",function(e){
		setTimeout(function(){
			if ($(e.target).hasClass("J-pub-bigbox")||$(e.target).hasClass("J-pub-bigclose") || $(e.target).hasClass("m-pinfo-tnum")){
				history.go(-1);
				$(this).remove();
				$("body").off("touchmove");
			}
		},380);		
	});
	if ($(".J-info-btnbox").length>0){
		$("body").on("touchstart",function(){
			$(".J-info-btnbox").show();
		})
	}
}
function data(){
	if ($(".J-data-yearsel").length>0){
		$("body").height(Math.max($(window).height(),$("body").height()));
		var yBox=$(".J-data-yearsel"),
			  mBox=$(".J-data-monthsel"),
			  oYear=$(".J-data-year"),
			  oMonth=$(".J-data-month"),
			  oDay=$(".J-data-day"),
			  oWeek=$(".J-date-week"),
			  bodyBox=$(".J-data-tbody"),
			  year=oYear.text(),
			  month=parseInt(oMonth.text()),
			  day=oDay.text();
		//datepublic(year,month,new Date().getDate());
		$(document).on("tap",function(e){
			if (!$(e.target).parent().hasClass("J-data-monthsel")){
				if (!$(e.target).hasClass("m-data-monthabs") || $(e.target)[0].tagName!="LI"){
					$(".m-data-monthabs").hide();
				}
			}
			if (!$(e.target).parent().hasClass("J-data-yearsel")){
				if (!$(e.target).hasClass("m-data-yearabs") || $(e.target)[0].tagName!="LI"){
					$(".m-data-yearabs").hide();
				}
			}
		})
		yBox.on("tap",function(){
			$(this).children().eq(1).show();
		}).on("tap","li",function(){
			$(this).addClass("z-on").siblings().removeClass("z-on");
			year=$(this).text();
			oYear.text(year);
			yBox.children().eq(0).text(year).next().hide();
			datepublic(year,month,day)
		});
		mBox.on("tap",function(){
			$(this).children().eq(1).show();
		}).on("tap","li",function(){
			if (!$(this).hasClass("noclick")){
				$(this).addClass("z-on").siblings().removeClass("z-on");
				month=parseInt($(this).text());
				oMonth.text(month);
				day=$(".today").text();
				datepublic(year,month,day)
				mBox.children().eq(0).text(month+"月").next().hide();
			}
		});
		bodyBox.on("tap","span",function(){
			if (!$(this).hasClass("noclick")){
				$(this).addClass("today").siblings().removeClass("today");
				day=$(this).text();
				oDay.text(day);
				/*modify by  yuhaiqiang start*/
				var date = new Date(year,month-1,day),
					weekArr=["周日","周一","周二","周三","周四","周五","周六"];				
				oWeek.text(weekArr[date.getDay()]);
				//判断今天
				nowTime = new Date();
				nowD=nowTime.getDate();
				if (parseInt(day) == nowD){
					$(".J-data-icon").show();	
				}else{
					$(".J-data-icon").hide();
				}
				/*modify by  yuhaiqiang end*/
				if ($(this).hasClass("z-on")){
					$(".m-data-do").show();
				}else{
					$(".m-data-do").hide();
				}
			}
		});
		
		$(".J-date-selbtn_2").on("tap",function(){
			window.location="/Laohuangli/yijiehun"+'-'+year+'-'+month+'-'+day+'.html';

		})
		//弹窗(暂时不用了)
		$(".J-date-selbtn").on("tap",function(){
			$.getJSON("/Laohuangli/jiridesc",{year:year,month:month,day:day,r:Math.random()}, function(data){
				 yi=data.yi;
				 ji=data.ji;
				var html='<div class="m-date-alert J-date-alert">'
								+'<div class="m-dateal-box"> '
									+'<div class="J-dateal-close" style="width: 100px;"><div class="m-dateal-close "></div></div>'
									+'<div class="m-dateal-top">'
										+'<div class="m-dateal-title J-dateal-title">'+year+'年'+month+'月'+day+'号</div>'
										+'<div class="m-jiri-title">宜：'+yi+'</div>'
										+'<div class="m-jiri-title">忌：'+ji+'</div>'
									+'</div>'
									+'<div class="m-dateal-mid">'
										+'<div>因场地档期实时变化，请留下联系方式<br/>婚礼管家帮您查询档期情况</div>'
										+'<div class="fix m-dateal-iptbox">'
											+'<input type="tel" placeholder="输入手机号" class="J-date-phone"/>'
										+'</div>'
										+'<div class="m-dateal-btnbox">'
											+'<a href="javascript:;" class="J-date-submit">确定</a>'
										+'</div>'
									+'</div>'
								+'</div>'
							+'</div>',
				dateAlert=$(".J-date-alert"),
				oYear=$(".J-data-year").text(),
				oMonth=parseInt($(".J-data-month").text()-1),
				oDay=$(".J-data-day").text(),
				now=new Date();
				nowD=new Date(now.getFullYear(),now.getMonth(),now.getDate());
				userChange=new Date(oYear,oMonth,oDay)
				if (+nowD<=+userChange){
					//if (dateAlert.length>0){
						//dateAlert.show();
						$(".J-dateal-title").text(year+'年'+month+'月'+day+'号');
					//}else{
						
						$(".J-date-alert").remove();
						$("body").append(html);
						dateAlert=$(".J-date-alert");
					//}
				}else{
					$(".J-date-box").addClass("m-data-animate");
					
				}
			});
			
		});
		//关闭弹窗
		$(document).on("tap", ".J-dateal-close",function() {
				$(this).parents(".J-date-alert").hide();
			}).on("tap", ".J-date-submit",function() {
				var phone = $(".J-date-phone").val(),
				daterror = $(".J-city-daterror"),
				//reg = /^0?1[3|4|5|8][0-9]\d{8}$/,
				reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/,
				phonerror = $(".J-city-daterror"),
				phonhtml = '<div class="m-city-errorbox J-city-phonerror">' + '<div class="m-submit-error">' + '<div class="m-error-con">亲，号码出错啦！</div>' + '<div class="fix">' + '<a href="javascript:;" class="J-error-btn">确定</a>	' + '</div>' + '</div>' + '</div>',
				righthtml = '<div class="m-set-box J-right-box"><div class="m-right-con">提交成功</div></div>';;
				if (phone == '' || !reg.test(phone)) {
					if (phonerror.length > 0) {
						phonerror.show();
					} else {
						$("body").append(phonhtml);
						phonerror = $(".J-city-daterror")
					}
				} else {
					$("body").append(righthtml);
					$(".J-form-sch").submit();
					setTimeout(function() {
						window.location = "/"
					},
					2000);
				}
			}).on("tap", ".J-error-btn",function() {
				$(this).parent().parent().parent().hide();
			}).on("tap", ".J-right-box",function() {
				window.location = "/"
			})
		
		function datepublic(year,month,day){
			var date= new Date(year,month-1,"01"),
				  date1=new Date(year,month,0),
				  date2=new Date(year,month-1,day),
				  date3=new Date(),
				  nowY=date3.getFullYear(),
				  nowM=date3.getMonth(),
				  nowD=date3.getDate(),
				  date4=new Date(nowY,nowM,nowD),
				  week=date.getDay(),//每月一号是星期几
				  dayweek=date2.getDay(),//当前是星期几
				  weekArr=["周日","周一","周二","周三","周四","周五","周六"],
				  daynum=parseInt(date1.getDate()),//获取天数
				  i=0,j=1,k=0,l=0,
				  bodyHtml='',oSpan=bodyBox.children();
			if (parseInt(year)==nowY){
				for (var y=0;y<nowM ;y++){
					$(".J-data-monthsel li").eq(y).addClass("noclick");
				}
			}else{
				$(".J-data-monthsel li").removeClass("noclick");
			}
			//判断今天
			if (parseInt(day) == nowD){
				$(".J-data-icon").show();	
			}else{
				$(".J-data-icon").hide();
			}
			if ((+date4)==(+date2)){
				$(".J-data-icon").show();
			}else{
				$(".J-data-icon").hide();
			}
			for (i=0;i<week;i++){
				bodyHtml+="<span>&nbsp;</span>";
			}
			for (j=1;j<=daynum;j++){
				if (j==parseInt(day)){
					bodyHtml+='<span class="today">'+(j<10?("0"+j):j)+'</span>';
				}else{
					bodyHtml+='<span>'+(j<10?("0"+j):j)+'</span>';
				}
			}
			bodyBox.html(bodyHtml);
			oSpan=bodyBox.children();
			$(".J-date-week").text(weekArr[dayweek]);

			$.getJSON("/Laohuangli/jiri",{year:year,month:month}, function(json){
				arr=json[year][month];
				for (k=0;k<arr.length;k++){
					for (l=0;l<oSpan.length;l++){
						if (parseInt(arr[k])==parseInt(oSpan.eq(l).text())){
							oSpan.eq(l).addClass("z-on");
						}
					}
				}
			});
			bodyHtml='';
			if (parseInt(year)==nowY&&parseInt(month)-1==nowM){
				for (var m=0;m<nowD-1 ; m++){
					oSpan.eq(m).addClass("noclick");
				}
			}else if (parseInt(year)<nowY||(parseInt(year)==nowY&&parseInt(month)-1<nowM)){
				daynum=new Date(year,month-1,0).getDate();
				for (var m=0;m<oSpan.length ; m++){
					oSpan.eq(m).addClass("noclick");
				}
			}
			//此处需要判断是否是宜婚嫁
		}
	}
}
//吉日ajax
function datejiriajax(year,month){
	var jiridata = null;
	$.getJSON("/Laohuangli/jiri",{year:year,month:month}, function(data){
		jiridata  = data;
	
	});
	return jiridata;
}
function setMessage(){
	$(".J-set-message").on("tap",function(){
		var insert='<div class="m-set-box J-set-box">'
		+'<div class="m-set-con">'
		+'<div class="fix">'
		+'<input type="tel"  placeholder="输入手机号" class="J-insert-input"/>'
		+'</div>'
		+'<div class="fix">'
		+'<a href="javascript:;" class="J-inset-btn">确定</a>'
		+'</div>'
		+'</div>'
		+'</div>',
		  iBox=$(".J-set-box");
		if (iBox.length>0){
			iBox.show();
			$(".J-insert-input").val("");
		}else{
			$("body").append(insert);
			 iBox=$(".J-set-box");
		}
	});
	$("body").on("tap",".J-inset-btn",function(){
		//var reg = /^0?1[3|4|5|8][0-9]\d{4,8}$/,
		var reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/,
		  phonerror=$(".J-insert-phonerror"),
		  phonhtml='<div class="m-city-errorbox J-insert-phonerror">'
		+'<div class="m-submit-error">'
		+'<div class="m-error-con">亲，号码出错啦！</div>'
		+'<div class="fix">'
		+'<a href="javascript:;" class="J-error-btn">确定</a>	'
		+'</div>'
		+'</div>'
		+'</div>',
		righthtml='<div class="m-set-box J-right-box"><div class="m-right-con">提交成功</div></div>'
			phone=$(".J-insert-input").val(),
			hid = $(".J-set-message").attr("propt"),
		rBox=$(".J-right-box");
		if (phone==''||!reg.test(phone)){
			if (phonerror.length>0){
				phonerror.show();
			}else{
			$("body").append(phonhtml);
				phonerror=$(".J-city-daterror");
			}
		}else{
			$(".J-set-box").hide();
			$("body").append(righthtml);
			//发送短信
			$.getJSON("/Jiudian/sendmsg",{tel:phone,hid:hid},
			function(data){
			
			
			})
			setTimeout(function(){
			//window.location="http://www.baidu.com"
				$(".J-right-box").hide();
			},3000);
			
		}
	}).on("tap", ".J-error-btn",function() {
		$(this).parent().parent().parent().hide();
	}).on("tap", ".J-right-box",function() {
		//window.location = "/"
		$(".J-right-box").hide();
	}).on("touchend",".J-error-btn",function(e){
		e.preventDefault();
	})

	$("body").on("tap",".J-set-box",function(e){
		if ($(e.target).hasClass("J-set-box")){
			$(".J-set-box").hide();
		}
	})
	$("body").on("tap",".J-insert-phonerror",function(e){
		if ($(e.target).hasClass("J-insert-phonerror")){
			$(".J-insert-phonerror").hide();
		}
	})			
}
function selectpage(){
	if ($(".J-sel-selbox").length>0){
		$(".J-sel-selbox div").on("tap",function(){
			$(this).addClass("z-on").siblings().removeClass("z-on");
			var value = $(this).attr('v');
			$(this).parent('div').attr('propt',value)
			/*
			$('.J-href-sel a').each(function(){
				var href = $(this).attr('href');
				if(href != '' || href !=' javascript:;'){
					href += '/'+key+'/'+value;
					$(this).attr('href',href);
					//alert(href);
				}
			});
			*/


		});
		$(".J-select-btn").on("tap",function(){
			alert("提交")
		})
	}
}
//HTML5 地理位置定位
function locGeolocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(locationSuccess, locationError,{
			// 指示浏览器获取高精度的位置，默认为false
			enableHighAcuracy: true,
			// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
			//timeout: 5000,
			// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
			maximumAge: 3000
		});
	}else{
		alert("你的浏览器不支持获取地理位置信息,请手动选择。");
	}

}
//获取位置信息成功的回调函数
function locationSuccess(){
	var x = position.coords.latitude;
	var y = position.coords.longitude;
	SetCookie2('USER_POSITION',x+'-'+y);
}
/*
locationSuccess: function(position){
	 
}*/
//获取位置信息失败的回调函数
function locationError(error){
    switch(error.code) {
        case error.TIMEOUT:
          //  alert("A timeout occured! Please try again!");
            break;
        case error.POSITION_UNAVAILABLE:
           // alert('We can\'t detect your location. Sorry!');
            break;
        case error.PERMISSION_DENIED:
           // alert('Please allow geolocation access for this to work.');
            break;
        case error.UNKNOWN_ERROR:
            //alert('An unknown error occured!');
            break;
    }
}
//设置cookie
function SetCookie2(name,value){//两个参数，一个是cookie的名子，一个是值{
	//var Days = 1,  
    exp = new Date(); 
	day_time = new Date(exp+86400000-(exp.getHours()*60*60+exp.getMinutes()*60+exp.getSeconds())*1000);

    exp.setTime(exp.getTime() + exp);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
}
//万能返回键
function return_prepage()
{
	if(window.document.referrer==""||window.document.referrer==window.location.href)
	{
		//window.location.href="{dede:type}[field:typelink /]{/dede:type}";
	}else
	{
		window.location.href=window.document.referrer;
	}

}
//城市
function scroll(){
	var oBox=$(".J-city-midright"),
			 even        = {
				star:0,
				end:0,
				starY:0,
				endY:0,
				move:0,
				moveY:0
			},
			i=0,
			oList=$(".J-city-box"),
			arr=[];
	for (var j=0;j<oList.length;j++){
		arr.push(oList.eq(j).offset().top);
	}

	for (var i=0;i<oBox.length;i++){
		oBox[i].addEventListener('touchstart', eventDown);
		oBox[i].addEventListener('touchend', eventUp);
		oBox[i].addEventListener('touchmove', eventMove);
		oBox[i].addEventListener('mousedown', eventDown);
		oBox[i].addEventListener('mouseup', eventUp);
		oBox[i].addEventListener('mousemove', eventMove);
		oBox[i].addEventListener("webkitTransitionEnd", function(){ //动画结束时事件
			animated=true;
		}, false);
	}
	//touchstart
	function eventDown(e){
		//e.preventDefault();
		mousedown=true;
		e.changedTouches ? (even.star = e.changedTouches[0].clientX) : (even.star = e.pageX);
		e.changedTouches ? (even.starY = e.changedTouches[0].clientY) : (even.starY = e.pageY);
	}
	//touchmove
	function eventMove(e){
		e.changedTouches ? (even.move = e.changedTouches[0].clientX) : (even.move = e.pageX);
		e.changedTouches ? (even.moveY = e.changedTouches[0].clientY) : (even.moveY = e.pageY);
		if(mousedown){
			e.preventDefault();
			i=Math.floor((even.moveY-354)/34);
			$("body,html").scrollTop(arr[i]);
		}
	}
	function eventUp(e){
		if(mousedown){
			//e.preventDefault();
			mousedown = false;
			e.changedTouches ? (even.end = e.changedTouches[0].clientX) : (even.end = e.pageX);
			e.changedTouches ? (even.endY = e.changedTouches[0].clientY) : (even.endY = e.pageY);
			
		}
	}
}

//热门城市
$(document).on("tap",".J-city-hotbox",function(e){
	$(e.target).addClass("m-city-afoc").siblings().removeClass("m-city-afoc");
	$("#J-city-insert").val($(e.target).text());
	//$(".J-pub-sellist").show().find("li").removeClass("m-select-on").eq(index).addClass("m-select-on");
});
//酒店列表滚动加载
/*
var J_jiudain_page = 2;//第二页开始
 function publist() {
    var range = 50; //距下边界长度/单位px
    var maxnum = 4; //设置加载最多次数
    var num = 1;
    var totalheight = 0;
    var html = '';
    var bh = $("body").height();
    var list = $(".J-pub-list");
    $(window).scroll(function() {
        var srollPos = $(window).scrollTop();
        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
        //document.title = ($("body").height() - range) + "||" + totalheight + "||" + num + "||" + maxnum;
        if ((bh - range) < totalheight && !list.hasClass("add")) {
            list.addClass("add");
			$.get("/Jiudian/index", {ajax: 1,page:J_jiudain_page }, function(json){
			   list.append(json).removeClass("add");
			   //num++;

			});
			J_jiudain_page++;
            //走ajax  下面这段用ajax包起来
			/*
            var len = 3,
            //条数
			
            link = ['http://www.baidu.com', 'http://www.baidu.com', 'http://www.baidu.com'],
            money = [100, 100, 100],
            imgsrc1 = ["images/pub-demo1.jpg", "images/pub-demo1.jpg", "images/pub-demo1.jpg"],
            imgsrc2 = ["images/pub-demo1.jpg", "images/pub-demo1.jpg", "images/pub-demo1.jpg"],
            imgsrc3 = ["images/pub-demo1.jpg", "images/pub-demo1.jpg", "images/pub-demo1.jpg"],
            phone = ["110", "110", "110"],
            name = ['希尔顿酒店', '希尔顿酒店', '希尔顿酒店'],
            lovenum = [1000, 12, 100],
            kind = ['五星级酒店2', '五星级酒店2', '五星级酒店2'],
            address1 = ['朝阳区1', '朝阳区1', '朝阳区11'],
            address2 = ['百子湾', '国贸', '大望路'],
            distance = ["<4km", "<5km", '<6km'];
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    html += '<li>' + '<a href="' + link[i] + '">' + '<div class="m-pub-top J-pub-listbox">' + '<span class="m-pub-money">&yen;' + money[i] + '</span>' + '<em class="m-pub-rebate"></em>' + '<div class="m-pub-topcon J-pub-listcon">' + '<ul class="m-pub-toplist">' + '<li>' + '<img src="' + imgsrc1[i] + '"/>' + '</li>' + '<li>' + '<img src="' + imgsrc2[i] + '"/>' + '</li>' + '<li>' + '<i class="m-pub-listmask J-pub-listmask"></i>' + '<a href="tel:' + phone[i] + '" class="m-pub-call J-pub-call" >召唤婚礼管家,详细了解该酒店</a>' + '<img  src="' + imgsrc3[i] + '""/>' + '</li>' + '</ul>' + '</div>' + '</div>' + '<div class="m-pub-listinfo">' + '<div class="m-pub-nameb fix">' + '<span class="f_l">' + name[i] + '</span>' + '<span class="m-pub-love">' + lovenum[i] + '</span>' + '</div>' + '<div class="fix">' + '<span class="f_l">' + kind[i] + '</span>' + '<span class="m-pub-listaddress">' + address1[i] + '</span>' + '<span class="m-pub-listaddress">' + address2[i] + '</span>' + '<span class="f_r">' + distance[i] + '</span>' + '</div>' + '</div>' + '</a>' + '</li>';
                }
                list.append(html).removeClass("add"); num++;
                //以上用ajax包起来
            } else {
                alert("没有更多了")
            }
			

        }
    });
}
*/

