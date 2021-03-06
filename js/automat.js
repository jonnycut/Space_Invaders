/**
 * Created by UFO on 03.2016.
 */
//------------------------------------------variablen-------------------------------------------------------------------
"use strict";
var spieler = {name: null, score: 0};
var zustand = {status: 0};
var gewLevel;
var gewModus;


/*-------------------------------------------functions----------------------------------------------------------------*/

/**EventListener für die Speicherung im LocalStorage
 * @param Wenn der Browser aktualisiert oder geschlossen wird,
 * wird der aktuelle Spielstand im LocalStorage gespeichert.
 */
window.addEventListener('beforeunload', function () {
    saveData();
    if (zustand.status == 4 || spieler.pause === true)
        playerData.close = "true";
    saveData();
});

/**Function für die Hintergrundmusik
 * @param Beim klicken des Buttons wird die Musik pausiert und der Button wechselt sein Design.
 * Diese Function befindet sich ausserhalb des Automaten, da diese immer nutzbar ist(zu jeder Zeit).
 */
function muten() {

    var music = document.getElementById("backgroundSound");
    if (music.paused) {
        music.play();
        mute.src = "images/unmute.png";
    }
    else {
        music.pause();
        mute.src = "images/mute.png";
    }
}

/**
 * Funktion zum Erstellen der Highscore per JS wird in HTML die Tabelle in der Index.html gebaut
 * @param array=Array welches von der Datenbank geliefert wird
 * @param ausgabe= Tabellenbody für die Ausgabe
 */
function highscoreBauen(array, ausgabe) {

    let table = '';
    for (let i = 0; i < array.length; i++) {
        table += '<tr><td>' + array[i].name + '</td><td>' + array[i].score + '</td></tr>'
    }
    ausgabe.innerHTML = table;
}

/**Function für die Link PopUps
 * @param string = ID des HTML Elementes welches gedrückt wurde
 * Beim klicken auf einem Link im Footer, wird ein PopUp angezeigt.
 * Diese Function befindet sich ausserhalb des Automaten, da diese immer nutzbar ist(zu jeder Zeit).
 */
