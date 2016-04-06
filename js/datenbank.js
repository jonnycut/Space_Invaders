/**
 * Created by UFO on 03.2016.
 */
var dbAusgabe=[];
function holen() {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '../space_Invaders/datenbank/datenbank.php', true);
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
            dbAusgabe=JSON.parse(xmlhttp.responseText);
            highscoreBauen(dbAusgabe,document.getElementById('tbody'));
        }
    });
    xmlhttp.send();
}


function send() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '../space_Invaders/datenbank/datenbank.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        }

    });
    xmlhttp.send("spieler=" + encodeURIComponent(spieler.name) +  "&score=" + encodeURIComponent(spieler.score));
}

