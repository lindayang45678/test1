var main=document.querySelector("#main");
var oLis=document.querySelectorAll('.list>li');
var winW=window.innerWidth;
var winH=window.innerHeight;
var desW=640;
var desH=960;
main.style.webkitTransform="scale("+winH/desH+")";
[].forEach.call(oLis,function(){
    arguments[0].index=arguments[1];
    arguments[0].addEventListener("touchstart",start,false);
    arguments[0].addEventListener("touchmove",move,false);
    arguments[0].addEventListener("touchend",end,false);
});

function start(e){
    this.startY= e.changedTouches[0].pageY;
}
function move(e){
    e.preventDefault();
    var moveY=e.changedTouches[0].pageY;
    var changePos=moveY-this.startY;
    var cur=this.index;
    var step=1/2;
    var scalePos=(Math.abs(changePos)/winH)*step;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur){
            arguments[0].style.display="none";
        }
        arguments[0].className="";
        arguments[0].firstElementChild.id="";
    });
    if(changePos>0){/*向下滑*/
        var pos=-winH+changePos;
        this.nextIndex=cur==0?oLis.length-1:cur-1;
    }else if(changePos<0){/*向上滑*/
        var pos=winH+changePos;
        this.nextIndex=cur==oLis.length-1?0:cur+1;
    }
     oLis[this.nextIndex].style.display="block";
     oLis[this.nextIndex].style.webkitTransform="translate(0,"+pos+"px)";
     oLis[this.nextIndex].className="zIndex";
    oLis[cur].webkitTransform="scale("+(1-scalePos)+") translate(0,"+changePos+"px)";

}
function end(e){
    oLis[this.nextIndex].style.webkitTransform="translate(0,0)";
    oLis[this.nextIndex].style.webkitTransition="0.5s";
    oLis[this.nextIndex].addEventListener("webkitTransitionEnd",function(){
        this.style.webkitTransition="";
        this.firstElementChild.id="a"+(this.index+1);
    },false)
}