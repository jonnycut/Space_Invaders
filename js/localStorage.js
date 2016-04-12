/**
 * Created by UFO on 04.2016.
 */

/**Objekt playerData
*
* @param Das Objekt beinhaltet alle notwendigen Attribute und ein Spielstand zu speichern und ggf. wiederherstellen.
*
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
    if (typeof(localStorage) !== "undefined"){
        //window.alert("Speichere Daten");
        localStorage.setItem('playerData', JSON.stringify(playerData));
    }

}

//Läd die Stringwerte aus dem localStorage vom Browser und schreibt diese in das Objekt "playerData".
function loadData() {
    if (typeof(localStorage) !== "undefined")
    playerData = JSON.parse(localStorage.getItem('playerData'));

}

//Setzt den letzten Spielstand und den Namen.
function setData() {
    if(localStorage.length!=0) {
        loadData();
        document.getElementById('name').value = playerData.name;
        document.getElementById('l1').innerHTML=playerData.live;
    }
    //if(localStorage.length>0){ //noch zu klären, ob nötig
        if(playerData.close == "true"){
            document.getElementById('name').value = playerData.name;
            gewLevel = playerData.level;
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
    playerData.level = "";
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