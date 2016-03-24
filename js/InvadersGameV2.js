/**
 * Created by JonnyCut on 22.03.2016.
 */
/**
 * Created by KNapret on 15.03.2016.
 */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d'); // 2D-Kontext
var pause = false;
var gLevel;
var Spiel
var moveDirection="R";

var idAlienAttack;
var idShipMoveRight = null;
var idShipMoveLeft = null;
var idMoveDown=null;

var shooter;
var alien_formation = [];

var images1 =["images/alien02.png","images/alien02b.png",null,null,null,null];
var images2 =["images/alien03.png","images/alien03b.png",null,null,null,null];
var images3 =["images/alien04.png","images/alien04b.png",null,null,null,null];
var images4 =["images/alien05.png","images/alien05b.png",null,null,null,null];



class Schuss {
    /**
     *
     * @param posX (int) - X Position des Schusses
     * @param posY (int) - Y Position des Schusses
     * @param alien(Alien) optional - bei Alienschuss, muss der Schuss wissen, zu welchem
     * Alien er gehört, damit die Bullet des Aliens wieder genullt werden kann
     */

    constructor(posX, posY, alien) {

        this.posX = posX;
        this.posY = posY;
        this.alien = alien;
        this.isAlive = true;
    }

    fly(direction) {
        /**
         * Zählt die Y Position des Schusses hoch (direction=2) oder runter (direction = 1)
         * @param direction (int) alienschuss =2, ShipShoot=1
         */



        if (direction == 1 && pause==false) {
            this.posY = this.posY - 8;
            this.inTouch(direction);
        } else if(direction ==2 && pause==false) {
            this.posY = this.posY + 4;
            this.inTouch(direction);
        }


    }

    draw() {
        /**
         * Zeichnet das Alien auf das SpielCanvas
         * @type {string}
         */

        ctx.fillStyle = 'green';
        ctx.fillRect(this.posX, this.posY, 5, 10);
    }

    inTouch(direction) {
        /**
         * Prüft, ob ein Schuss ein Alien oder das Schiff trifft.
         * Hier wird die Hitbox festgelegt.
         * Setzt auch "Bullet" des Schiffes auf NULL, wenn er außerhalb des Canvas ist
         * oder ein Alien getroffen hat.
         * @param direction (int) 1 = Schiffschuss, 2 = Alienschuss
         */

        //ToDo: HitBox anpassen!
        if (direction == 1) {
            if (this.posY <= 0) {
                shooter.bullet = null;

            }

            for (let i = 0; i < alien_formation.length; i++) {

                if (alien_formation[i] != null) {
                    if (this.isAlive&&(this.posX <= alien_formation[i].posX + 20 && this.posX >= alien_formation[i].posX) && (this.posY <= alien_formation[i].posY + 13 && this.posY >= alien_formation[i].posY+2)) {
                        this.isAlive=false;
                        alien_formation[i].explode(i);
                        console.log(alien_formation[i]);
                        console.log(this);
                        //alien_formation.splice(i, 1);
                        shooter.bullet = null;

                    }
                }


            }
        } else if (direction == 2) {
            //Prüfung bei Alienschuss

            if (this.posY > 380) {
                this.isAlive=false;
                this.alien.bullet = null;
            }

            if (this.isAlive&&(this.posX >= shooter.shooterX && this.posX <= shooter.shooterX + 22) && (this.posY >= 370&& this.posY <380)) {
                this.isAlive = false;
                this.alien.bullet = null;
                //shooter.explode();
                console.log(this);
                console.log(shooter)
                if(shooter.lives==0){
                    spiel.gameOver();
                }else{
                    console.log("Leben runter");
                    shooter.lives--;
                    document.getElementById('l1').innerHTML = shooter.lives;
                }
            }

        }

    }


}


class Schiff {
    /** Basisklasse Schiff
     * Y Position ist fest auf 375
     * width (20px) und height (20px) sind fest, da nur für Explosion gebraucht
     * @param posX X-Position des Schiffes
     */

    constructor(posX) {

        this.shooterX = posX;
        this.posY = 375;
        this.width =20;
        this.height = 13;
        this.bullet = null;
        this.lives = 3;
        this.img = new Image();
        this.img.src = "images/panzer02.png";
        this.soundShoot = document.getElementById('pShoot');

    }

    moveRight() {
        /**
         * setzt die X Position des Schiffes 5px weiter nach rechts
         * Sperrt den Spieler im Canvas ein (bei x>=670px)
         */

        if (this.shooterX <= 670 && pause==false) {
            this.shooterX = this.shooterX + 5;


        } else {
            return;
        }


    }

