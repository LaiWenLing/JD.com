/**
 * Created by hxsd on 2017/1/20.
 */

$(function(){
    //京东菜单
    (function popupContent(){
        var $aLi=$("#wrap .nav-ul").find("li");
        var $Popup=$("#wrap .popup");
        var leave_menu;
        $aLi.removeClass("ac");
        $aLi.each(function(index){
            $(this).on("mouseenter",function(){
                clearTimeout(leave_menu);
                $(this).addClass("ac").siblings().removeClass("ac");
                $Popup.show();
                $Popup.children().eq(index).show().siblings().hide();
            });
            $(this).on("mouseleave",function(){
                clearTimeout(leave_menu);
                leave_menu=setTimeout(function(){
                    $Popup.hide();
                    $aLi.removeClass("ac");
                },200)
            });
            $Popup.hover(function(){
                clearTimeout(leave_menu);
            },function(){
                clearTimeout(leave_menu);
                $aLi.removeClass("ac");
                $(this).hide();
            })
        })
    })();


    //轮播图
    //首页大图轮播
    Nj_widget.slide("#page-first-banner",true,true,false,4000);
    Nj_widget.slide("#Aa",true,false,true,3000);
    Nj_widget.slide("#Ba",true,false,true,3000);
    Nj_widget.slide("#Ca",true,false,true,3000);
    Nj_widget.slide("#Da",true,false,true,3000);
    Nj_widget.slide("#Ea",true,false,true,3000);
    Nj_widget.slide("#Fa",true,false,true,3000);
    Nj_widget.slide("#Ga",true,false,true,3000);
    Nj_widget.slide("#Ha",true,false,true,3000);
    Nj_widget.slide("#Ia",true,false,true,3000);

    //各楼层选项卡
    tab("#floor1");
    tab("#floor2");
    tab("#floor3");
    tab("#floor4");
    tab("#floor5");
    tab("#floor6");
    tab("#floor7");
    tab("#floor8");
    tab("#floor9");
    tab("#floor10");
    tab("#floor11");
    tab("#floor12");

    function tab(id){
        var oFloor=$(id);
        var oNav=oFloor.find(".floor_nav");
        var aNavLi=oNav.children();
        var aItem=oFloor.find(".main");

        aNavLi.each(function(index){
            $(this).on("mouseenter",function(){
                $(this).addClass("ac").siblings().removeClass("ac");
                aItem.eq(index).show().siblings().hide();
            })
        })
    }

    //页面平滑滚动
    (function LocationFloor(){
        var LocationFloor=$("#Location_Floor");
        var floorList=LocationFloor.find("ul");
        var aLi=floorList.children();
        var aFloor=$(".floor");

        //窗口滚动事件
        $(window).on("scroll",function(){
            //浏览器窗口滚动距离大于1300时显示，小于1300时隐藏
            if($(window).scrollTop()>1300){
                LocationFloor.show();
            }else{
                LocationFloor.hide();
            }

            aFloor.each(function(index){
                //如果当前楼层的上偏移小于窗口滚动距离加350，则与楼层对应的按钮class设为ac
                if($(this).offset().top < $(window).scrollTop()+350){
                    aLi.eq(index).addClass("ac").siblings().removeClass("ac");
                }
            })

        });

        //给所有按钮绑定事件处理函数
        aLi.each(function(index){
            $(this).on("click",function(){
                //当前按钮class为ac，其他按钮删除“ac”class
                $(this).addClass("ac").siblings().removeClass("ac");
                //浏览器滚动距离为与按钮对应的楼层的上偏移
                $("html,body").animate({scrollTop:aFloor.eq(index).offset().top},800);
            });
        });
    })();

    //首页右侧话费充值面板
    (function RechargeService(){
        var oNews=$("#news_icon");
        var oNewsList=$("#news_icon > ul");
        var aNewLi=oNewsList.find(".item");
        var rechargeList=oNews.find("#iframe-list");
        var aRecharge=rechargeList.find(".iframe-recharge");
        var CloseBtn=rechargeList.find(".close");
        var timer1;
        var onOff=true;

        aNewLi.each(function(index){
            $(this).on("mouseenter",function(){
                aRecharge.eq(index).show().siblings().hide().last().show();
                $("#news-icon > #iframe-list").show();
                timer1=setTimeout(function(){
                    if(onOff){
                        aNewLi.children(0).animate({"marginTop":-38});
                        onOff=false;
                    }
                    rechargeList.animate({"top":25}).show();
                },200);
                $(this).children(0).addClass("ac").parent().siblings().children(0).removeClass("ac");
            });
            $(this).on("mouseleave",function(){
                clearTimeout(timer1);
            })
        });
        CloseBtn.on("click",function(){
            clearTimeout(timer1);
            aNewLi.children(0).animate({"marginTop":0});
            aNewLi.children(0).removeClass("ac");
            rechargeList.animate({"top":210}).hide().children().hide();
            onOff=true;
        })

    })()
});


