'use strict';

function dateTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    if(m<10){
        m='0'+m
    }

    if(s<10){
        s='0'+s
    }

    today = dd+'/'+mm+'/'+yyyy+' '+h+':'+m+':'+s;
    document.getElementById('dateTime').innerHTML = today;
}
setInterval(dateTime, 1000);