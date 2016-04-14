/**
 * Created by UFO on 03.2016.
 */
/*-----------------------------------------Globale Variablen----------------------------------------------------------*/



/*-----------------------------------------Klasse Schuss--------------------------------------------------------------*/
class Schuss {
    /** Basisklasse Schuss
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
         *
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
         *
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
         *
         * @param direction (int) 1 = Schiffschuss, 2 = Alienschuss
         */


        if (direction == 1) {
            if (this.posY <= 0) {
                spiel.shooter.bullet = null;


            }

            //coverTreffer vom Schiff aus

            for(let i =0; i< spiel.cover.length;i++){
                if(spiel.cover[i].inTouch(this.posX,this.posY,direction)){
                    this.isAlive = false;
                    spiel.shooter.bullet = null;
                }
                if(spiel.cover[i].belt.length<=0){
                    spiel.cover.splice(i,1);

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
                if(spiel.cover[i].inTouch(this.posX,this.posY,direction)){
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
     *
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

    moveLeft() {
        /**
         * setzt die X Position des Schiffes 5px weiter nach Links (Y-5)
         * Sperrt den Spieler im Canvas ein (bei x>=0px)
         */

        if (this.shooterX >= 10 && pause==false) {

            this.shooterX = this.shooterX - 5;


        } else {
            return;
        }


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
         * Update des hitListArrays je Spiel
         * danach Update der HTML Elemente
         * score wird aus hitList[N]*Faktor berechnet
         *
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


    explode(){
        /**
         * Animiert die Explosion des Schiffes
         * Hat Flurry wirklich schöner gemacht...
         *
         * @type {Schiff}
         */
        document.getElementById('playerExp').play();
        doExplosion(spiel.shooter.shooterX,spiel.shooter.posY,"red","yellow");


    }

    draw(X) {
        /**
         * Zeichnet das Schiff an Position X (Y Position ist beim Schiff nicht veränderbar)
         */

        spiel.ctx.drawImage(this.img, X, this.posY, this.width,this.height);
    }

    shoot() {
        /**Feuert einen Schuss aus aktueller Position +9 (Mitte des Schiffes)
         * mit Hilfe der schuss.fly(direction) Methode ab.
         * der Schuss startet immer auf Y=375 (Y-Position des Schiffes, nicht veränderbar)
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
         * Schiebt das Alien 10px weiter nach unten,
         * wenn eine Y-Position von 280 erreich wird und
         * CoverBelts vorhanden sind, explodieren diese und
         * werden auf NULL gesetzt.
         *
         */

        this.posY = this.posY + 10; //change

        if(this.posY>=280 && spiel.cover.length>0){

            document.getElementById('playerExp').play();
            spiel.cover[0].explode();
            spiel.cover.splice(0,1);


        }


    }
    explode(index){
        /**
         * Animiert die Explosion für ein Alien
         * Ist die schönere FlurryVersion
         *
         *
         * @type {Alien}
         * @param index (int) - Löscht Alien aus alien_formation[index]*/

        var alien = this;
        this.isExploding = true;

        document.getElementById('ufoExp').play();
        doExplosion(this.posX,this.posY,"green","red");
        alien.bullet =null;
        spiel.alien_formation.splice(index,1);

    }


    shoot() {
        /**
         * Feuert einen Schuss mit Hilfer der Schuss.fly() methode.
         * Der Rekursionsaufruf der Schussbewegung findet hier statt.
         *
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

    /** Basisklasse des SuperUfos
     *
     * Erwartet im Constructor die XPosition des Ufos
     *
     * @param posX
     */

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
        /**Schiebt das sUfo 3px weiter nach Rechts und wechselt bei jedem Aufruf das Bild (Animation)
         *
         * moveLeft() nicht mehr nötig, da sUfo immer nur von Links nach Rechts fliegt
         *
         * @type {number}
         */
        this.posX+=3;
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
         * @type {Alien}
         * @param index (int) - Löscht Alien aus alien_formation[index]*/


        this.isExploding = true;

        document.getElementById('ufoExp').play();

        doExplosion(this.posX,this.posY,"green","red");

        spiel.ufo=null;

    }

}
/*-----------------------------------------Klasse Cover---------------------------------------------------------------*/
class Cover{
    /** Ein Cover besteht aus 5*5 Pixeln, hat eine X Position, eine Y Position
     * und kann sich selber zeichnen (.draw() )
     * Mehrere Cover ergeben ein CoverBelt
     *
     *
     * @param posX int - X Position auf dem Canvas
     * @param posY int - Y Position auf dem Canvas
     */

    constructor(posX, posY){

        this.posX =posX;
        this.posY = posY;
        this.height = 5;
        this.width = 5;
    }

    draw(){
        /**
         * Zeichnet den CoverPunkt an seiner X und Y Posiition
         * mit width und height (standard = 5x5)
         */

        spiel.ctx.beginPath();
        spiel.ctx.fillStyle = "ghostwhite";
        spiel.ctx.fillRect(this.posX,this.posY,this.height,this.width);

        spiel.ctx.closePath();
    }


}

class CoverBelt{
    /**
     * Ein CoverBelt setzt sich aus mehreren Covern zusammen
     * und besitzt ein offset (startX) an dem das erste Cover des Belts erscheint
     * Ein CoverBelt besteht aus 8x3 (Länge x Breite) Covern á 5x5px
     */




    constructor(startX){

        this.belt = [];
        this.startX = startX;
        this.fillBelt();

    }

    fillBelt(){

        /**
         * Füllt das belt Array mit 24 Covern (8 Breit, 3 hoch)
         * wird im Constructor aufgerufen
         */

        let posX =this.startX;
        let posY =300;

        for(let i=0; i<24;i++){

            this.belt[i]= new Cover(posX,posY);
            posX= posX+5;

            if(posX>=this.startX+40){

                posX=this.startX;
                posY = posY+4;
            }

        }

    }

    draw(){
        /**
         * Zeichnet den gesamten Belt
         * nutzt die .draw() Methode eines jeden Cover Objects
         * im Array
         */

        for(let i=0; i<this.belt.length;i++){
            this.belt[i].draw();
        }
    }

    delteCover(index){
        /**
         * löscht ein einzelnes Cover Objekt aus dem belt Array
         */
        this.belt.splice(index,1);
    }

    inTouch(shootX,shootY, direction){
        /**
         * Überprüft, ob die übergebene X und Y Position mit der X und Y Position
         * eines CoverObjekts übereinstimmt.
         * Wenn ja, wird das entsprechende Cover entfernt und "true"
         * zurückgegeben. Returnwert wird für die "NULL-Setzung" des Schusses verwendet.
         * (Hitbox: X-3 && X+3 ; y-3 && Y+3)
         * Erwartet außerdem die Richtung des Schusses
         * 1 für Schiff und 2 für Alien
         *
         */

        //ToDo: hitbox anpassen
        if(direction == 1){
            for(let i=this.belt.length-1;i>=0;i--){

                if(shootX >= this.belt[i].posX-3 && shootX <=this.belt[i].posX+5  && shootY >= this.belt[i].posY-3 && shootY <= this.belt[i].posY+3){
                    this.delteCover(i);
                    return true;
                }

            }
        } else{

            for(let i=0;i<this.belt.length;i++){

                if(shootX >= this.belt[i].posX-3 && shootX <=this.belt[i].posX+5  && shootY >= this.belt[i].posY-3 && shootY <= this.belt[i].posY+3){
                    this.delteCover(i);
                    return true;
                }

            }
        }





    }

    explode(){

        /**
         * Animiert die Explosion der CoverBelts
         * Nutzt flurrys schöne Explosion
         */

        doExplosion(this.startX+20,307,"ghostwhite","grey");

    }

}


/*-----------------------------------------Klasse Game----------------------------------------------------------------*/
class Game{
    /**
     * Basisklasse des gesamten Spiels
     *
     */



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
         * Nutzt die .draw() Methoden von Alien, Schiff, CoverBelt und Schuss
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
    setAlienFormation(alienInfo){


        /**
         * Erwartet einen String aus Alieninformationen.
         * Stringaufbau: alien1.X:alien1.Y:alien1.art;alien2.X:alien2.Y:alien2.art;alienN(...)
         * Baut aus diesem String neue Aliens und schiebt sie in spiel.Alien_formation.
         * Das initiale alien_formation Array wird dabei überschrieben.
         * Am Ende wird spiel.drawCanvas() neugestartet
         *
         * @type {Array|*}
         */
        spiel.canvas.width = spiel.canvas.width;
        let alienArray =[];

        alienArray = alienInfo.split(';');


        let tmpArray = [];

        for(let i = 0; i<alienArray.length-1;i++){
            let alien = alienArray[i].split(':');

            tmpArray[i] = new Alien(parseInt(alien[0]),parseInt(alien[1]),parseInt(alien[2]));
        }



        this.alien_formation = tmpArray;

        spiel.drawCanvas();

    }

    getAlienFormationString(){
        /**
         * Liefert einen String aus dem aktuellen alien_formation Array zurück:
         * StringFormat: alien1.X:alien1.Y:alien1.art;alien2.X:alien2.Y:alien2.art;(...);alienN;
         *
         * @type {string}
         */

        let alienString ="";

        for(let i = 0; i<this.alien_formation.length;i++){
            alienString += this.alien_formation[i].posX +":" +this.alien_formation[i].posY+ ":" + this.alien_formation[i].art + ";";
        }

        return alienString;


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
         * Lässt sich mit dem Attribit game.idAlienAttack resetten.
         *
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

        if(random<=3 && this.ufo==null && this.ufoCount<10){
            this.ufo=new Ufo(30);
            this.ufoCount++;
        }
    }
    gameOver() {
        /**
         * Cleart alle Intervalle, entfernt alle EventListener
         * und schaltet den Hauptautomaten in Zustand 5 um.
         *
         * @type {Element}
         */




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

    /**Wenn das aktuelle Level > 10, wird um 10 verringert,
     * Sonst in 1er Schritten
     * Resettet ebenfalls den UfoCount, damit in jedem neuen Level
     * auch wieder sUfos erscheinen.
     *
     * @return: geändertes Level
     */

    levelUp(){


        document.getElementById('level-Up').play();
        if(this.gLevel<=10){
            this.gLevel--;
        }else{
            this.gLevel-=10;
        }
        spiel.ufoCount=0;
        document.getElementById('level').innerHTML++;
        return this.gLevel;
    }
}
/*-----------------------------------------Initialisierungsfunktion Game----------------------------------------------*/
/**Startfunktion,
 * meldet die Eventlistener am Window an
 * erstellt ein neues Spiel (new Game());
 * setzt das spiel.gLevel auf das übergebene Level,
 * erstellt mit spiel.baueAlien_formation() eine neue AlienFormation
 * Startet spiel.drawCanvas();
 * und spiel.gameMove();
 * @param level (int) Schwierigkeitsgrad, BewegungsIntervall der Aliens (kleiner = schneller)
 */

function initGame(level) {



    spiel = new Game();
    pause = false;

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
    spiel.gLevel = level;
    spiel.drawCanvas()
    spiel.gameMove(level);



}
/*-----------------------------------------EventListeners-------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------KeyUp----------------------------------------------------------------------*/
/**Eventlistener bei loslassen einer Taste
 * Unterbricht ShipmoveIntervalle
 * @type {Number}
 */

var keyUpListener = function (e) {


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
/**Genereller Listener, wird am window angemeldet
 * startet Rechts- / Linksbewegung bei Tastendruck
 *
 * @type {Element}
 */

var generalListener = function (e) {



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

                break;


        }


    } else {
        if (key == 80) { //Taste "P"

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
/** bei "P" wird der Schussintevall und AlienIntervall unterbrochen,
 Pause angezeigt und der Eventlistener wieder entfernt
 *
 * @type {Element}
 */

var pauseListener = function (e) {


    let pauseDiv = document.getElementById('pause')
    let key = e.keyCode;
    if (key == 80) {

        clearInterval(spiel.idMoveDown);

        spiel.pause = true;
        //div "pause" anzeigen
        pauseDiv.classList.add('anzeigen');
        window.removeEventListener('keydown', pauseListener);

    }

}











