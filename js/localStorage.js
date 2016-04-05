/**
 * Created by UFO on 04.2016.
 */

var playerData = {
    name: "",
    level: "",
    live: "3",
    highscore: "0",
    design: "",
    alien1: "0",
    alien2: "0",
    alien3: "0",
    alien4: "0",
    alien5: "0",
    close: "false"
};


//Holt sich alle Daten aus dem Spiel und speichert diese im Objekt "playerData".
function getData() {
    playerData.name = document.getElementById('name').value;
    playerData.level = spiel.gLevel;
    playerData.live = document.getElementById('l1').innerHTML;
    playerData.highscore = document.getElementById('score').innerHTML;
    playerData.design = gewModus;
    playerData.alien1 = document.getElementById('a1').innerHTML;
    playerData.alien2 = document.getElementById('a2').innerHTML;
    playerData.alien3 = document.getElementById('a3').innerHTML;
    playerData.alien4 = document.getElementById('a4').innerHTML;
    playerData.alien5 = document.getElementById('a5').innerHTML;
}

//Speichert die im Objekt "playerData" hinterlegten Stringwerte in dem localStorage vom Browser
function saveData() {
    getData();
    if (typeof(localStorage) !== "undefined")
    localStorage.setItem('playerData', JSON.stringify(playerData))
}

//läd die Stringwerte aus dem localStorage vom Browser und schreibt diese in das Objekt "playerData".
function loadData() {
    if (typeof(localStorage) !== "undefined")
    playerData = JSON.parse(localStorage.getItem('playerData'))
}

//Setzt den letzten Spielstand
function setData() {
    loadData();
    document.getElementById('name').value = playerData.name;

    if(playerData.close === "true"){
        document.getElementById('name').value = playerData.name;
        spiel.gLevel = playerData.level;
        document.getElementById('l1').innerHTML = playerData.live;
        document.getElementById('score').innerHTML = playerData.highscore;
        gewModus = playerData.design;
        document.getElementById('a1').innerHTML = playerData.alien1;
        document.getElementById('a2').innerHTML = playerData.alien2;
        document.getElementById('a3').innerHTML = playerData.alien3;
        document.getElementById('a4').innerHTML = playerData.alien4;
        document.getElementById('a5').innerHTML = playerData.alien5;
        zustand.status = 3;
    }
}