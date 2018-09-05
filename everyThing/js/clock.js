$(document).ready(function(){
    var session = 25;      
    var breaklength = 5;            
    var flag = 1;          
    var sec = session*60;   
    var percent = 0;
    console.log("123");   

    $("#break-minus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;        
        }
        breaklength--;
        if(breaklength < 1){
            breaklength = 1;
        }


        $("#break-length").html(breaklength);
        if(flag === 2){
            
            sec = breaklength*60;
        }
        showHMS(breaklength,2);
    });
    $("#break-plus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;        
        }
        breaklength++;
        $("#break-length").html(breaklength);
        if(flag === 2){
            
            sec = breaklength*60;
        }
        showHMS(breaklength,2);
    });
    $("#session-minus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;       
        }        session--;
        if(session < 1){
            session = 1;
        }
        $("#session-length").html(session);
        if(flag === 1){

            sec = session*60;
        }
        showHMS(session,1);
    });
    $("#session-plus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;        
        }
        session++;
        $("#session-length").html(session);
        if(flag === 1){
            
            sec = session*60;
        }
        showHMS(session,1); 
    });

    
    var showHMS = function(min,state){
        if(state  !== flag){
            return;        
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





    function timeChange(){
        var temp = sec;
        if(flag === 1 || flag === 2){
            
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
            
            $("#per").css('background-color','#b5caa0');
            if(sec === 0){
                percent = 100;
            }else{
                percent = (session*60-sec)/session/60*100;
            }
            $("#per").css('height',percent+'%');
        }
        if(flag === 4){
        
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