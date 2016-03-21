/**
 * Created by dfleuren on 24.02.2016.
 */
"use strict";


































// Pausieren der Hintergrundmusik
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
