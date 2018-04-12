$(document).ready(function(){
    var session = 25;       //??�O�q?�u�@??�A�Φb?�m���I?�ܪ��A?���H��???��A�B�W?60�]�O��?
    var breaklength = 5;            //?�mbreak??�X�X��??,??�Psession
    var flag = 1;           //?�m�u�@??�A1�O�u�@��?���A2�O���b�𮧪�?���A3�O�b�u�@���A4�O�𮧤�
    var sec = session*60;   //��????�Ƥ���??�A?��?��
    var percent = 0;    //??�I��?��?�ܪ����סA0-100�A�O�ʤ���

    $("#break-minus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;         //�p�G�D?��??�A???��
        }
        breaklength--;
        if(breaklength < 1){
            breaklength = 1;
        }
        $("#break-length").html(breaklength);
        if(flag === 2){
            //�p�G�O�𮧪�?���A�@����F�A�N�S?sec?�ͤF�ק�
            sec = breaklength*60;
        }
        showHMS(breaklength,2);
    });
    $("#break-plus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;         //�p�G�D?��??�A???��
        }
        breaklength++;
        $("#break-length").html(breaklength);
        if(flag === 2){
            //�p�G�O�𮧪�?���A�@����F�A�N�S?sec?�ͤF�ק�
            sec = breaklength*60;
        }
        showHMS(breaklength,2);
    });
    $("#session-minus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;         //�p�G�D?��??�A???��
        }
        session--;
        if(session < 1){
            session = 1;
        }
        $("#session-length").html(session);
        if(flag === 1){
            //�p�G�O�u�@��?���A�@����F�A�N�S?sec?�ͤF�ק�
            sec = session*60;
        }
        showHMS(session,1);
    });
    $("#session-plus").on("click",function(){
        if(flag !== 1 && flag !== 2){
            return;         //�p�G�D?��??�A???��
        }
        session++;
        $("#session-length").html(session);
        if(flag === 1){
            //�p�G�O�u�@��?���A�@����F�A�N�S?sec?�ͤF�ק�
            sec = session*60;
        }
        showHMS(session,1);
    });

    //�b??�W?��?����A?????�A�@?�O��?�A�@?�O??�C
    //�p�G�b�u�@��?�����A�ק�𮧪�??�A����???�W��?�ܡAstate��??���ȡA��1?��ܭק�u�@??�A��2��ܭק��??
    var showHMS = function(min,state){
        if(state  !== flag){
            return;         //�p�G���O�b??��?��??�A�N����???�W?�ܪ���
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




    //?�l�Z??��?��,??�O�ѤU����?
    function timeChange(){
        var temp = sec;
        if(flag === 1 || flag === 2){
            //�p�G�O?�����A�N��???
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
            //�u�@��
            $("#per").css('background-color','#b5caa0');
            if(sec === 0){
                percent = 100;
            }else{
                percent = (session*60-sec)/session/60*100;
            }
            $("#per").css('height',percent+'%');
        }
        if(flag === 4){
            //�𮧤�
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



    //????�ƥ�X�X?�l�O?����??�A��?�l�Z??��?��
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