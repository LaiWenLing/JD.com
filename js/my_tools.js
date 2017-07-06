function getStyle(obj,styleName){
    var value=obj.currentStyle ? obj.currentStyle[styleName] : getComputedStyle(obj,false)[styleName];
    return parseInt(value);
}

function move(obj,modeJson,fn,speed){
    var def_speed={                //预定义时间
        veryslow:3000,
        slow:1500,
        normal:800,
        fast:600,
        veryfast:400
    };
    //时间判断
    if(speed){
        if(typeof speed=="string"){
            speed=def_speed[speed];        //读取对象属性
        }
    }else{
        speed=def_speed.normal;
    }
    //modeJson{"left":500,"width":500}
    var start={};                //起始
    var dis={};                //距离
    for(var key in modeJson){
        start[key]=getStyle(obj,key);          //分别获取起始值
        dis[key]=modeJson[key]-start[key];
    }

    var count=parseInt(speed/30);     //时间分段
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        var a=1-n/count;
        for (var key in modeJson){
            var dis_step=start[key]+dis[key]*(1-a*a*a);       //缓动分段
            if(key=="opacity"){
                obj.style[key]=dis_step;
                obj.style.filter="+alpha(opacity=dis_step)+";    //兼容IE
            }else{
                obj.style[key]=dis_step+"px";
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            fn && fn();
        }
    },30)
}




