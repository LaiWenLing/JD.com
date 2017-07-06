$(function(){
    //放大镜
    (function magnifier(){
        var picBox=$("#magnifier");
        var bigBox=picBox.find(".big-pic");
        var showImg=bigBox.find("img");
        var oSpan=bigBox.find("span");
       // var oSpan=$Span[0];
        var showBox=picBox.find(".showZoom");
        var bigImg=showBox.find("img");

        //给bigBox绑定鼠标移动事件
        bigBox.on("mousemove",function(ev){
            oSpan.show();           //显示移动框span
            showBox.show();         //显示放大镜图片

            //计算x轴和y轴的移动距离
            var x=ev.clientX-bigBox.offset().left-oSpan.width()/2;
            var y=ev.clientY+$(window).scrollTop()-bigBox.offset().top-oSpan.height()/2;

            //最大移动距离=大盒子宽度-小盒子宽度   如果大于最大移动距离则等于最大移动距离
            if(x>bigBox.width()-oSpan.width()){x=bigBox.width()-oSpan.width();}
            //如果小于0，则等于0
            if(x<0){x=0}
            if(y>bigBox.height()-oSpan.height()){y=bigBox.height()-oSpan.height();}
            if(y<0){y=0}

            //计算移动比： 移动比=当前移动距离/最大移动距离
            var rateX=x/(bigBox.width()-oSpan.width());
            var rateY=y/(bigBox.height()-oSpan.height());

            oSpan.css({"left":x,"top":y});
            //计算放大镜图片移动距离： 最大移动距离*移动比=移动距离
            bigImg.css({"left":(showBox.width()-bigImg.width())*rateX});
            bigImg.css({"top":(showBox.height()-bigImg.height())*rateY});
        });
        bigBox.on("mouseout",function(){
            oSpan.hide();
            showBox.hide();
        });


        //放大镜下小图
        (function smallPicMove(){
            var warpBox=$("#magnifier").find(".small-show");
            var smallBox=warpBox.find(".small-pic");
            var smallList=smallBox.find("ul");
            var aSmallLi=smallList.find("li");

            smallList.css("width",54*(aSmallLi.length+1));

            aSmallLi.each(function(index){
                $(this).on("mouseover",function(){
                    $(this).addClass("ac").siblings().removeClass("ac");

                    showImg.attr("src","images/"+"spec-img"+(index+1)+".jpg");
                    bigImg.attr("src","images/"+"biger"+(index+1)+".jpg");
                })
            });

            var n=0;
            var preBtn=warpBox.find(".prebtn");
            var nextBtn=warpBox.find(".nextbtn");
            preBtn.on("click",function(){
                n-=62;
                if(n<=0){n=0}
                smallList.animate({"marginLeft":n});
            });
            nextBtn.on("click",function(){
                n+=62;
                if(n>=smallList.width()-smallBox.width()){n=smallList.width()-smallBox.width();}
                smallList.animate({"marginLeft":-n});
            });

            preBtn.hover(function(){
                $(this).addClass("ac");
            },function(){
                $(this).removeClass("ac");
            });
            nextBtn.hover(function(){
                $(this).addClass("ac");
            },function(){
                $(this).removeClass("ac");
            });
        })();


    })();
    //购买方式选择
    choose("#choose_buy");
    choose("#choose_pay");
    function choose(id){
        var oChoose=$(id);
        var oChooseDd=oChoose.find("dd");
        var aChooseItem=oChooseDd.find(".item");

        aChooseItem.each(function(){
            $(this).on("click",function(){
                $(this).addClass("selecd").siblings().removeClass("selecd");
            })
        });
    }

    //购买数量选择
    (function chooseNum(){
        var oChooseCar=$("#choose_car > .choose-amount");
        var BuyNum=oChooseCar.find(".buy-num");
        var BuyBtn=oChooseCar.find(".num-btn");
        var n=1;

        BuyBtn.find(".btn-add").on("click",function(){
            n++;
            $(this).css({"cursor":"pointer"});
            BuyNum.text(n);
        });
        BuyBtn.find(".btn-reduce").on("click",function(){
            if(n==1){
                n=1;
                $(this).css({"cursor":"not-allowed"});
            }else{
                n--;
                $(this).css({"cursor":"pointer"});
                BuyNum.text(n);
            }
        });


    })();

    //推荐配件选项卡
    tab("#discount");
    function tab(id){
        var oTab=$(id);
        var oNav=oTab.find("ul");
        var aNavLi=oNav.children();
        var oOl=oTab.find("ol");
        var aItem=oOl.find("li");

        aNavLi.each(function(index){
            $(this).on("mouseenter",function(){
                $(this).addClass("ac").siblings().removeClass("ac");
                aItem.eq(index).show().siblings().hide();
            })
        })
    }


    var region=[
        {
            "province":"广东",
            "city":[
                {
                    "name":"广州",
                    "county":["白云区","天河区","越秀区","荔湾区"]
                },
                {
                    "name":"深圳",
                    "county":["福田区","罗湖区","南山区","龙岗区"]
                }
            ]
        },
        {
            "province":"浙江",
            "city":[
                {
                    "name":"杭州",
                    "county":["下城区","西湖区","拱墅区","上城区"]
                },
                {
                    "name":"嘉兴",
                    "county":["南湖区","秀洲区","嘉善区","海盐区"]
                }
            ]
        },
        {
            "province":"四川",
            "city":[
                {
                    "name":"成都",
                    "county":["锦江区","青羊区","金牛区","武侯区"]
                },
                {
                    "name":"自贡",
                    "county":["自流井区","贡井区","大安区","盐滩区"]
                }
            ]
        }
    ];

    function ass(){
        var oAddress=$("#address");
        var AddressTab=oAddress.getElementsByClassName("address-tab")[0];
        var oAera=oAddress.getElementsByClassName("address-area")[0];
        var AeraTab=oAera.getElementsByClassName("aera-tab")[0];
        var aTabSpan=AeraTab.getElementsByTagName("span");
        var oSelAdd=oAera.getElementsByClassName("select_address")[0];
        var oChoose=oAddress.getElementsByClassName("select_address")[0];
        var ProvinceList=oSelAdd.getElementsByClassName("aera-province")[0];
        var CityList=oSelAdd.getElementsByClassName("aera-city")[0];
        var TownList=oSelAdd.getElementsByClassName("area-town");
        var oCloseAdd=oAera.getElementsByClassName("address-close")[0];

        //鼠标移入显示
        oAddress.onmouseenter=function(){
            oAera.style.display="block";
        };
        //关闭按钮
        oCloseAdd.onclick=function(){
            oAera.style.display="none";
        };

        aTabSpan[0].onclick=function(){
            ProvinceList.style.display="block";
            CityList.style.display="none";
            TownList.style.display="none";
            if(ProvinceList.innerHTML==""){
                for(var i=0; i<region.length; i++){
                    proList.innerHTML+="<li>"+region[i].province+"</li>";
                }
            }
            //省份选择
            var aProvinceLi=ProvinceList.getElementsByTagName("li");
            for(var i=0; i<aProvinceLi.length; i++){
                aProvinceLi[i].index=i;
                aProvinceLi[i].onclick=function(){
                    aTabSpan[0].innerText=this.innerText;
                    ProvinceList.style.display="none";
                    CityList.style.display="block";
                    cityChoose(this.index);
                }
            }
        };
        //城市选择
        function cityChoose(city){
            cityList.innerHTML="";
            if(cityList.innerHTML==""){
                for(var i=0; i<region[city].city.length; i++){
                    cityList.innerHTML+="<li>"+region[city].city[i].name+"</li>";
                }
            }
            var aCityLi=CityList.getElementsByTagName("li");
            for(var j=0; j<aCityLi.length; j++){
                aCityLi[j].index=j;
                aCityLi[j].onclick=function(){
                    aTabSpan[1].innerText=this.innerText;
                    CityList.style.display="none";
                    TownList.style.display="block";
                    countyChoose(city,this.index);
                }
            }
        };

        //区县选择
        function countyChoose(city,town){
            TownList.innerHTML="";
            if(TownList.innerHTML=="") {
                for (var k = 0; k < address[city].city[town].county.length; k++) {
                    TownList.innerHTML += "<li>" + address[city].city[town].county[k] + "</li>";
                }
            }
            var aCountyLi=TownList.getElementsByTagName("li");
            for(var i=0; i<aCountyLi.length; i++){
                aCountyLi[i].onclick=function(){
                    aTabSpan[2].innerText=this.innerText;
                    TownList.style.display="none";
                    oChoose.style.display="none";
                    AddressTab.children[0].innerHTML = aTabSpan[0].innerText+aTabSpan[1].innerText+
                        aTabSpan[2].innerText;
                }
            }
        }

        aTabSpan[1].onclick=function(){
            ProvinceList.style.display="none";
            CityList.style.display="block";
            TownList.style.display="none";
        };
        aTabSpan[2].onclick=function(){
            ProvinceList.style.display="none";
            CityList.style.display="none";
            TownList.style.display="block";
        }

    }

    function Region(){

        var add=document.getElementById("add");
        var aBtn=add.getElementsByTagName("a");
        var oChoose=document.getElementById("choose");
        var proList=document.getElementById("chooselist-pro");
        var cityList=document.getElementById("chooselist-city");
        var conList=document.getElementById("chooselist-con");


        add.onmouseover=function(){
            oChoose.style.display="block";
        };


        aBtn[0].onclick=function(){
            proList.style.display="block";
            cityList.style.display="none";
            conList.style.display="none";
            if(proList.innerHTML==""){
                for(var i=0; i<address.length; i++){
                    proList.innerHTML+="<li>"+address[i].province+"</li>";
                }
            }
            //省份选择
            var aProLi=proList.getElementsByTagName("li");
            for(var i=0; i<aProLi.length; i++){
                aProLi[i].index=i;
                aProLi[i].onclick=function(){
                    aBtn[0].innerText=this.innerText;
                    proList.style.display="none";
                    cityList.style.display="block";
                    cityChoose(this.index);
                }
            }
        };
        //城市选择
        function cityChoose(aa){
            cityList.innerHTML="";
            if(cityList.innerHTML==""){
                for(var i=0; i<address[aa].city.length; i++){
                    cityList.innerHTML+="<li>"+address[aa].city[i].name+"</li>";
                }
            }
            var aCityLi=cityList.getElementsByTagName("li");
            for(var j=0; j<aCityLi.length; j++){
                aCityLi[j].index=j;
                aCityLi[j].onclick=function(){
                    aBtn[1].innerText=this.innerText;
                    cityList.style.display="none";
                    conList.style.display="block";
                    countyChoose(aa,this.index);
                }
            }
        };
        //区县选择
        function countyChoose(aa,bb){
            conList.innerHTML="";
            if(conList.innerHTML=="") {
                for (var k = 0; k < address[aa].city[bb].county.length; k++) {
                    conList.innerHTML += "<li>" + address[aa].city[bb].county[k] + "</li>";
                }
            }
            var aCountyLi=conList.getElementsByTagName("li");
            for(var i=0; i<aCountyLi.length; i++){
                aCountyLi[i].onclick=function(){
                    aBtn[2].innerText=this.innerText;
                    conList.style.display="none";
                    oChoose.style.display="none";
                }
            }

        }

        //区县选择
        function countyChoose(aa,bb){
            conList.innerHTML="";
            if(conList.innerHTML=="") {
                for (var k = 0; k < address[aa].city[bb].county.length; k++) {
                    conList.innerHTML += "<li>" + address[aa].city[bb].county[k] + "</li>";
                }
            }
            var aCountyLi=conList.getElementsByTagName("li");
            for(var i=0; i<aCountyLi.length; i++){
                aCountyLi[i].onclick=function(){
                    aBtn[2].innerText=this.innerText;
                    conList.style.display="none";
                    oChoose.style.display="none";
                }
            }

        }


        aBtn[1].onclick=function(){
            proList.style.display="none";
            cityList.style.display="block";
            conList.style.display="none";
        };
        aBtn[2].onclick=function(){
            proList.style.display="none";
            cityList.style.display="none";
            conList.style.display="block";
        }

    }

})







