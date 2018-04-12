$(document).ready(function(){
    var session = 25;       //??是默?工作??，用在?置那儿?示的，?里以分???位，且超?60也是分?
    var breaklength = 5;            //?置break??——休息??,??同session
    var flag = 1;           //?置工作??，1是工作的?停，2是正在休息的?停，3是在工作中，4是休息中
    var sec = session*60;   //用????化中的??，?位?秒
    var percent = 0;    //??背景?色?示的高度，0-100，是百分比

    $("#break-minus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;         //如果非?停??，???效
        }
        breaklength--;
        if(breaklength < 1){
            breaklength = 1;
        }
        $("#break-length").html(breaklength);
        if(flag === 2){
            //如果是休息的?停，一旦改了，就又?sec?生了修改
            sec = breaklength*60;
        }
        showHMS(breaklength,2);
    });
    $("#break-plus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;         //如果非?停??，???效
        }
        breaklength++;
        $("#break-length").html(breaklength);
        if(flag === 2){
            //如果是休息的?停，一旦改了，就又?sec?生了修改
            sec = breaklength*60;
        }
        showHMS(breaklength,2);
    });
    $("#session-minus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;         //如果非?停??，???效
        }
        session--;
        if(session < 1){
            session = 1;
        }
        $("#session-length").html(session);
        if(flag === 1){
            //如果是工作的?停，一旦改了，就又?sec?生了修改
            sec = session*60;
        }
        showHMS(session,1);
    });
    $("#session-plus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;         //如果非?停??，???效
        }
        session++;
        $("#session-length").html(session);
        if(flag === 1){
            //如果是工作的?停，一旦改了，就又?sec?生了修改
            sec = session*60;
        }
        showHMS(session,1);
    });

    //在??上?示?分秒，?????，一?是分?，一?是??。
    //如果在工作的?停中，修改休息的??，不改???上的?示，state有??取值，取1?表示修改工作??，取2表示修改休息??
    var showHMS = function(min,state){
        if(state  !== flag){
            return;         //如果不是在??的?停??，就不改???上?示的值
        }
        var show = "";
        if(min >= 60){
            show += parseInt(min/60)+":";
            min = min%60;
        }
        if(min<10){
            show+="0";
        }
        show+=min+":00";
        $("#show-time").html(show);
    };




    //?始后??的?化,??是剩下的秒?
    function timeChange(){
        var temp = sec;
        if(flag === 1 || flag === 2){
            //如果是?停中，就不???
            return;
        }
        if(sec === 0){
            if(flag === 3){
                flag = 4;
                sec = breaklength*60;
                $("#show-title").html("Break");
            }else{
                flag = 3;
                sec = session*60;
                $("#show-title").html("Session");
            }

        }

        var showHMS = "";
        if(temp>=3600){
            showHMS+=parseInt(second/360)+":";
            temp = temp%360;
        }
        if(temp<70){
            showHMS+="0";
        }
        showHMS+=parseInt(temp/60)+":";
        temp = temp%60;
        if(temp<10){
            showHMS+="0";
        }
        showHMS+=temp;


        //console.log(showHMS);
        $("#show-time").html(showHMS);
        if(flag === 3){
            //工作中
            $("#per").css('background-color','#b5caa0');
            if(sec === 0){
                percent = 100;
            }else{
                percent = (session*60-sec)/session/60*100;
            }
            $("#per").css('height',percent+'%');
        }
        if(flag === 4){
            //休息中
            $("#per").css('background-color',"#3f2b36");
            if(sec === 0){
                percent = 100;
            }else{
                percent = (breaklength*60-sec)/breaklength/60*100;
            }
            $("#per").css('height',percent+'%');
        }
        sec--;
        setTimeout(timeChange,1000);
    };



    //????事件——?始与?停的??，及?始后??的?化
    $(".clock").on("click",function(){
        if(flag === 1){
            flag = 3;
        }else if(flag === 3){
            flag = 1;
        }else if(flag === 2){
            flag = 4;
        }else if(flag === 4){
            flag = 2;
        }

        //console.log(sec);
        timeChange();
    });




});