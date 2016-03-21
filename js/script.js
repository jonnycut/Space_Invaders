/**
 * Created by dfleuren on 24.02.2016.
 */
"use strict";
document.getElementById('titles').classList.add('anzeigen');


//--------------------------------------POPUPs Anzeigen--------------------------------------

document.addEventListener('click', function (e) {

    if (e.target.id === 'manual') {
        if (!document.getElementById('anleitung').classList.contains('anzeigen')) {
            document.getElementById('anleitung').classList.add('anzeigen');
            document.getElementById('credits').classList.remove('anzeigen');
            document.getElementById('hilfe').classList.remove('anzeigen');
            document.getElementById('highsco').classList.remove('anzeigen');
            document.getElementById('titles').classList.remove('anzeigen');
            console.log(e);
        } else if (document.getElementById('anleitung').classList.contains('anzeigen')) {
            document.getElementById('anleitung').classList.remove('anzeigen');
        }
    }

    if (e.target.id === 'help') {
        if (!document.getElementById('hilfe').classList.contains('anzeigen')) {
            document.getElementById('hilfe').classList.add('anzeigen');
            document.getElementById('credits').classList.remove('anzeigen');
            document.getElementById('anleitung').classList.remove('anzeigen');
            document.getElementById('highsco').classList.remove('anzeigen');
            document.getElementById('titles').classList.remove('anzeigen');
            console.log(e);
        }else if (document.getElementById('hilfe').classList.contains('anzeigen')) {
            document.getElementById('hilfe').classList.remove('anzeigen');
        }
    }

    if (e.target.id === 'dank') {
        if (!document.getElementById('credits').classList.contains('anzeigen')) {
            document.getElementById('credits').classList.add('anzeigen');
            document.getElementById('anleitung').classList.remove('anzeigen');
            document.getElementById('hilfe').classList.remove('anzeigen');
            document.getElementById('highsco').classList.remove('anzeigen');
            document.getElementById('titles').classList.remove('anzeigen');
            console.log(e);
        } else if (document.getElementById('credits').classList.contains('anzeigen')) {
            document.getElementById('credits').classList.remove('anzeigen');
        }
    }

    if (e.target.id === 'highscore') {
        if (!document.getElementById('highsco').classList.contains('anzeigen')) {
            document.getElementById('highsco').classList.add('anzeigen');
            document.getElementById('credits').classList.remove('anzeigen');
            document.getElementById('hilfe').classList.remove('anzeigen');
            document.getElementById('anleitung').classList.remove('anzeigen');
            document.getElementById('titles').classList.remove('anzeigen');
            console.log(e);
        }else if (document.getElementById('highsco').classList.contains('anzeigen')) {
            document.getElementById('highsco').classList.remove('anzeigen');
        }
    }
})
;


//--------------------------------------Pausieren der Hintergrundmusik--------------------------------------
function pausieren() {
    var mute = document.getElementById("mute");
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