var Nj_widget= {
    //轮播图
    "slide":function(id,autoplay,shownum,around,speed){
        var oSlide=$(id);
        var oUl=oSlide.find("ul");
        var aImg=oUl.find("li");
        var oOl=oSlide.find("ol");
        var currentPicIndex=0;
        var timer;
        var picLength=aImg.length;
        var delay=0;

        //获取图片宽度
        var li_w=aImg.eq(0).width();
        //第一张图片显示
        aImg.first().show().siblings().hide();

        //生成与图片数量对应的按钮
        var btnContent="";
        aImg.each(function(index){
            btnContent+="<li></li>";
        });
        //将按钮插入到oOl
        oOl.html(btnContent).children().first().removeClass().addClass("ac").siblings().removeClass();
        //判断按钮是否插入数字
        oOl.children().each(function(index) {
            if (shownum) {
                $(this).text(index + 1)
            } else {
                $(this).text("")
            }
        });

        //点击按钮切换图片
        oOl.children().each(function(){
            $(this).on("click",function(ev){
                if(currentPicIndex!=$(this).index()){
                    slideBanner(currentPicIndex,$(this).index());
                    currentPicIndex=$(this).index();
                }else{
                    slideBanner(currentPicIndex-1,currentPicIndex);
                }

                $(this).removeClass().addClass("ac").siblings().removeClass();

            })
        });

        //自动轮播
        if(autoplay){
            slidePlay();
            function slidePlay(){
                timer=setInterval(Play,speed);
                function Play(){

                    currentPicIndex++;
                    if(currentPicIndex==picLength){
                        currentPicIndex=0;
                        oOl.children().eq(0).trigger("click");
                    }else{
                        oOl.children().eq(currentPicIndex).trigger("click");
                    }
                }
            }
            oSlide.hover(function(){
                clearInterval(timer);   //鼠标移入是停止播放
            },function(){
                slidePlay();            //鼠标移出时继续播放
            })
        }

        //左右按钮
        if(around){
            oSlide.find(".prebtn").on("click",function(){
                currentPicIndex--;
                if(currentPicIndex<0){
                    //currentPicIndex=picLength-1;
                    oOl.children().eq(picLength-1).trigger("click");
                }else{
                    oOl.children().eq(currentPicIndex).trigger("click");
                }
            });
            oSlide.find(".nextbtn").on("click",function(){
                currentPicIndex++;
                if(currentPicIndex==picLength){
                    currentPicIndex=0;
                    oOl.children().eq(currentPicIndex).trigger("click");
                }else{
                    oOl.children().eq(currentPicIndex).trigger("click");
                }
            });

        }

        function slideBanner(a,b){
            aImg.eq(a).show().css({"left":0,opacity:1});
            aImg.eq(b).show().css({"left":li_w,opacity:0});
            aImg.eq(a).stop().animate({left:-li_w},800);
            aImg.eq(b).stop().animate({left:0,opacity:1},800,function(){
                aImg.eq(b).siblings().stop().animate({opacity:0,left:-li_w},20);
            });
        }
    },
    
};







