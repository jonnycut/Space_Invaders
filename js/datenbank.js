/**
 * Created by UFO on 03.2016.
 */

function holen() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '../Datenbank/datenbank.php', true);
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
        }

    });

    xmlhttp.send();
}
function send() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '../Datenbank/datenbank.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
        }

    });
    xmlhttp.send("spieler=" + encodeURIComponent(spieler.name) +  "&score=" + encodeURIComponent(spieler.score));
}
