/**
 * Created by dfleuren on 24.02.2016.
 */
"use strict";

var audio = document.getElementById('sound');
var button = document.getElementById('mute');

mute.addEventListener('click', function (e) {
    if (audio.paused) {
        audio.play();
    }else{
        audio.pause();
        audio.currentTime = 0
    }
}

