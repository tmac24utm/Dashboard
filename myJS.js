'use strict';

function setHeader(){
    var userName = document.getElementById("name").value;
    header_text.textContent = userName;
}

function getDateTime(){
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date+' '+time;
    document.getElementById("test").innerHTML = dateTime;
}