    moveLeft() {//setzt die X Position des Schiffes 10px weiter nach links
        /**
         * setzt die X Position des Schiffes -5px weiter nach Links
         * Sperrt den Spieler im Canvas ein (bei x>=0px)
         */

        if (this.shooterX >= 10 && pause==false) {

            this.shooterX = this.shooterX - 5;


        } else {
            return;
        }


    }
    explode(){
        /**
         * Animiert die Explosion des Schiffes
         * Kann Flurry aber schöner!!
         * @type {Schiff}
         */

        var ship = this;

        var exp= function(){
            //Schiff Größe 20x13px;

                ship.img.src='shipExp.png';
                ship.height+=8;
                ship.width+=30;
                ship.posY-=8;


            if(ship.height<60 && pause==false)
                requestAnimationFrame(exp);


        }
        if(pause ==false)
            requestAnimationFrame(exp);
    }

    draw(X) {
        /**
         * Zeichnet das Schiff an Position X (Y Position ist beim Schiff nicht veränderbar)
         */

        ctx.drawImage(this.img, X, this.posY, this.width,this.height);
    }

    shoot() {
        /**feuert einen Schuss aus aktueller Position +9 (Mitte des Schiffes)
         * mit Hilfe der schuss.fly(direction) Methode ab.
         * der Schuss startet immer auf Y=375 (nicht veränderbar)
         */

        if (this.bullet == null && pause==false) {
            this.soundShoot.play();
            this.bullet = new Schuss(this.shooterX + 9, 375);
            let fire= function () {
                if(shooter.bullet!= null){
                    shooter.bullet.fly(1);
                    requestAnimationFrame(fire);
                }

            }
            requestAnimationFrame(fire)

        }


    }
}

class Alien {
    /**Basisklasse der Aliens
     *
     * @param posX (int) X-Position des Aliens
     * @param posY (int) Y Position des Aliens
     * @param art (int, 1-4) benötigt zu Bilderauswahl
     */


    constructor(posX, posY,art) {
        this.posX = posX;
        this.posY = posY;
        this.with = 20;
        this.height = 13;
        this.isExploding = false;
        this.bullet = null;
        this.art = art;
        switch (art) {
            case 1:
                this.images = images1;
                break;
            case 2:
                this.images = images2;
                break;
            case 3:
                this.images = images3;
                break;
            case 4:
                this.images = images4;
                break;
            default:
                this.images = images1;
                break;

        }
        this.img = new Image();
        this.img.src = this.images[0];

    }

    move(direction) {
        /**
         * schiebt das Alien 1px weiter nach rechts
         * und wechselt das Bild random (Animation)
         *
         * @param direction (String, "L|R")
         */
        direction = moveDirection;

        if (direction == "R"&&! this.isExploding){

            this.posX++;
            let newBild = this.images[Math.floor(Math.random()*this.images.length)];
            if(newBild!=null)
                this.img.src= newBild;

        }


        else if (direction == "L"&&! this.isExploding){
            this.posX--;
            let newBild = this.images[Math.floor(Math.random()*this.images.length)];
            if(newBild!=null)
                this.img.src= newBild;

        }


    }


    movedown() {
        /**
         * Schiebt das Alien 10px weiter nach unten
         */

        this.posY = this.posY + 10;


    }
    explode(index){
        /**
         * Animiert die Explosion für ein Alien
         * Kann Flurry wahrscheinlich auch schöner.
         *
         *
         * @type {Alien}
         * @param index (int) - Löscht Alien aus alien_formation[index]
         */
        var alien = this;
        this.isExploding = true;


        var exp= function(){
            //alien Größe 20x13px;

            alien.img.src='images/exp_g.png';
            alien.height+=8;
            alien.with+=8;
            alien.posX -=4;
            alien.posY-=4;

            if(alien.height<60 && pause==false)
                requestAnimationFrame(exp);
            if(alien.height>=60){
                console.log(index);
                alien_formation.splice(index,1);

            }

        }
        if(pause == false)
            requestAnimationFrame(exp);


    }


    shoot() {
        /**
         * Feuert einen Schuss mit Hilfer der Schuss.fly() methode.
         * @type {Alien}
         */

        let alien = this;

        if (this.bullet == null && pause==false) {

            let bullet = this.bullet = new Schuss(this.posX, this.posY, alien);
            let fire = function(){
                if(alien.bullet !=null){
                    alien.bullet.fly(2);
                    requestAnimationFrame(fire);
                }

            }
            requestAnimationFrame(fire);
        }


    }

