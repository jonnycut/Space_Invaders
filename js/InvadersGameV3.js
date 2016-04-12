/**
 * Created by UFO on 03.2016.
 */
/*-----------------------------------------Globale Variablen----------------------------------------------------------*/



/*-----------------------------------------Klasse Schuss--------------------------------------------------------------*/
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



        if (direction == 1 && spiel.pause==false) {
            this.posY = this.posY - 8;
            this.inTouch(direction);
        } else if(direction ==2 && spiel.pause==false) {
            this.posY = this.posY + 4;
            this.inTouch(direction);
        }


    }

    draw() {
        /**
         * Zeichnet den Schuss auf das SpielCanvas
         * @type {string}
         */

        spiel.ctx.fillStyle = 'green';
        spiel.ctx.fillRect(this.posX, this.posY, 5, 10);
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
                spiel.shooter.bullet = null;


            }

            //coverTreffer vom Schiff aus

            for(let i =0; i< spiel.cover.length;i++){
                if(spiel.cover[i].inTouch(this.posX,this.posY)){
                    this.isAlive = false;
                    spiel.shooter.bullet = null;
                }
            }


            if(this.isAlive && spiel.ufo!=null && this.posX<=spiel.ufo.posX+42 &&this.posX>=spiel.ufo.posX && this.posY<=spiel.ufo.posY+26 && this.posY>=spiel.ufo.posY+2){
                spiel.ufo.explode();
                spiel.shooter.updateHitlist(4);
                spiel.shooter.bullet = null;
                document.getElementById('sufo').pause();
            }

            for (let i = 0; i < spiel.alien_formation.length; i++) {

                if (spiel.alien_formation[i] != null) {
                    if (this.isAlive&&(this.posX <= spiel.alien_formation[i].posX + 20 && this.posX >= spiel.alien_formation[i].posX) && (this.posY <= spiel.alien_formation[i].posY + 13 && this.posY >= spiel.alien_formation[i].posY+2)) {
                        spiel.shooter.updateHitlist(spiel.alien_formation[i].art);
                        this.isAlive=false;
                        spiel.alien_formation[i].explode(i);
                        //alien_formation.splice(i, 1);
                        spiel.shooter.bullet = null;

                    }
                }


            }
        } else if (direction == 2) {
            //Prüfung bei Alienschuss

            if (this.posY > 380) {
                this.isAlive=false;
                this.alien.bullet = null;
            }

            for(let i =0; i< spiel.cover.length;i++){
                if(spiel.cover[i].inTouch(this.posX,this.posY)){
                    this.isAlive = false;
                    this.alien.bullet = null;
                }
            }

            if (this.isAlive&&(this.posX >= spiel.shooter.shooterX && this.posX <= spiel.shooter.shooterX + 22) && (this.posY >= 370&& this.posY <380)) {
                this.isAlive = false;
                this.alien.bullet = null;
                spiel.shooter.explode();

                if(spiel.shooter.lives==1){
                    spiel.gameOver();
                }else{
                    console.log("Leben runter");
                    spiel.shooter.lives--;

                    document.getElementById('l1').innerHTML = spiel.shooter.lives;
                }
            }

        }

    }


}

