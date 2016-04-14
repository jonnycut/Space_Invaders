/**
 * Created by UFO on 03.2016.
 */


var dbAusgabe=[];

/**
 * Holt sich die Daten aus der Datenbank, sobald die Anfrage abgeschlossen ist (readyState),
 * wird über baueHighscore(string) die HighscoreTabelle gebaut.
 * @type {XMLHttpRequest}
 */
function holen() {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '../datenbank/datenbank.php', true);
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //console.log(xmlhttp.responseText);
            dbAusgabe=JSON.parse(xmlhttp.responseText);
            highscoreBauen(dbAusgabe,document.getElementById('tbody'));
        }
    });
    xmlhttp.send();
}

/**
 * Schreibt die Werte von Spieler.name und Spieler.score in die Datenbank
 * @type {XMLHttpRequest}
 */
function send() {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '../datenbank/datenbank.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //@ToDo: OPa, warum nochmal holen??
    //funktioniert auch ohne den Quatsch.... bitte testen und bestätigen!

    /*xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            holen();
        }

    });*/
    xmlhttp.send("spieler=" + encodeURIComponent(spieler.name) +  "&score=" + encodeURIComponent(spieler.score));
}

