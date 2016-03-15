/**
 * Created by dfleuren on 24.02.2016.
 */
"use strict";

var mute = document.getElementById("mute");
var lala = document.getElementById("sound");
var anleitung = document.getElementById("anleitung");
var hilfe = document.getElementById("hilfe");
var credits = document.getElementById("credits");
var titlecontent = document.getElementById("titlecontent");
var gamecontainer = document.getElementById("gamecontainer");




/* Pausiert die Hintergrundmusik der Webseite und wechselt das Button-Logo*/
function pausieren() {
    if (lala.paused) {
        lala.play();
        mute.src = "images/unmute.png";
    }
    else {
        lala.pause();
        mute.src = "images/mute.png";
    }
}

/* Schaltet eine versteckte Funktion frei*/
function egg() {
    document.getElementById("flurry").style.display = "block";
    document.getElementById("flurry").style.backgroundColor = "none";
    document.getElementById("egg").style.display = "none";
    setTimeout(function () {
        document.getElementById("flurry").style.display = "none"
    }, 14500)
}

/* Die Seite wir neu geladen*/
function reset(){
location.reload();
}

/* Alles was im Center aktiv ist wird deaktiviert und der Spielstartbutton wird angezeigt*/
function play() {
    if((credits.style.display == "block" )|
        (hilfe.style.display == "block")|
        (anleitung.style.display == "block")){

        credits.style.display = "none";
        hilfe.style.display = "none";
        anleitung.style.display = "none";
    }
    titlecontent.style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("sound").pause();
}

/* Design-Auswahl wird angezeigt*/
function game() {
    document.getElementById("staart").style.display = "none";
    document.getElementById("arcade").style.display = "block";
    setTimeout(function () {
        document.getElementById("design").style.display = "block";
    }, 600)
    document.getElementById("fx").play();
}

function anzeigenA() {
    if(anleitung.style.display == "block"){
        anleitung.style.display = "none";
    }else{
    titlecontent.style.display = "none";
    credits.style.display = "none";
    hilfe.style.display = "none";
    anleitung.style.display = "block";}
}
function anzeigenC() {
    if(credits.style.display == "block"){
        credits.style.display = "none";
    }else{
    titlecontent.style.display = "none";
    anleitung.style.display = "none";
    hilfe.style.display = "none";
    credits.style.display = "block";}
}

function anzeigenH() {
    if(hilfe.style.display == "block"){
        hilfe.style.display = "none";
    }else{
    titlecontent.style.display = "none";
    anleitung.style.display = "none";
    credits.style.display = "none";
    hilfe.style.display = "block";}
}

/* Spielfeld*/
function space(){
    document.getElementById("arcade").style.animation = "flyOut 1s";
    document.getElementById("design").style.display = "none";
    gamecontainer.style.display = "block";
    setTimeout(function(){
        document.getElementById("arcade").style.display = "none"
    }, 1000)


}