function popupsAnzeigen(string) {

    let layout = document.getElementById('layout');
    layout.classList.add('anzeigen');
    holen();
    let popups = document.getElementsByClassName('popup');

    if (zustand.status == 1 || zustand.status == 2) {
        document.getElementById('titles').classList.remove('anzeigen');
        document.getElementById('design').classList.remove('anzeigen');
        if (string === 'close') {
            for (let i = 0; i < popups.length; i++) {
                popups[i].classList.remove('anzeigen');
                document.getElementById('design').classList.add('anzeigen');
            }
        }
        if (string === 'manual') {
            if (!document.getElementById('anleitung').classList.contains('anzeigen')) {
                document.getElementById('anleitung').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');
            } else if (document.getElementById('anleitung').classList.contains('anzeigen')) {
                document.getElementById('anleitung').classList.remove('anzeigen');
                document.getElementById('design').classList.add('anzeigen');
            }
        }
        if (string === 'help') {
            if (!document.getElementById('hilfe').classList.contains('anzeigen')) {
                document.getElementById('hilfe').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');
            } else if (document.getElementById('hilfe').classList.contains('anzeigen')) {
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('design').classList.add('anzeigen');
            }
        }
        if (string === 'dank') {
            if (!document.getElementById('credits').classList.contains('anzeigen')) {
                document.getElementById('credits').classList.add('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');
            } else if (document.getElementById('credits').classList.contains('anzeigen')) {
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('design').classList.add('anzeigen');
            }
        }
        if (string === 'highscore') {
            if (!document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
            } else if (document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.remove('anzeigen');
                document.getElementById('design').classList.add('anzeigen');
            }
        }
    }
    if (zustand.status == 3) {
        let playbutton = document.getElementById('play');
        playbutton.classList.remove('anzeigen');
        if (string === 'close') {
            for (let i = 0; i < popups.length; i++) {
                popups[i].classList.remove('anzeigen');
                playbutton.classList.add('anzeigen');
            }
        }
        if (string === 'manual') {
            if (!document.getElementById('anleitung').classList.contains('anzeigen')) {
                document.getElementById('anleitung').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');
            } else if (document.getElementById('anleitung').classList.contains('anzeigen')) {
                document.getElementById('anleitung').classList.remove('anzeigen');
                playbutton.classList.add('anzeigen');
            }
        }
        if (string === 'help') {
            if (!document.getElementById('hilfe').classList.contains('anzeigen')) {
                document.getElementById('hilfe').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');
            } else if (document.getElementById('hilfe').classList.contains('anzeigen')) {
                document.getElementById('hilfe').classList.remove('anzeigen');
                playbutton.classList.add('anzeigen');
            }
        }
        if (string === 'dank') {
            if (!document.getElementById('credits').classList.contains('anzeigen')) {
                document.getElementById('credits').classList.add('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');
            } else if (document.getElementById('credits').classList.contains('anzeigen')) {
                document.getElementById('credits').classList.remove('anzeigen');
                playbutton.classList.add('anzeigen');
            }
        }
        if (string === 'highscore') {
            if (!document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
            } else if (document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.remove('anzeigen');
                playbutton.classList.add('anzeigen');
            }
        }
    }
    if (zustand.status == 4) {
        let e = {keyCode: 80};

        pauseListener(e);

        document.getElementById('field').classList.remove('anzeigen');
        document.getElementById('points').classList.remove('anzeigen');
        document.getElementById('pause').classList.remove('anzeigen');

        if (string === 'close') {
            for (let i = 0; i < popups.length; i++) {
                popups[i].classList.remove('anzeigen');

                document.getElementById('field').classList.add('anzeigen');
                document.getElementById('points').classList.add('anzeigen');
                document.getElementById('pause').classList.add('anzeigen');
            }
        }
        if (string === 'manual') {
            if (!document.getElementById('anleitung').classList.contains('anzeigen')) {
                document.getElementById('anleitung').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');

            } else if (document.getElementById('anleitung').classList.contains('anzeigen')) {
                document.getElementById('anleitung').classList.remove('anzeigen');
                document.getElementById('field').classList.add('anzeigen');
                document.getElementById('points').classList.add('anzeigen');
                document.getElementById('pause').classList.add('anzeigen');

            }
        }
        if (string === 'help') {
            if (!document.getElementById('hilfe').classList.contains('anzeigen')) {
                document.getElementById('hilfe').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');

            } else if (document.getElementById('hilfe').classList.contains('anzeigen')) {
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('field').classList.add('anzeigen');
                document.getElementById('points').classList.add('anzeigen');
                document.getElementById('pause').classList.add('anzeigen');
            }
        }
        if (string === 'dank') {
            if (!document.getElementById('credits').classList.contains('anzeigen')) {
                document.getElementById('credits').classList.add('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('highsco').classList.remove('anzeigen');

            } else if (document.getElementById('credits').classList.contains('anzeigen')) {
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('field').classList.add('anzeigen');
                document.getElementById('points').classList.add('anzeigen');
                document.getElementById('pause').classList.add('anzeigen');
            }
        }
        if (string === 'highscore') {
            if (!document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');

            } else if (document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.remove('anzeigen');
                document.getElementById('field').classList.add('anzeigen');
                document.getElementById('points').classList.add('anzeigen');
                document.getElementById('pause').classList.add('anzeigen');
            }
        }
    }
    if (zustand.status == 6) {
        if (string === 'highscore') {
            if (!document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.add('anzeigen');
                document.getElementById('credits').classList.remove('anzeigen');
                document.getElementById('hilfe').classList.remove('anzeigen');
                document.getElementById('anleitung').classList.remove('anzeigen');
            }
            else if (document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.remove('anzeigen');
            }
        }
    }
}

/**Function für EasterEgg
 * Beim Klick auf einen bestimmten Stern wird ein EasterEgg freigeschaltet
 * Dieses bewegt sich dan durch den Bildschirm und macht sich durch einen Sound
 * bemerkbar. Diese Function ist nur einmal nutzber.
 * Diese Function befindet sich ausserhalb des Automaten, dar diese immer nutzbar ist(zu jeder Zeit).
 */
function egg() {

    document.getElementById("flurry").classList.add('anzeigen');
    document.getElementById("egg").classList.add('NoDisplay');
    document.getElementById("egg-sound").play();
    setTimeout(function () {
        document.getElementById("flurry").classList.remove('anzeigen');
        document.getElementById("egg-sound").play();
    }, 14500)
}

/**Function für die Design Wahl
 * @param Es wird eine Grafik mit einem RadioButton verknüpft, um so Parameter zu speichern.
 * Diese Function befindet sich ausserhalb des Automaten, dar diese immer nutzbar ist(zu jeder Zeit).
 */
function wahlDesign(element) {

    var classic = document.getElementById('classic');
    var fsbwit = document.getElementById('fsbwit');

    if (element == 1) {
        classic.lastElementChild.lastChild.checked = true;
        fsbwit.lastElementChild.lastChild.checked = false;

    } else if (element == 2) {
        fsbwit.lastElementChild.lastChild.checked = true;
        classic.lastElementChild.lastChild.checked = false;
    }
}

/**Function für die Level Wahl
 * @param Es wird eine Grafik mit einem RadioButton verknüpft, um so Parameter zu speichern.
 * Diese Function befindet sich ausserhalb des Automaten, dar diese immer nutzbar ist(zu jeder Zeit).
 */
function wahlLevel(element) {

    var easy = document.getElementById('easy');
    var med = document.getElementById('med');
    var hard = document.getElementById('hard');

    if (element == 1) {
        easy.lastElementChild.lastChild.checked = true;
        med.lastElementChild.lastChild.checked = false;
        hard.lastElementChild.lastChild.checked = false;

    } else if (element == 2) {
        easy.lastElementChild.lastChild.checked = false;
        med.lastElementChild.lastChild.checked = true;
        hard.lastElementChild.lastChild.checked = false;

    } else if (element == 3) {
        easy.lastElementChild.lastChild.checked = false;
        med.lastElementChild.lastChild.checked = false;
        hard.lastElementChild.lastChild.checked = true;
    }
}


/*---------------------------------------------controller-------------------------------------------------------------*/

/**Hier wird der Startbildschirm angezeigt. In Diesem wird eine Laufschrift eingeblendet.
 * @param Durch Drücken der Elemente im Footer ist es möglich sich die Inhalte anzeigen zu lassen.
 * Durch wiederholtes drücken auf ein Element oder einen Klick auf den Bildschirm wechselt man automatisch
 * in den Zustand 2. Über den Mute-Button(function muten()) ist es möglich die Musik Ein bzw. Ausblenden zu lassen.
 */
function controller_beginn() {

    let startbildschirm = document.getElementsByClassName('start');
    let laufschrift = document.getElementById('titles');
    let footer = document.getElementById('links');
    let popups = document.getElementsByClassName('popup');
    let logo = document.getElementById('logo');
    let close = document.getElementsByClassName('close');

    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function () {
            popupsAnzeigen('close')
        });
    }

    var start = function () {
        zustand.status = 2;
        laufschrift.classList.remove('anzeigen');
        logo.classList.remove('anzeigen');
        laufschrift.removeEventListener('click', start);
        for (let i = 0; i < popups.length; i++) {
            popups[i].classList.remove('anzeigen');
        }
        for (let i = 0; i < startbildschirm.length; i++) {
            startbildschirm[i].removeEventListener('click', start);
        }
    };
    laufschrift.classList.add('anzeigen');
    laufschrift.addEventListener('click', start);
    footer.addEventListener('click', function (e) {
        if (e.target.className == 'info' && e.target.id !=='playername') {
            popupsAnzeigen((e.target.id));
        } else if (e.target.id == 'mute') {
            muten();
        }
    });

    for (let i = 0; i < startbildschirm.length; i++) {
        startbildschirm[i].addEventListener('click', start);
    }

}