    draw() {
        /**
         * Zeichnet das Alien an seiner X und Y Position. 20px breit, 13px hoch.
         */

        ctx.drawImage(this.img, this.posX, this.posY, this.with, this.height);
    }
}

class Game{

    constructor(){
        shooter = new Schiff(300);
    }


    drawCanvas() {
        /**löscht das aktuelle Canvas und zeichnet es neu.
         * Nutzt die .draw() Methoden von Alien, Schiff und Schuss
         *
         */


        var game = function (){

            canvas.width = canvas.width;

            for (let i = 0; i < alien_formation.length; i++) {

                alien_formation[i].draw();
                if (alien_formation[i].bullet != null) {
                    alien_formation[i].bullet.draw();
                }

            }

            shooter.draw(shooter.shooterX);
            if (shooter.bullet != null){

                shooter.bullet.draw();

            }


            requestAnimationFrame(game)
        }
        requestAnimationFrame(game);

    }
    baueAlienFormation(){

        let positionX = 30;
        let positionY = 10;
        let art =1;

        for (let i = 1; i <= 48; i++) {

            alien_formation[i-1] = new Alien(positionX + 20, positionY,art);
            positionX += 50;

            if(i%12==0){
                art++;
                positionY +=30;
                positionX = 30;
            }


        }
    }
    gameMove(level) {
        /**
         * Sorgt für die Bewegung der Aliens.
         * Nach rechts bis Canvasrand, 10px runter,
         * Nach links bis Canvasrand and again.
         *
         * Wenn getInvasion = flase -> Level-Up
         * @type {string}
         */

        let direction = moveDirection;

        idMoveDown = setInterval(function () {
            // runter


            for (let i = 0; i < alien_formation.length; i++) {
                if (alien_formation[i] != null&&pause==false) {

                    alien_formation[i].move(direction);

                    if (alien_formation[i].posX >= 680&&!alien_formation[i].isExploding) {
                        alien_formation[i].posX--;
                        for (let a = 0; a < alien_formation.length; a++) {
                            alien_formation[a].movedown();
                            if(a>i&&direction=="R"){
                                alien_formation[a].move(direction);
                            }

                        }
                        direction = moveDirection= "L";
                    }



                    if (alien_formation[i].posX <= 0&&!alien_formation[i].isExploding) {
                        alien_formation[i].posX++;
                        for (let a = 0; a < alien_formation.length; a++) {
                            alien_formation[a].movedown();
                            if(a>i&&direction=="L"){
                                alien_formation[a].move(direction);
                            }

                        }
                        direction = moveDirection = "R";
                    }

                    if (alien_formation[i].posY >= 370) {
                        spiel.gameOver();
                    }
                }
            }


            if (!spiel.getInvasion()) {
                clearInterval(idMoveDown);
                clearInterval(idAlienAttack);


                level = spiel.levelUp();
                console.log("Level UP!  "+level);
                spiel.baueAlienFormation()
                spiel.gameMove(level);
            }

        }, level)

        spiel.alien_attack();


    }
    alien_attack() {

        /**
         * Sucht random ein Alien aus alien_formation aus
         * und lässt es schießen.
         * Intervall: alle 1500ms
         * @type {number}
         */

        idAlienAttack = setInterval(function () {
            if(pause==false){
                let rambo = alien_formation[Math.floor(Math.random() * alien_formation.length)];
                if (rambo != null)
                    rambo.shoot();

            }

        }, 1500);

    }
    gameOver() {
        /**
         * Cleart alle Intervalle und zeigt "Lost-Div" an
         *
         * @type {Element}
         */
        let lostDiv = document.getElementById('gameover');

        console.log("LOST");
        console.log(pause);
        clearInterval(idMoveDown);
        idMoveDown=null;
        clearInterval(idAlienAttack);
        document.cancelRequestAnimationFrame;
        pause == true;

        lostDiv.style.display = "block";

    }

    getInvasion() {
        /**Liefert true, wenn mind. 1 Alien in Alien_formation[]
         * sonst false
         *
         * @type {boolean}
         */

        let invasion = false;

        for (let i = 0; i < alien_formation.length; i++) {
            if (alien_formation[i] != null) {
                invasion = true;
            }
        }

        return invasion;

    }

    levelUp(){
        if(gLevel<=10){
            gLevel--;
        }else{
            gLevel-=10;
        }

        return gLevel;
    }
}










