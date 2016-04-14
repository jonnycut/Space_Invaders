/**
 * Created by UFO on 04.2016.
 */

/**Objekt playerData
 * @param Das Objekt beinhaltet alle notwendigen Attribute und ein Spielstand zu speichern und ggf. wiederherstellen.
 */
var playerData = {
    name: "",
    diff: "",
    level: "1",
    live: "3",
    highscore: "0",
    design: "",
    alien1: "0",
    alien2: "0",
    alien3: "0",
    alien4: "0",
    alien5: "0",
    alienFormation:"",
    coverFormation: "",
    close: "false"
};

/**
 * Holt sich die Spieldaten aus den HTML-Elementen und speichert sie als String in
 * den zugehörigen Attributen von PlayerData
 */
function getData() {

    playerData.name = document.getElementById('name').value;
    playerData.diff = spiel.gLevel;
    playerData.level = document.getElementById('level').innerHTML;
    playerData.live = document.getElementById('l1').innerHTML;
    playerData.highscore = document.getElementById('score').innerHTML;
    playerData.design = gewModus;
    playerData.alien1 = document.getElementById('a1').innerHTML;
    playerData.alien2 = document.getElementById('a2').innerHTML;
    playerData.alien3 = document.getElementById('a3').innerHTML;
    playerData.alien4 = document.getElementById('a4').innerHTML;
    playerData.alien5 = document.getElementById('a5').innerHTML;
    playerData.alienFormation = spiel.getAlienFormationString();
    playerData.coverFormation = spiel.getCoverBelt();
}

/**
 * Holt mit getData(); die aktuellen Werte und speichert
 * das PlayerData Objekt im LocalStorage (wenn der Browser dies unterstützt)
 */
function saveData() {

    getData();
    if (typeof(localStorage) !== "undefined"){
        localStorage.setItem('playerData', JSON.stringify(playerData));
    }
}

/**
 * Lädt die Daten aus dem LocalStorage und speichert diese im Objekt PlayerData
 */
function loadData() {

    if (typeof(localStorage) !== "undefined")
    playerData = JSON.parse(localStorage.getItem('playerData'));
}

/**
 * Wenn Daten im localStorage hinterlegt sind, werden diese durch loadData() im playerData Objekt
 * gespeichert und in die entsprechenden Variablen bzw. HTML-Elemnte geschrieben.
 * "Name" und "Leben" werden immer gesetzt, die restlichen Daten nur,
 * wenn das Window in der vorherigen Sitzung geschlossen wurde
 */
function setData() {

    if(localStorage.length!=0) {
        loadData();
        document.getElementById('name').value = playerData.name;
        document.getElementById('l1').innerHTML=playerData.live;
    }
        if(playerData.close == "true"){
            document.getElementById('name').value = playerData.name;
            gewLevel = playerData.diff;
            document.getElementById('level').innerHTML = playerData.level;
            document.getElementById('l1').innerHTML = playerData.live;
            document.getElementById('score').innerHTML = playerData.highscore;
            gewModus = playerData.design;
            document.getElementById('a1').innerHTML = playerData.alien1;
            document.getElementById('a2').innerHTML = playerData.alien2;
            document.getElementById('a3').innerHTML = playerData.alien3;
            document.getElementById('a4').innerHTML = playerData.alien4;
            document.getElementById('a5').innerHTML = playerData.alien5;
            spiel.setAlienFormation(playerData.alienFormation);
            spiel.setCoverBelt(playerData.coverFormation);
        }
    }

/**
 * Resettet alle Daten des PlayerData Objektes und schreibt
 * diese in den localStorage (sofern der Browser dies unterstützt)
 * @type {string}
 */
function reset(){

    playerData.diff = "";
    playerData.level = "1";
    playerData.live = "3";
    playerData.highscore = "0";
    playerData.design = "";
    playerData.alien1 = "0";
    playerData.alien2 = "0";
    playerData.alien3 = "0";
    playerData.alien4 = "0";
    playerData.alien5 = "0";
    playerData.alienFormation = "";
    playerData.coverFormation = "";
    playerData.close ="false";

    if (typeof(localStorage) !== "undefined")
        localStorage.setItem('playerData', JSON.stringify(playerData));
}