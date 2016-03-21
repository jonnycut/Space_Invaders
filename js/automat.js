/**
 * Created by ehampel on 21.03.2016.
 */

"use strict";
//------------------------------------------Variablen-------------------------------------------------------------------
var spieler={
    name :'',
    score:0
    };
var zustand={
    status:0
};
var flag =false;

//-------------------------------------------Funtionen------------------------------------------------------------------
function muten() {
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
function popups_anzeigen() {
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
            } else if (document.getElementById('hilfe').classList.contains('anzeigen')) {
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
            } else if (document.getElementById('highsco').classList.contains('anzeigen')) {
                document.getElementById('highsco').classList.remove('anzeigen');
            }
        }
    });
}
function egg() {
    document.getElementById("flurry").style.display = "block";
    document.getElementById("flurry").style.backgroundColor = "none";
    document.getElementById("egg").style.display = "none";
    setTimeout(function () {
        document.getElementById("flurry").style.display = "none"
    }, 14500)
}



//--------------------------------------------Controller---------------------------------------------------------------

function controller_beginn(){
    let div =document.getElementById('titles');
    div.classList.add('anzeigen');

    window.addEventListener('click',function(e){
        console.log(e);
        if(e.target.parentNode.id!='links'){
            zustand.status=2;
            div.classList.remove('anzeigen');
        }
        else{
          popups_anzeigen()
        }


    })
   }

function controller_start(){
    let div1 = document.getElementById('design');
    div1.classList.add('anzeigen');

    let div2 = document.getElementById('layout');
    div2.classList.add('anzeigen');

    document.getElementById('name').addEventListener('input', function(){
        spieler.name=this.value;
    });
        if(name!==''){
            window.addEventListener('click',function(e){
            if(e.target.id=='bild') {
            //todo:Classic Layout w�hlen
                div1.classList.remove('anzeigen');
                div2.classList.remove('anzeigen');
                zustand.status=3;
            }else {
            //todo:FSBwIT Layout w�hlen
                div1.classList.remove('anzeigen');
                div2.classList.remove('anzeigen');
                zustand.status=3;
        }})}
};

function controller_press_start(){
    let div = document.getElementById('play');
    div.classList.add('anzeigen');
    document.getElementById('play').addEventListener('click',function(){
        div.classList.remove('anzeigen');
        zustand=3;
    })
} // m�sste fertig sein

function controller_spiel(){
    let div = document.querySelector('#');
    div.classList.add('anzeigen');

    //todo: Kai Script einbinden

    if(e.keyCode ===80){            //Keycode 80 = P
        flag = !flag;
        if(flag){

        }
    }
}

function controller_gameOver(){
    let div = document.querySelector('#');
    div.classList.add('anzeigen');
    setTimeout(function(){

    },3000);
    div.classList.remove('anzeigen');
    zustand.status=5;

}

function controller_dbZugriff(){
    let div = document.querySelector('#');
    div.classList.add('anzeigen')


}

function controller_pause(){
    let div = document.querySelector('#');
    div.classList.add('anzeigen')
}


//Oberserver f�r den Automat
Object.observe(zustand, function(changes) {
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
zustand.status=1;