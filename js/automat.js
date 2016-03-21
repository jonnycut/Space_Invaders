/**
 * Created by ehampel on 21.03.2016.
 */

"use strict";
var spieler={
    name='',
    score=0
    };

var zustand={
    status:0
};
var flag =false;

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
//---------------------------------------------------------------------------------------------------------------------
function controller_beginn(){
    let div = document.querySelector('#')//todo: Selectoren anpassen
    div.classList.add('anzeigen')
    window.addEventListener('click',function(e){
        if(e.target!='footer'){
            zustand=1;
            muten();
            div.classList.remove('anzeigen');
        }
    })



}

function controller_start(){
    let div = document.querySelector('#');
    div.classList.add('anzeigen');

    document.getElementById('name').addEventListener('input', function(){
        spieler.name=this.value;
    });
    document.addEventListener('click',function(e){
        if(e.target.id ==='classic') {
            //todo:Classic Layout wählen
        }else {
            //todo:FSBwIT Layout wählen
        }
        if(name!==''){
                div.classList.remove('anzeigen');
                zustand.status=2;
        }
    });

}

function controller_press_start(){
    let div = document.querySelector('#');
    div.classList.add('anzeigen');
    document.getElementById('play').addEventListener('click',function(){
        div.classList.remove('anzeigen');
        zustand=3;
    })
} // müsste fertig sein

function controller_spiel(){
    let div = document.querySelector('#');
    div.classList.add('anzeigen');

    //todo: Kai Script einbinden

    if(e.keyCode ===80){            //Keycode 80 = P
        flag = !flag;
        if(flag){

        }
    }
};

function controller_gameOver(){
    let div = document.querySelector('#');
    div.classList.add('anzeigen');
    setTimeout(function(){

    },3000);
    div.classList.remove('anzeigen');
    zustand=5;

};

function controller_dbZugriff(){
    let div = document.querySelector('#')
    div.classList.add('anzeigen')


};

function controller_pause(){
    let div = document.querySelector('#')
    div.classList.add('anzeigen')
};

function controller_popups(){
    let div = document.querySelector('#')
    div.classList.add('anzeigen')
};





//Oberserver für den Automat
Object.observe(zustand, function(changes) {
    changes.forEach(function (change) {
        if (change.name === 'status') {
            switch (change.object.status) {
                case 0:
                    controller_beginn();
                    break;
                case 1:
                    controller_start();
                    break;
                case 2:
                    controller_press_start();
                    break;
                case 3:
                    controller_spiel();
                    break;
                case 4:
                    controller_gameOver();
                    break;
                case 5:
                    controller_dbZugriff();
                    break;
                case 6:
                    controller_pause();
                    break;
                case 7:
                    controller_popups();
                    break;
            }
        }
    });
});