/*-----------------------------------------Klasse Schiff--------------------------------------------------------------*/
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
        this.lives = document.getElementById('l1').innerHTML;
        this.img = new Image();
        this.img.src = "images/panzer02.png";
        this.soundShoot = document.getElementById('pShoot');
        this.hitList =[0,0,0,0,0];

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
    updateHitlist(art){
        /**
         * update des hitListArrays je Spiel
         * danach Update der HTML Elemente
         * score wird aus hitList[N]*Faktor berechnet
         * @param: art: Alienart (0-4)
         */
        if(art<5){
            this.hitList[art]++;

        }


        document.getElementById('a1').innerHTML=this.hitList[0];
        document.getElementById('a2').innerHTML=this.hitList[1];
        document.getElementById('a3').innerHTML=this.hitList[2];
        document.getElementById('a4').innerHTML=this.hitList[3];
        document.getElementById('a5').innerHTML=this.hitList[4];
        document.getElementById('score').innerHTML=this.hitList[0]*40+this.hitList[1]*30+this.hitList[2]*20+this.hitList[3]*10+this.hitList[4]*100;


    }

    setHitlist(hitlist){
        /**
         * Setzt das Hitlistarray des Schiffes auf das übergebene Array
         * Aktualisiert danach die HTML Elemente des Spielfedes
         * Bricht ab, wenn das Übergebene Array länger ist als 5.
         */

        if(hitlist.length>5){
            console.log("given Array is too long");
            return;
        }

        this.hitList=hitlist;
        this.updateHitlist(5);

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
        document.getElementById('playerExp').play();
        doExplosion(spiel.shooter.shooterX,spiel.shooter.posY,"red","yellow");

     /*   var ship = this;
        var exp= function(){
            //Schiff Größe 20x13px;
                ship.img.src='images/exp_g.png';
                ship.height+=8;
                ship.width+=30;
                ship.posY-=8;
            if(ship.height<60 && pause==false)
                requestAnimationFrame(exp);
        }
        if(pause ==false)
            requestAnimationFrame(exp);*/
    }

    draw(X) {
        /**
         * Zeichnet das Schiff an Position X (Y Position ist beim Schiff nicht veränderbar)
         */

        spiel.ctx.drawImage(this.img, X, this.posY, this.width,this.height);
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
                if(spiel.shooter.bullet!= null){
                    spiel.shooter.bullet.fly(1);
                    requestAnimationFrame(fire);
                }

            }
            requestAnimationFrame(fire)

        }


    }
}
/*-----------------------------------------Klasse Alien---------------------------------------------------------------*/
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
        this.soundShoot = document.getElementById('uShoot');
        switch (art) {
            case 0:
                this.images = spiel.images1;
                break;
            case 1:
                this.images = spiel.images2;
                break;
            case 2:
                this.images = spiel.images3;
                break;
            case 3:
                this.images = spiel.images4;
                break;

            default:
                this.images = spiel.images1;
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
        direction = spiel.moveDirection;

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

        //Flurrys Explosion...ToDo
        /*update();
        fuellen(this.posX,this.posY);
        alien_formation.splice(index,1);*/








     /**
         * Animiert die Explosion für ein Alien
         * Kann Flurry wahrscheinlich auch schöner.
         *
         *
         * @type {Alien}
         * @param index (int) - Löscht Alien aus alien_formation[index]*/

        var alien = this;
        this.isExploding = true;

        document.getElementById('ufoExp').play();
        doExplosion(this.posX,this.posY,"green","red");

        spiel.alien_formation.splice(index,1);


        /*var exp= function(){
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
        if(pause == false){
            requestAnimationFrame(exp);
        }*/
    }


    shoot() {
        /**
         * Feuert einen Schuss mit Hilfer der Schuss.fly() methode.
         * @type {Alien}
         */

        let alien = this;

        if (this.bullet == null && pause==false) {
            alien.soundShoot.play();
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

        spiel.ctx.drawImage(this.img, this.posX, this.posY, this.with, this.height);
    }
}

class Ufo{

    constructor(posX){
        this.images = spiel.images5;
        this.posX = posX;
        this.posY = 40;
        this.with = 50;
        this.height = 26;
        this.isExploding = false;
        this.img = new Image();
        this.img.src =this.images[0];

    }

    moveRight(){
        this.posX+=3;
        document.getElementById('sufo').play();
        let newBild = this.images[Math.floor(Math.random()*this.images.length)];
        if(newBild!=null)
            this.img.src= newBild;

    }

    moveLeft(){
        this.posX-=3;
        document.getElementById('sufo').play();
        let newBild = this.images[Math.floor(Math.random()*this.images.length)];
        if(newBild!=null)
            this.img.src= newBild;
    }

