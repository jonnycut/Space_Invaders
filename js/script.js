/**
 * Created by dfleuren on 24.02.2016.
 */
"use strict";


/* Pausiert die Hintergrundmusik der Webseite und wechselt das Button-Logo*/
function pausieren() {
    var lala = document.getElementById("sound");
    if (lala.paused) {
        lala.play();
        document.getElementById("mute").src = "images/unmute.png";
    }
    else {
        lala.pause();
        document.getElementById("mute").src = "images/mute.png";
    }
}

function egg() {
    document.getElementById("flurry").style.display = "block";
    document.getElementById("flurry").style.backgroundColor = "none";
    document.getElementById("egg").style.display = "none";
    setTimeout(function () {
        document.getElementById("flurry").style.display = "none"
    }, 14500)
}


function play() {
    document.getElementById("titlecontent").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("sound").pause();
}

function game() {
    document.getElementById("start").style.display = "none";
    document.getElementById("arcade").style.display = "block";
    setTimeout(function () {
        document.getElementById("design").style.display = "block";
    }, 600)
    document.getElementById("fx").play();
}

function anzeigen() {
    if ((document.getElementById("credits").style.display = "block") || (document.getElementById("hilfe").style.display = "block")) {
        document.getElementById("titlecontent").style.display = "none";
        document.getElementById("anleitung").style.display = "block";
        document.getElementById("credits").style.display = "none";
        document.getElementById("hilfe").style.display = "none";
    }
    if ((document.getElementById("anleitung").style.display = "block") || (document.getElementById("hilfe").style.display = "block")) {
        document.getElementById("titlecontent").style.display = "none";
        document.getElementById("credits").style.display = "block";
        document.getElementById("anleitung").style.display = "none";
        document.getElementById("hilfe").style.display = "none";
    }
    if ((document.getElementById("anleitung").style.display = "block") || (document.getElementById("credits").style.display = "block")) {
        document.getElementById("titlecontent").style.display = "none";
        document.getElementById("hilfe").style.display = "block";
        document.getElementById("anleitung").style.display = "none";
        document.getElementById("credits").style.display = "none";
    }
}