/**dieser Controller steuert den eigentlichen Spielstart nach der Eingabe des Spielernamens werden die Buttons
 * für die die Spielschwierigkeit freigeschaltet. Nachdem man diese ausgewählt hat, wird die Wahl des Spielmodus freigeschaltet.
 * Nachdem man nun alle spielrelevanten Daten ausgewählt hat, wird man in den Spielmodus 3 (Spielstart) weitergeleitet
 */
function controller_start() {

    if (!document.getElementById('design').classList.contains('anzeigen')) {
        document.getElementById('design').classList.add('anzeigen');
        document.getElementById('design').classList.add('fadeIn');
        document.getElementById('layout').classList.add('anzeigen');
        document.getElementById('layout').classList.add('fadeIn');
    }

    let level = document.getElementsByClassName('level');
    let modus = document.getElementsByClassName('modus');

    setData();
    spieler.name = document.getElementById('name').value;
    if (gewModus == "f" || gewModus == "c") {
        document.getElementById('design').classList.remove('anzeigen');
        spieler.name = document.getElementById('name').value;
        document.getElementById('playername').querySelector('span').innerHTML = spieler.name;
        zustand.status = 3;
    }
    else {
        document.getElementById('name').addEventListener('input', function () {
            spieler.name = this.value;
            document.getElementById('playername').querySelector('span').innerHTML = spieler.name;
            if (document.getElementById('name').value != "") {
                for (let i = 0; i < level.length; i++) {
                    level[i].classList.add('anzeigen');
                }
                for (let j = 0; j < modus.length; j++) {
                    modus[j].classList.remove('anzeigen');
                }
            }
            else {
                for (let i = 0; i < level.length; i++) {
                    level[i].classList.remove('anzeigen');
                }
            }
        });
        if (document.getElementById('name').value != "") {
            for (let i = 0; i < level.length; i++) {
                level[i].classList.add('anzeigen');
                document.getElementById('playername').querySelector('span').innerHTML = spieler.name;
            }
        }
        else {
            for (let i = 0; i < level.length; i++) {
                level[i].classList.remove('anzeigen');
            }
        }
    }
    for (let i = 0; i < level.length; i++) {
        level[i].addEventListener('click', function (e) {
            gewLevel = e.target.parentNode.lastChild.value;
            for (let j = 0; j < level.length; j++) {
                level[j].classList.remove('anzeigen');
            }
            for (let j = 0; j < modus.length; j++) {
                modus[j].classList.add('anzeigen');
                modus[j].addEventListener('click', function (e) {
                    gewModus = e.target.parentNode.lastChild.value;
                    for (let k = 0; k < modus.length; k++) {
                        modus[k].classList.remove('anzeigen');
                    }
                    zustand.status = 3;

                    //Easteregg bei Namenseingabe
                    if (document.getElementById('playername').querySelector('span').innerHTML == "Matt Damon") {
                        if (document.getElementById("backgroundSound").paused) {
                            document.getElementById('matt').play();
                        }
                        else {
                            document.getElementById("backgroundSound").pause();
                            document.getElementById('matt').play();
                        }
                    }
                    if (document.getElementById('playername').querySelector('span').innerHTML == "Werner") {
                        if (document.getElementById("backgroundSound").paused) {
                            document.getElementById('bloed').play();
                        }
                        else {
                            document.getElementById("backgroundSound").pause();
                            document.getElementById('bloed').play();
                        }
                    }
                    document.getElementById('design').classList.remove('anzeigen');
                });
            }
        });
    }


}

