/**
 * Created by dfleuren on 24.02.2016.
 */
"use strict";


/* Pausiert die Hintergrundmusik der Webseite und wechselt das Button-Logo*/
function pausieren(){
    var lala = document.getElementById("sound");
    if(lala.paused){
        lala.play();
        document.getElementById("mute").src = "images/unmute.png";
    }
    else{
        lala.pause();
        document.getElementById("mute").src = "images/mute.png";
    }
}

function play(){
    document.getElementById("titlecontent").style.display = "none";
    document.getElementById("start").style.display = "block";
}

function game(){
    document.getElementById("start").style.display = "none";
    document.getElementById("arcade").style.display = "block";
    document.getElementById("design").style.display = "block";
}

function anzeigen(){
    document.getElementById("design").style.display = "block";
    document.getElementById("anleitung").style.display = "block";
    document.getElementById("hilfe").style.display = "block";
    document.getElementById("credits").style.display = "block";
}