function initGame(level) {
    /**
     * Startfunktion, erstellt das Schiff
     * Schreibt die Leben in das "lives-Div"
     * Startet drawCanvas(), gameMove und alienAttack
     * @param level (int) Schwierigkeitsgrad, BewegungsIntervall der Aliens (kleiner = schneller)
     */


    spiel = new Game();
    pause = false;
    //shooter = new Schiff(300);

    window.addEventListener('keydown', generalListener);
    window.addEventListener('keyup', keyUpListener);
    window.addEventListener('keydown', pauseListener);






    document.getElementById('l1').innerHTML = shooter.lives;



   spiel.baueAlienFormation();

    console.log(level);

    gLevel = level;
    spiel.drawCanvas()
    spiel.gameMove(level);



}

var keyUpListener = function (e) {
    /**Eventlistener bei loslassen einer Taste
     * Unterbricht ShipmoveIntervalle
     * @type {Number}
     */

    //nötig für eine weiche Bewegung des Schiffes!
    let key = e.keyCode;

    if (key == 39) { // Pfeil-rechts
        clearInterval(idShipMoveRight);

        idShipMoveRight = null;


    } else if (key == 37) { //Pfeil-links
        clearInterval(idShipMoveLeft);
        idShipMoveLeft = null;

    }
}


var generalListener = function (e) {

    /**Genereller Listener, wird am window angemeldet
     * startet Rechts- / Linksbewegung bei Tastendruck
     * ToDo: Pause bei "P"
     *
     * @type {Element}
     */

    let pauseDiv = document.getElementById('pause')
    let key = e.keyCode; //speichert den KeyCode des Events


    window.addEventListener('keydown', pauseListener);


    if (pause == false) {

        switch (key){
            case 39:
                if(idShipMoveRight==null){
                    idShipMoveRight = setInterval(function () {
                        shooter.moveRight();
                    }, 16)
                }


                break;
            case 37:
                if(idShipMoveLeft==null){
                    idShipMoveLeft = setInterval(function () {
                        shooter.moveLeft()
                    }, 16)
                }

                break;
            case 32:
                if (shooter.bullet == null)
                    shooter.shoot();
                break;
            case 80:
                if(pause == true){
                    console.log("Pause entfernt")
                    pause = false;
                    pauseDiv.style.display = 'none';
                    clearInterval(idAlienAttack);
                    //explodierendes Alien kicken um Standbild zu vermeiden

                    for(let i=0;i<alien_formation.length;i++){
                        if(alien_formation[i].isExploding){
                            alien_formation.splice(i,1);
                        }
                    }

                    spiel.gameMove(gLevel);

                }

                break;
            default :
                console.log("default");
                break;


        }

       /* if (key == 39 && idShipMoveRight == null) { // Pfeil-rechts

            idShipMoveRight = setInterval(function () {
                shooter.moveRight();
            }, 16)


        } else if (key == 37 && idShipMoveLeft == null) { //Pfeil-links
            idShipMoveLeft = setInterval(function () {
                shooter.moveLeft()


            }, 16)


        } else if (key == 32) { //Space, nur schießen, wenn kein Schuss unterwegs


            if (shooter.bullet == null)
                shooter.shoot();


        }*/
    } else {
        if (key == 80) { //Taste "P"
            console.log("Pause entfernt")
            pause = false;
            pauseDiv.style.display = 'none';
            clearInterval(idAlienAttack);
            //explodierendes Alien kicken um Standbild zu vermeiden

            for(let i=0;i<alien_formation.length;i++){
                if(alien_formation[i].isExploding){
                    alien_formation.splice(i,1);
                }
            }

            spiel.gameMove(gLevel);


        }
    }


}


var pauseListener = function (e) {
    /** bei "P" wird der Schussintevall und AlienIntervall unterbrochen,
      Pause angezeigt und der Eventlistener wieder entfernt
     * ToDo: Muss noch angepasst werden.
     * @type {Element}
     */

    let pauseDiv = document.getElementById('pause')
    let key = e.keyCode;
    if (key == 80) {

        clearInterval(idMoveDown);
        console.log("Pause gesetzt");
        pause = true;
        //div "pause" anzeigen
        pauseDiv.style.display = 'block';
        window.removeEventListener('keydown', pauseListener);

    }

}


/*<--------------------------------------------------- ABLAGE ------------------------------------------------------->*/
//ToDo
//Automaten einbauen
//Zustand_Opa_Automat bei GameOver();
//Zustand OA bei pause;
//Übergabe Score an OA Spieler;
//ScoreArray in Spieler por Alien und
//Abschussliste je Spiel nach Alilen id a1 - a6 (innerHTML);