/**
 * Dieser Controller blendet nun den Playbutton ein durch drücken auf diesen startet das Spiel
 */
function controller_press_start() {

    let div = document.getElementById('play');
    div.classList.add('anzeigen');
    div.addEventListener('click', function (e) {

        if (e.target.alt == 'playButton') {
            div.classList.remove('anzeigen');
            zustand.status = 4;
        }
    })
}

/**
 * in diesem Controller wird das eigentliche Spielescript aufgerufen und gestartet.
 * Das spiel wird über initGame(level) initialisiert und über
 * die Funktionen schiff.setHitlist() und schiff.updateHitlist() wird die Trefferliste
 * auf ggf. gespeicherte Werte gesetzt. (Defaultwerte: 0)
 */
function controller_spiel() {

    document.getElementById('field').classList.add('anzeigen');
    document.getElementById('points').classList.add('anzeigen');
    //start des Games InvadersGameV2.initGame(level);
    initGame(gewLevel);
    spiel.shooter.setHitlist([parseInt(playerData.alien1), parseInt(playerData.alien2), parseInt(playerData.alien3), parseInt(playerData.alien4), parseInt(playerData.alien5)]);
    spiel.shooter.updateHitlist(5);
    saveData();
}

/**
 * In diesem Controller wird der Schriftzug Game Over für 2 Sekunden angezeigt und der Game Over sound abgespielt
 * Das Spielergebnis wird mit den funktionen send() und holen(); in die Datenbank geschrieben
 * alle Scores aus dem Spiel werden wieder auf 0 gesetzt
 * Danach wird direkt in den Zustand 6 geschaltet.
 * Wurde mit einer Timeout Funtion sichergestellt
 */
