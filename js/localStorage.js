/**
 * Created by UFO on 04.2016.
 */


var playerData = {
    /**Objekt playerData
     *
     * @param Das Objekt beinhaltet alle notwendigen Attribute und ein Spielstand zu speichern und ggf. wiederherstellen.
     *
     */
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
    close: "false"
};


function getData() {
    /**
     * Holt sich die Spieldaten aus den HTML-Elementen und speichert sie als String in
     * den zugehörigen Attributen von PlayerData
     */


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
}


function saveData() {
    /**
     * Holt mit getData(); die aktuellen Werte und speichert
     * das PlayerData Objekt im LocalStorage (wenn der Browser dies unterstützt)
     */

    getData();
    if (typeof(localStorage) !== "undefined"){

        localStorage.setItem('playerData', JSON.stringify(playerData));
    }

}


function loadData() {
    /**
     * Lädt die Daten aus dem LocalStorage und speichert diese im Objekt PlayerData
     */
    if (typeof(localStorage) !== "undefined")
    playerData = JSON.parse(localStorage.getItem('playerData'));

}


function setData() {
    /**
     * Wenn Daten im localStorage hinterlegt sind, werden diese durch loadData() im playerData Objekt
     * gespeichert und in die entsprechenden Variablen bzw. HTML-Elemnte geschrieben.
     * "Name" und "Leben" werden immer gesetzt, die restlichen Daten nur,
     * wenn das Window in der vorherigen Sitzung geschlossen wurde
     */

    if(localStorage.length!=0) {
        loadData();
        document.getElementById('name').value = playerData.name;
        document.getElementById('l1').innerHTML=playerData.live;
    }
    //if(localStorage.length>0){ //noch zu klären, ob nötig
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
        }


   //}
    }

//Setzt alles auf Null.
function reset(){

    /**
     * Resettet alle Daten des PlayerData Objektes und schreibt
     * diese in den localStorage (sofern der Browser dies unterstützt)
     * @type {string}
     */

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
    playerData.close ="false";
    if (typeof(localStorage) !== "undefined")
        localStorage.setItem('playerData', JSON.stringify(playerData));

}