    draw() {
        /**
         * Zeichnet das Ufo an seiner X und Y Position. 20px breit, 13px hoch.
         */

        spiel.ctx.drawImage(this.img, this.posX, this.posY, this.with, this.height);
    }
    explode(){

   /**
         * Animiert die Explosion für das Ufo
         *
         *
         * @type {Alien}
         * @param index (int) - Löscht Alien aus alien_formation[index]*/

        var ufo = this;
        this.isExploding = true;

        document.getElementById('ufoExp').play();

        doExplosion(this.posX,this.posY,"green","red");

        spiel.ufo=null;

    }

}
/*-----------------------------------------Klasse Cover---------------------------------------------------------------*/
class Cover{

    constructor(posX, posY){

        this.posX =posX;
        this.posY = posY;
        this.height = 4;
        this.width = 4;
    }

    draw(){
        spiel.ctx.beginPath();
        spiel.ctx.fillStyle = "ghostwhite";
        spiel.ctx.fillRect(this.posX,this.posY,this.height,this.width);

        spiel.ctx.closePath();
    }


}

class CoverBelt{

    /*ToDo:
     - Wenn Aliens die Cover erreichen, müssen die Cover verschwinden
     - Explosion einfügen??
     - ggf. HitBox und Positionen der Cover nochmal überarbeiten
     - Dokumentation der Classen Cover und CoverBelt
     */

    constructor(startX){
        this.belt = [];
        this.startX = startX;
        this.fillBelt();

    }

    fillBelt(){

        let posX =this.startX;
        let posY =300;

        for(let i=0; i<30;i++){

            this.belt[i]= new Cover(posX,posY);
            posX= posX+4;

            if(posX>=this.startX+40){

                posX=this.startX;
                posY = posY+4;
            }

        }

    }

    draw(){
        for(let i=0; i<this.belt.length;i++){
            this.belt[i].draw();
        }
    }

    delteCover(index){
        this.belt.splice(index,1);
    }

    inTouch(shootX,shootY){
        //ToDo: hitbox anpassen

        for(let i=0;i<this.belt.length;i++){

            if(shootX >= this.belt[i].posX-3 && shootX <=this.belt[i].posX+5  && shootY >= this.belt[i].posY-5 && shootY <= this.belt[i].posY+5){
                this.delteCover(i);
                return true;
            }

        }


    }

}


/*-----------------------------------------Klasse Game----------------------------------------------------------------*/
class Game{



    constructor(){
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d'); // 2D-Kontext
        this.pause = false;
        this.gLevel;
        this.Spiel
        this.moveDirection="R";
        this.idAlienAttack;
        this.idShipMoveRight = null;
        this.idShipMoveLeft = null;
        this.idMoveDown=null;


        this.shooter;
        this.ufo = null;
        this.ufoCount = 0;
        this.alien_formation = [];
        this.cover = [new CoverBelt(40),new CoverBelt(300),new CoverBelt(600)];


        this.images1 =["images/alien01.png","images/alien01b.png",null,null,null,null];
        this.images2 =["images/alien02.png","images/alien02b.png",null,null,null,null];
        this.images3 =["images/alien03.png","images/alien03b.png",null,null,null,null];
        this.images4 =["images/alien04.png","images/alien04b.png",null,null,null,null];
        this.images5 =["images/alien05.png","images/alien05b.png",null,null,null,null];
        this.shooter = new Schiff(300);
    }


