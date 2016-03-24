/**
 * Created by ehampel on 21.03.2016.
 */
//-----------------------------------------variablen--------------------------------------------------------------------
"use strict";
var spieler = {name: null, score: 0};
var zustand = {status: 0};
var flag = false;
var gewLevel = null;
var gewModus = null;

//-------------------------------------------functions------------------------------------------------------------------


function muten() {
    var lala = document.getElementById("backgroundSound");
    if (lala.paused) {
        lala.play();
        mute.src = "images/unmute.png";
    }
    else {
        lala.pause();
        mute.src = "images/mute.png";
    }
}
function popups_anzeigen(string) {
    let div = document.getElementById('layout');
    div.classList.add('anzeigen');
    let close = document.getElementsByClassName('close');


    if (string === 'manual') {
        if (!document.getElementById('anleitung').classList.contains('anzeigen')) {
            document.getElementById('anleitung').classList.add('anzeigen');
            document.getElementById('credits').classList.remove('anzeigen');
            document.getElementById('hilfe').classList.remove('anzeigen');
            document.getElementById('highsco').classList.remove('anzeigen');
            document.getElementById('titles').classList.remove('anzeigen');
            document.getElementById('design').classList.remove('anzeigen');
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
            document.getElementById('titles').classList.remove('anzeigen');
            document.getElementById('design').classList.remove('anzeigen');
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
            document.getElementById('titles').classList.remove('anzeigen');
            document.getElementById('design').classList.remove('anzeigen');
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
            document.getElementById('titles').classList.remove('anzeigen');
            document.getElementById('design').classList.remove('anzeigen');
        } else if (document.getElementById('highsco').classList.contains('anzeigen')) {
            document.getElementById('highsco').classList.remove('anzeigen');
            document.getElementById('design').classList.add('anzeigen');
        }
    }

}
function egg() {
    document.getElementById("flurry").style.display = "block";
    document.getElementById("flurry").style.backgroundColor = "none";
    document.getElementById("egg").style.display = "none";
    document.getElementById("egg-sound").play();
    setTimeout(function () {
        document.getElementById("flurry").style.display = "none"
        document.getElementById("egg-sound").play();
    }, 14500)
}
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
//---------------------------------------------controller---------------------------------------------------------------

/**Hier wird der Startbildschirm angezeigt. In Diesem wird eine Laufschrift eingeblendet.
 * Durch Drücken der Elemente im Footer ist es Möglich sich die Inhalte anzeigen zu lassen
 * Durch wiederholtes drücken auf ein Element oder einen Klick auf den Bildschirm wechselt man automatisch in den Zustand 2
 * über den Mute-Bottun ist es Möglich die Musik Ein bzw. Ausblenden zu lassen.
 *
 *
 */
function controller_beginn() {
    var startbildschirm = document.getElementsByClassName('start');
    let laufschrift = document.getElementById('titles')
    let footer = document.getElementById('links');
    var start = function (e) {
        zustand.status = 2;
        laufschrift.classList.remove('anzeigen');
        laufschrift.removeEventListener('click', start);
        for (let i = 0; i < startbildschirm.length; i++) {
            startbildschirm[i].removeEventListener('click', start);
        }

    };

    laufschrift.classList.add('anzeigen');

    laufschrift.addEventListener('click', start);
    footer.addEventListener('click', function (e) {
        if (e.target.className == 'info') {
            popups_anzeigen((e.target.id));
        } else if (e.target.id == 'mute') {
            muten();
        }
    });
    for (let i = 0; i < startbildschirm.length; i++) {
        startbildschirm[i].addEventListener('click', start);
    }
}
function controller_start() {
    if (!document.getElementById('design').classList.contains('anzeigen')) {
        document.getElementById('design').classList.add('anzeigen');
        document.getElementById('design').classList.add('fadeIn');
        document.getElementById('layout').classList.add('anzeigen');
        document.getElementById('layout').classList.add('fadeIn');
    }

    let level = document.getElementsByClassName('level');
    let modus = document.getElementsByClassName('modus');


    if (document.getElementById('playername').querySelector('span').textContent != "") {
        for (let i = 0; i < level.length; i++) {
            level[i].classList.add('anzeigen');
        }
    }
    else {
        for (let i = 0; i < level.length; i++) {
            level[i].classList.remove('anzeigen');
        }
        document.getElementById('name').addEventListener('input', function () {
            spieler.name = this.value;
            document.getElementById('playername').querySelector('span').textContent = spieler.name;
            if (document.getElementById('playername').querySelector('span').textContent != "") {
                for (let i = 0; i < level.length; i++) {
                    level[i].classList.add('anzeigen');
                }
            }
            else {
                for (let i = 0; i < level.length; i++) {
                    level[i].classList.remove('anzeigen');
                }
            }
        });
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
                        document.getElementById('design').classList.remove('anzeigen');
                    })
                }
            })
        }
    }
}
function controller_press_start() {

    let div = document.getElementById('play');
    div.classList.add('anzeigen');
    div.addEventListener('click', function (e) {

        if (e.target.parentNode.id == 'play') {
            div.classList.remove('anzeigen');
            zustand.status = 4;
        }
    })

}
function controller_spiel() {
    let spielfeld = document.getElementById('field');
    let points = document.getElementById('points');
    spielfeld.classList.add('anzeigen');
    points.classList.add('anzeigen');
    setTimeout(function () {
        zustand.status = 5;
        spielfeld.classList.remove('anzeigen');
        points.classList.remove('anzeigen');
    }, 3000);

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 80) {            //Keycode 80 = P
            //flag = !flag;
            //if (flag) {
            //todo:status des flags nutzen um Spiel zu pausieren
            //}
        }
    })
}
/**
 * In diesem Zustand wird der Schriftzug Game Over für 2 Sekunden angezeigt und der Game Over sound abgespielt
 * Danach wird direkt in den Zustand 5 geschalten.
 * Wurde mit einer Timeout Funtion sichergestellt
 */
function controller_gameOver() {
    document.getElementById("backgroundSound").pause();
    document.getElementById('gameover').classList.add('anzeigen');
    document.getElementById("game-Over").play();

    setTimeout(function () {
        document.getElementById("backgroundSound").play();
        document.getElementById('gameover').classList.remove('anzeigen');
        zustand.status = 6;
    }, 2000);
}

/**
 * In diesem Zustand wird die Auswertung des Spieles vorgenommen
 * nachdem der Datenbankzugriff erfolgt ist und das Spiel in die Datenbank übertragen wurde
 * wird die Tabelle nach Punkten sortiert und als Highscore ausgegeben.
 * Diese wird 5 Sekunden angezeigt.
 */
function controller_dbZugriff() {
    setTimeout(function () {
        popups_anzeigen('highscore');
        zustand.status = 2;
    }, 3000);
    popups_anzeigen('highscore');


}

function controller_pause() {
    let div = document.querySelector('#');
    div.classList.add('anzeigen')
}


//Oberserver für den Automat
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
                    controller_dbZugriff();
                    break;
                case 7:
                    controller_pause();
                    break;

            }
        }
    });
});
zustand.status = 1;