/**
 * Created by UFO on 04.2016.
 */


var playerData = {

    name: "",
    level: "80",
    live: "3",
    highscore: "0",
    alien1: "0",
    alien2: "0",
    alien3: "0",
    alien4: "0",
    alien5: "0"
};

function getData() {
    playerData.name = document.getElementById('name').innerHTML;
    playerData.level = spiel.gLevel;
    playerData.live = document.getElementById('l1').innerHTML;
    playerData.highscore = document.getElementById('score').innerHTML;
    playerData.alien1 = document.getElementById('a1').innerHTML;
    playerData.alien2 = document.getElementById('a2').innerHTML;
    playerData.alien3 = document.getElementById('a3').innerHTML;
    playerData.alien4 = document.getElementById('a4').innerHTML;
    playerData.alien5 = document.getElementById('a5').innerHTML;
}

function saveData() {
    if (typeof(localStorage) !== "undefined")
    localStorage.setItem('playerData', JSON.stringify(playerData))
}

function loadData() {
    if (typeof(localStorage) !== "undefined")
    playerData = JSON.parse(localStorage.getItem('playerData'))
}

function setData() {


}