function controller_gameOver() {

    document.getElementById("backgroundSound").pause();
    document.getElementById('gameover').classList.add('anzeigen');
    document.getElementById("game-Over").play();
    document.getElementById('field').classList.remove('anzeigen');
    document.getElementById('points').classList.remove('anzeigen');
    spieler.score = document.getElementById('score').innerHTML;
    send();
    holen();
    reset();

    setTimeout(function () {
        document.getElementById("backgroundSound").play();
        document.getElementById('gameover').classList.remove('anzeigen');
        document.getElementById('a1').innerHTML = 0;
        document.getElementById('a2').innerHTML = 0;
        document.getElementById('a3').innerHTML = 0;
        document.getElementById('a4').innerHTML = 0;
        document.getElementById('a5').innerHTML = 0;
        document.getElementById('score').innerHTML = 0;
        gewLevel = null;
        gewModus = null;
        zustand.status = 6;
    }, 2000);

}

/**
 * In diesem Controller wird die Auswertung des Spieles vorgenommen
 * nachdem der Datenbankzugriff per holen() Methode erfolgt ist, werden die zurückgelieferten
 * Objekte in die Highscore eingetragen und angezeigt.
 * Die sortierung der Objekte nach der höchsten Punktzahl übernimmt hier bereits die Datenbank.
 * Die Highscore wird automatisch für 5 Sekunden angezeigt.
 * Danach wechselt man wieder in den Zustand 2 um ein weiteres Spiel zu starten
 */
function controller_highscore() {

    setTimeout(function () {
        popupsAnzeigen('highscore');
        zustand.status = 2;
    }, 3000);
    popupsAnzeigen('highscore');
}

/**Observer für den Automaten
 * lauscht auf Änderungen der globalen Variable zustand.status
 * In Abhängigkeit dieser werden die verschiedenen Controller aufgerufen
 */
Object.observe(zustand, function (changes) {

    changes.forEach(function (change) {
        if (change.name === 'status') {
            switch (change.object.status) {
                case 1:
                    controller_beginn();
                    break;
                case 2:
                    controller_start();
                    break;
                case 3:
                    controller_press_start();
                    break;
                case 4:
                    controller_spiel();
                    break;
                case 5:
                    controller_gameOver();
                    break;
                case 6:
                    controller_highscore();
                    break;
            }
        }
    });
});

zustand.status = 1;