    drawCanvas() {
        /**löscht das aktuelle Canvas und zeichnet es neu.
         * Nutzt die .draw() Methoden von Alien, Schiff und Schuss
         *
         */

        let alien_formation = this.alien_formation;
        let shooter = this.shooter;

        var game = function (){

            spiel.canvas.width = spiel.canvas.width;

            for (let i = 0; i < alien_formation.length; i++) {

                    alien_formation[i].draw();


                if (alien_formation[i].bullet != null) {
                    alien_formation[i].bullet.draw();
                }

            }
            if(spiel.ufo != null){
                spiel.ufo.draw();
            }

            shooter.draw(shooter.shooterX);
            if (shooter.bullet != null){

                shooter.bullet.draw();

            }

            if(spiel.cover!=null){
                for(let i=0; i<spiel.cover.length;i++){
                    spiel.cover[i].draw();
                }
            }




            requestAnimationFrame(game)
        }
        requestAnimationFrame(game);

    }
    baueAlienFormation(){

        let positionX = 30;
        let positionY = 10;
        let art =0;

        for (let i = 1; i <= 48; i++) {

            this.alien_formation[i-1] = new Alien(positionX + 20, positionY,art);
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
         * bei alien.posY>=90 wird superUfo aufgerufen.
         *
         * Wenn getInvasion = flase -> Level-Up
         * @type {string}
         */

        let direction = this.moveDirection;
        let alien_formation = this.alien_formation;
        let ufoTmp = this.ufo;


        this.idMoveDown = setInterval(function () {
            // runter

            //ggf. eine Hilfsvariable half nutzen, um UFO unabhängig vom Richtungswechsel zu erzeugen

            if(spiel.ufo!=null){
                spiel.ufo.moveRight();
                if(spiel.ufo.posX>=spiel.canvas.width){
                    spiel.ufo = null;
                }
            }

            for (let i = 0; i < alien_formation.length; i++) {
                if (alien_formation[i] != null&&pause==false) {

                    alien_formation[i].move(direction);

                    if (alien_formation[i].posX >= 680&&!alien_formation[i].isExploding) {
                        alien_formation[i].posX--;
                        if(i<= 11 && alien_formation[i].posY>=90){
                            spiel.superUfo();
                        }
                        for (let a = 0; a < alien_formation.length; a++) {
                            alien_formation[a].movedown();

                            if(a>i&&direction=="R"){
                                alien_formation[a].move(direction);
                            }

                        }
                        direction = spiel.moveDirection= "L";
                    }



                    if (alien_formation[i].posX <= 0&&!alien_formation[i].isExploding) {
                        alien_formation[i].posX++;
                        if(i<= 11 && alien_formation[i].posY>=90){
                            spiel.superUfo();
                        }
                        for (let a = 0; a < alien_formation.length; a++) {
                            alien_formation[a].movedown();

                            if(a>i&&direction=="L"){
                                alien_formation[a].move(direction);
                            }

                        }
                        direction = spiel.moveDirection = "R";
                    }

                    if (alien_formation[i].posY >= 370) {
                        spiel.gameOver();
                    }
                }
            }


            if (!spiel.getInvasion()) {
                clearInterval(spiel.idMoveDown);
                clearInterval(spiel.idAlienAttack);
                spiel.ufo = null;


                level = spiel.levelUp();

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
        let alien_formation = this.alien_formation;

        let ufoCount = this.ufoCount;
        let ufo = this.ufo;

        this.idAlienAttack = setInterval(function () {
            if(spiel.pause==false){
                let rambo = alien_formation[Math.floor(Math.random() * alien_formation.length)];
                if (rambo != null)
                    rambo.shoot();

            }


        }, 1500);

    }

    superUfo(){
        /**
         * Errechnet Zufallszahl zwischen 0 und alien_formation.length, wenn <=3, kein Ufo vorhanden und ufoCount < XX
         * Ufos schon da waren, wird Ufo erstellt.
         *
         * @type {number}
         */
        let random=Math.floor(Math.random()*spiel.alien_formation.length);
        console.log(random);
        if(random<=3 && this.ufo==null && this.ufoCount<10){
            this.ufo=new Ufo(30);
            this.ufoCount++;
        }
    }
    gameOver() {
        /**
         * Cleart alle Intervalle und zeigt "Lost-Div" an
         *
         * @type {Element}
         */


        console.log("LOST");
        console.log(spiel.pause);
        clearInterval(spiel.idMoveDown);
        spiel.idMoveDown=null;
        clearInterval(spiel.idAlienAttack);
        document.cancelRequestAnimationFrame;
        spiel.pause == true;

        zustand.status=5;
        window.removeEventListener('keydown', generalListener);
        window.removeEventListener('keyup',pauseListener);
        window.removeEventListener('blur',lostFocusListener);



    }

    getInvasion() {
        /**Liefert true, wenn mind. 1 Alien in Alien_formation[]
         * sonst false
         *
         * @type {boolean}
         */

        let invasion = false;

        for (let i = 0; i < this.alien_formation.length; i++) {
            if (this.alien_formation[i] != null) {
                invasion = true;
            }
        }

        return invasion;

    }

    levelUp(){
        document.getElementById('level-Up').play();
        if(this.gLevel<=10){
            this.gLevel--;
        }else{
            this.gLevel-=10;
        }
        spiel.ufoCount=0;

        return this.gLevel;
    }
}
/*-----------------------------------------Initialisierungsfunktion Game----------------------------------------------*/

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
    window.addEventListener('blur',lostFocusListener);
    document.getElementById('pause').addEventListener('click',function(e){

        let key ={keyCode:80};
       generalListener(key);
    });







    document.getElementById('l1').innerHTML = spiel.shooter.lives;



   spiel.baueAlienFormation();

    console.log(level);


    spiel.gLevel = level;
    spiel.drawCanvas()
    spiel.gameMove(level);



}
/*-----------------------------------------EventListeners-------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------KeyUp----------------------------------------------------------------------*/
var keyUpListener = function (e) {
    /**Eventlistener bei loslassen einer Taste
     * Unterbricht ShipmoveIntervalle
     * @type {Number}
     */

    //nötig für eine weiche Bewegung des Schiffes!
    let key = e.keyCode;

    if (key == 39) { // Pfeil-rechts
        clearInterval(spiel.idShipMoveRight);

        spiel.idShipMoveRight = null;


    } else if (key == 37) { //Pfeil-links
        clearInterval(spiel.idShipMoveLeft);
        spiel.idShipMoveLeft = null;

    }
}
var lostFocusListener = function(e){
    let pauseDiv = document.getElementById('pause');
    spiel.pause = true;
    clearInterval(spiel.idMoveDown);
    clearInterval(spiel.idAlienAttack);
    pauseDiv.classList.add('anzeigen');

}

/*-----------------------------------------General Listener-----------------------------------------------------------*/
var generalListener = function (e) {

    /**Genereller Listener, wird am window angemeldet
     * startet Rechts- / Linksbewegung bei Tastendruck
     * ToDo: Pause bei "P"
     *
     * @type {Element}
     */

    let pauseDiv = document.getElementById('pause');
    let key = e.keyCode; //speichert den KeyCode des Events

    window.addEventListener('keydown', pauseListener);


    if (spiel.pause == false) {

        switch (key){
            case 39:
                if(spiel.idShipMoveRight==null){
                    spiel.idShipMoveRight = setInterval(function () {
                        spiel.shooter.moveRight();
                    }, 16)
                }


                break;
            case 37:
                if(spiel.idShipMoveLeft==null){
                    spiel.idShipMoveLeft = setInterval(function () {
                        spiel.shooter.moveLeft()
                    }, 16)
                }

                break;
            case 32:
                if (spiel.shooter.bullet == null)
                    spiel.shooter.shoot();
                break;
            case 80:
                if(spiel.pause == true){
                    console.log("Pause entfernt")
                    spiel.pause = false;
                    pauseDiv.style.display = 'none';
                    clearInterval(spiel.idAlienAttack);
                    //explodierendes Alien kicken um Standbild zu vermeiden

                    for(let i=0;i<spiel.alien_formation.length;i++){
                        if(spiel.alien_formation[i].isExploding){
                            spiel.alien_formation.splice(i,1);
                        }
                    }

                    spiel.gameMove(gLevel);

                }

                break;
            default :
                console.log("default");
                break;


        }


    } else {
        if (key == 80) { //Taste "P"
            console.log("Pause entfernt")
            spiel.pause = false;
            pauseDiv.classList.remove('anzeigen');
            clearInterval(spiel.idAlienAttack);
            //explodierendes Alien kicken um Standbild zu vermeiden

            for(let i=0;i<spiel.alien_formation.length;i++){
                if(spiel.alien_formation[i].isExploding){
                    spiel.alien_formation.splice(i,1);
                }
            }

            spiel.gameMove(spiel.gLevel);


        }
    }


}

/*-----------------------------------------Pause Listener-------------------------------------------------------------*/
var pauseListener = function (e) {
    /** bei "P" wird der Schussintevall und AlienIntervall unterbrochen,
      Pause angezeigt und der Eventlistener wieder entfernt
     * ToDo: Muss noch angepasst werden.
     * @type {Element}
     */

    let pauseDiv = document.getElementById('pause')
    let key = e.keyCode;
    if (key == 80) {

        clearInterval(spiel.idMoveDown);
        console.log("Pause gesetzt");
        spiel.pause = true;
        //div "pause" anzeigen
        pauseDiv.classList.add('anzeigen');
        window.removeEventListener('keydown', pauseListener);

    }

}

/*<--------------------------------------------------Explosion------------------------------------------------------->*/
/*var boomvar = {
    canvas: document.getElementById('myCanvas'),
    ctx: document.getElementById('myCanvas').getContext('2d'),
    particles: [],
    intTime: null
}

function randomFloat(min, max) {
    return min + Math.random() * (max - min);
}


//Ein einzelner Particle
function Particle() {
    this.s = 1.0;
    this.x = 0;
    this.y = 0;
    this.a = 10;
    this.radius = 10;
    this.color = "";
    this.vX = 0;
    this.vY = 0;
    this.sSpeed = 0.5;

    this.update = function (ms) {
        // verkleinern des Particle
        this.s -= this.sSpeed * ms / 1000.0;
        if (this.s <= 0) {
            this.s = 0;
        }

        // Bewegungsrichtung des Particle
        this.x += this.vX * ms / 1000.0;
        this.y += this.vY * ms / 1000.0;
    };

    this.draw = function (ctx) {
        boomvar.ctx.save();
        boomvar.ctx.translate(this.x, this.y);
        boomvar.ctx.scale(this.s, this.s);

        // zeichen des Particle
        boomvar.ctx.beginPath();
        boomvar.ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        boomvar.ctx.closePath();

        boomvar.ctx.fillStyle = this.color;
        boomvar.ctx.fill();
        boomvar.ctx.restore();
    };
}

// Erstellt eine Explosion
function createExplosion(x, y, color, count) {
    var minSize = 5;
    var maxSize = 10;
    var count = count;
    var minSpeed = 60.0;
    var maxSpeed = 200.0;
    var minSSpeed = 1.0;
    var maxSSpeed = 4.0;
    var color = color;


    for (let i = 0; i < 360; i += Math.round(360 / count)) {
        let particle = new Particle();

        particle.x = x;
        particle.y = y;

        particle.radius = randomFloat(minSize, maxSize);
        particle.color = color;
        particle.sSpeed = randomFloat(minSSpeed, maxSSpeed);
        let speed = randomFloat(minSpeed, maxSpeed);
        particle.vX = speed * Math.cos(i * Math.PI / 180.0);
        particle.vY = speed * Math.sin(i * Math.PI / 180.0);

        boomvar.particles.push(particle);
    }
}

function update(frameDelay) {
    /!*boomvar.ctx.fillStyle = "#FFF";*!/
/!*    boomvar.ctx.fillRect(0, 0, boomvar.ctx.canvas.width, boomvar.ctx.canvas.height);*!/

    // update und zeichne particles
    for (let i = 0; i < boomvar.particles.length; i++) {
        let particle = boomvar.particles[i];

        particle.update(frameDelay);
        particle.draw(boomvar.ctx);
    }
}*/


/*<--------------------------------------------------- ABLAGE ------------------------------------------------------->*/
//ToDo
//Automaten einbauen
//Zustand_Opa_Automat bei GameOver(); --> done 24.03.12:53 KNA
//Zustand OA bei pause; --> done 24.03.12:53 KNA
//Übergabe Score an OA Spieler; --> noch nötig? Werte könnten auch aus dem HTML Elementen geholt werden...?
//ScoreArray in Spieler por Alien und Abschussliste je Spiel nach Alilen id a1 - a6 (innerHTML)--> done 24.03.12:53 KNA







