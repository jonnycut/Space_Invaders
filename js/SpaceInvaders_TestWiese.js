//muss noch schön gemacht werden!

(function(){

    var spiel;
/*--------------------------------------------Explosion---------------------------------------------------------------*/



    /**Objekt boomvar
     * @param Das Objekt hat sein Canvas, ein Array und eine Intervalvariable als Attribut.
     */
    var boomvar = {
        canvas: document.getElementById('canvasExp'),
        ctx: document.getElementById('canvasExp').getContext('2d'),
        particles: [],
        intTime: null
    }

//Errechnet einen Floatwert zwischen zwei Zahlen
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

//Erstellt eine Explosion
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

//zeichnet die Explosion
    function update(frameDelay) {

        boomvar.canvas.width = boomvar.canvas.width;

        // update und zeichne particles
        for (let i = 0; i < boomvar.particles.length; i++) {
            let particle = boomvar.particles[i];

            particle.update(frameDelay);
            particle.draw(boomvar.ctx);
        }
    }

//Führt beim Aufruf 2 Explosionen aus
    function doExplosion(x,y,color1,color2){
        boomvar.particles.clear;
        clearInterval(boomvar.intTime);
        console.log("Explosion")
        createExplosion(x, y, color1, 15);
        createExplosion(x, y, color2, 25);

        var fd = 1000.0 / 60.0;
        boomvar.intTime = setInterval(function () {
            update(fd);
        }, fd);
    }

    /*--------------------------------------------Game----------------------------------------------------------------*/

    /*-----------------------------------------Klasse Schuss----------------------------------------------------------*/

    /** Basisklasse Schuss
     * @param posX (int) - X Position des Schusses
     * @param posY (int) - Y Position des Schusses
     * @param alien(Alien) optional - bei Alienschuss, muss der Schuss wissen, zu welchem
     * Alien er gehört, damit die Bullet des Aliens wieder genullt werden kann
     */
    class Schuss {

        constructor(posX, posY, alien) {

            this.posX = posX;
            this.posY = posY;
            this.alien = alien;
            this.isAlive = true;
        }

        /**
         * Zählt die Y Position des Schusses hoch (direction=2) oder runter (direction = 1)
         * @param direction (int) alienschuss =2, ShipShoot=1
         */
        fly(direction) {

            if (direction == 1 && spiel.pause==false) {
                this.posY = this.posY - 8;
                this.inTouch(direction);
            } else if(direction ==2 && spiel.pause==false) {
                this.posY = this.posY + 4;
                this.inTouch(direction);
            }
        }

        /**
         * Zeichnet den Schuss auf das SpielCanvas
         * @type {string}
         */
        draw() {

            spiel.ctx.fillStyle = 'green';
            spiel.ctx.fillRect(this.posX, this.posY, 5, 10);
        }

        /**
         * Prüft, ob ein Schuss ein Alien oder das Schiff trifft.
         * Hier wird die Hitbox festgelegt.
         * Setzt auch "Bullet" des Schiffes auf NULL, wenn er außerhalb des Canvas ist
         * oder ein Alien getroffen hat.
         * @param direction (int) 1 = Schiffschuss, 2 = Alienschuss
         */
        inTouch(direction) {

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

    /** Basisklasse Schiff
     * Y Position ist fest auf 375
     * width (20px) und height (20px) sind fest, da nur für Explosion gebraucht
     * @param posX X-Position des Schiffes
     */
    class Schiff {

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

        /**
         * setzt die X Position des Schiffes 5px weiter nach Links (Y-5)
         * Sperrt den Spieler im Canvas ein (bei x>=0px)
         */
        moveLeft() {

            if (this.shooterX >= 10 && pause==false) {

                this.shooterX = this.shooterX - 5;

            } else {
                return;
            }
        }

        /**
         * setzt die X Position des Schiffes 5px weiter nach rechts
         * Sperrt den Spieler im Canvas ein (bei x>=670px)
         */
        moveRight() {

            if (this.shooterX <= 670 && pause==false) {
                this.shooterX = this.shooterX + 5;

            } else {
                return;
            }
        }

        /**
         * Update des hitListArrays je Spiel
         * danach Update der HTML Elemente
         * score wird aus hitList[N]*Faktor berechnet
         * @param: art: Alienart (0-4)
         */
        updateHitlist(art){

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

        /**
         * Setzt das Hitlistarray des Schiffes auf das übergebene Array
         * Aktualisiert danach die HTML Elemente des Spielfedes
         * Bricht ab, wenn das Übergebene Array länger ist als 5.
         */
        setHitlist(hitlist){

            if(hitlist.length>5){
                console.log("given Array is too long");
                return;
            }
            this.hitList=hitlist;
            this.updateHitlist(5);
        }

        /**
         * Animiert die Explosion des Schiffes
         * Hat Flurry wirklich schöner gemacht...
         * @type {Schiff}
         */
        explode(){

            document.getElementById('playerExp').play();
            doExplosion(spiel.shooter.shooterX,spiel.shooter.posY,"red","yellow");
        }

        /**
         * Zeichnet das Schiff an Position X (Y Position ist beim Schiff nicht veränderbar)
         */
        draw(X) {

            spiel.ctx.drawImage(this.img, X, this.posY, this.width,this.height);
        }

        /**Feuert einen Schuss aus aktueller Position +9 (Mitte des Schiffes)
         * mit Hilfe der schuss.fly(direction) Methode ab.
         * der Schuss startet immer auf Y=375 (Y-Position des Schiffes, nicht veränderbar)
         */
        shoot() {

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

    /**Basisklasse der Aliens
     * @param posX (int) X-Position des Aliens
     * @param posY (int) Y Position des Aliens
     * @param art (int, 1-4) benötigt zu Bilderauswahl
     */
    class Alien {

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

        /**
         * schiebt das Alien 1px weiter nach rechts
         * und wechselt das Bild random (Animation)
         * @param direction (String, "L|R")
         */
        move(direction) {

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

        /**
         * Schiebt das Alien 10px weiter nach unten,
         * wenn eine Y-Position von 280 erreich wird und
         * CoverBelts vorhanden sind, explodieren diese und
         * werden auf NULL gesetzt.
         */
        movedown() {

            this.posY = this.posY + 10; //change

            if(this.posY>=280 && spiel.cover.length>0){

                document.getElementById('playerExp').play();
                spiel.cover[0].explode();
                spiel.cover.splice(0,1);
            }
        }

        /**
         * Animiert die Explosion für ein Alien
         * Ist die schönere FlurryVersion
         * @type {Alien}
         * @param index (int) - Löscht Alien aus alien_formation[index]*/
        explode(index){

            var alien = this;
            this.isExploding = true;

            document.getElementById('ufoExp').play();
            doExplosion(this.posX,this.posY,"green","red");
            alien.bullet =null;
            spiel.alien_formation.splice(index,1);
        }

        /**
         * Feuert einen Schuss mit Hilfer der Schuss.fly() methode.
         * Der Rekursionsaufruf der Schussbewegung findet hier statt.
         * @type {Alien}
         */
        shoot() {

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

        /**
         * Zeichnet das Alien an seiner X und Y Position. 20px breit, 13px hoch.
         */
        draw() {

            spiel.ctx.drawImage(this.img, this.posX, this.posY, this.with, this.height);
        }
    }

    /** Basisklasse des SuperUfos
     * Erwartet im Constructor die XPosition des Ufos
     * @param posX
     */
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

        /**Schiebt das sUfo 3px weiter nach Rechts und wechselt bei jedem Aufruf das Bild (Animation)
         * moveLeft() nicht mehr nötig, da sUfo immer nur von Links nach Rechts fliegt
         * @type {number}
         */
        moveRight(){

            this.posX+=3;
            document.getElementById('sufo').play();
            let newBild = this.images[Math.floor(Math.random()*this.images.length)];
            if(newBild!=null)
                this.img.src= newBild;
        }

        /**
         * Zeichnet das Ufo an seiner X und Y Position. 20px breit, 13px hoch.
         */
        draw() {

            spiel.ctx.drawImage(this.img, this.posX, this.posY, this.with, this.height);
        }

        /**
         * Animiert die Explosion für das Ufo
         * @type {Alien}
         * @param index (int) - Löscht Alien aus alien_formation[index]*/
        explode(){

            this.isExploding = true;

            document.getElementById('ufoExp').play();

            doExplosion(this.posX,this.posY,"green","red");

            spiel.ufo=null;
        }
    }

    /*-----------------------------------------Klasse Cover---------------------------------------------------------------*/

    /** Ein Cover besteht aus 5*5 Pixeln, hat eine X Position, eine Y Position
     * und kann sich selber zeichnen (.draw() )
     * Mehrere Cover ergeben ein CoverBelt
     * @param posX int - X Position auf dem Canvas
     * @param posY int - Y Position auf dem Canvas
     */
    class Cover{

        constructor(posX, posY){

            this.posX =posX;
            this.posY = posY;
            this.height = 5;
            this.width = 5;
        }

        /**
         * Zeichnet den CoverPunkt an seiner X und Y Posiition
         * mit width und height (standard = 5x5)
         */
        draw(){

            spiel.ctx.beginPath();
            spiel.ctx.fillStyle = "ghostwhite";
            spiel.ctx.fillRect(this.posX,this.posY,this.height,this.width);

            spiel.ctx.closePath();
        }
    }

    /**
     * Ein CoverBelt setzt sich aus mehreren Covern zusammen
     * und besitzt ein offset (startX) an dem das erste Cover des Belts erscheint
     * Ein CoverBelt besteht aus 8x3 (Länge x Breite) Covern á 5x5px
     */
    class CoverBelt{

        constructor(startX){

            this.belt = [];
            this.startX = startX;
            this.fillBelt();
        }

        /**
         * Füllt das belt Array mit 24 Covern (8 Breit, 3 hoch)
         * wird im Constructor aufgerufen
         */
        fillBelt(){

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

        /**
         * Zeichnet den gesamten Belt
         * nutzt die .draw() Methode eines jeden Cover Objects
         * im Array
         */
        draw(){

            for(let i=0; i<this.belt.length;i++){
                this.belt[i].draw();
            }
        }

        /**
         * löscht ein einzelnes Cover Objekt aus dem belt Array
         */
        delteCover(index){

            spiel.coverHit.push(this.belt[index].posX+":"+this.belt[index].posY);
            this.belt.splice(index,1);

        }

        /**
         * Überprüft, ob die übergebene X und Y Position mit der X und Y Position
         * eines CoverObjekts übereinstimmt.
         * Wenn ja, wird das entsprechende Cover entfernt und "true"
         * zurückgegeben. Returnwert wird für die "NULL-Setzung" des Schusses verwendet.
         * (Hitbox: X-3 && X+3 ; y-3 && Y+3)
         * Erwartet außerdem die Richtung des Schusses
         * 1 für Schiff und 2 für Alien
         */
        inTouch(shootX,shootY, direction){

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

        /**
         * Animiert die Explosion der CoverBelts
         * Nutzt flurrys schöne Explosion
         */
        explode(){

            doExplosion(this.startX+20,307,"ghostwhite","grey");
        }
    }

    /*-----------------------------------------Klasse Game----------------------------------------------------------------*/

    /**
     * Basisklasse des gesamten Spiels
     */
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
            this.coverHit = [];

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

        /**löscht das aktuelle Canvas und zeichnet es neu.
         * Nutzt die .draw() Methoden von Alien, Schiff, CoverBelt und Schuss
         */
        drawCanvas() {

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
                        if(spiel.cover[i]!=null)
                            spiel.cover[i].draw();
                    }
                }
                requestAnimationFrame(game)
            }
            requestAnimationFrame(game);

        }

        /**Füllt game.alien_formation[] mit aliens, beginnend bei X=30 & Y=10
         * X abstand: 50px
         * Y Abstand alle 12 aliens 30
         *
         */
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

        /**
         * Erwartet einen String aus Alieninformationen.
         * Stringaufbau: alien1.X:alien1.Y:alien1.art;alien2.X:alien2.Y:alien2.art;alienN(...)
         * Baut aus diesem String neue Aliens und schiebt sie in spiel.Alien_formation.
         * Das initiale alien_formation Array wird dabei überschrieben.
         * Am Ende wird spiel.drawCanvas() neugestartet
         * @type {Array|*}
         */
        setAlienFormation(alienInfo){

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

        /**
         * Liefert einen String aus dem aktuellen alien_formation Array zurück:
         * StringFormat: alien1.X:alien1.Y:alien1.art;alien2.X:alien2.Y:alien2.art;(...);alienN;
         * @type {string}
         */
        getAlienFormationString(){

            let alienString ="";

            for(let i = 0; i<this.alien_formation.length;i++){
                alienString += this.alien_formation[i].posX +":" +this.alien_formation[i].posY+ ":" + this.alien_formation[i].art + ";";
            }
            return alienString;
        }

        /**
         * Liefert einen CoverBelt aus dem game.cover[] zurück
         * @param number - Index, welcher Belt zurückgeliefert werden soll.
         * @returns {string}, null, wenn kein CoverBelt and Index[NUMBER] vorhanden.
         */

        getCoverBelt(){
            if(this.cover.length==null){
                return null;
            }

            let coverString="";
            for(let i =0; i<this.coverHit.length-1;i++){
                coverString += this.coverHit[i]+";";
            }

            return coverString;
        }

        setCoverBelt(beltString){

            console.log(beltString);

            if(beltString ==null){
                this.coverBelt = null;
                return;
            }
            this.coverHit = beltString.split(';');

            for(let i =0; i<this.coverHit.length-1;i++){
                let posX = this.coverHit[i].split(':')[0];
                let posY = this.coverHit[i].split(':')[1];

                for(let position=0;position<this.cover.length-1;position++){
                    for(let j=0; j<this.cover[position].belt.length-1;j++){
                        if(this.cover[position].belt[j].posX==posX && this.cover[position].belt[j].posY==posY){
                            this.cover[position].belt.splice(j,1);
                        }
                    }
                }

            }



        }

        /**
         * Sorgt für die Bewegung der Aliens.
         * Nach rechts bis Canvasrand, 10px runter,
         * Nach links bis Canvasrand and again.
         * bei alien.posY>=90 wird superUfo aufgerufen.
         * Wenn getInvasion = flase -> Level-Up
         * @type {string}
         */
        gameMove(level) {

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

        /**
         * Sucht random ein Alien aus alien_formation aus
         * und lässt es schießen.
         * Intervall: alle 1500ms
         * Lässt sich mit dem Attribit game.idAlienAttack resetten.
         * @type {number}
         */
        alien_attack() {

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

        /**
         * Errechnet Zufallszahl zwischen 0 und alien_formation.length, wenn <=3, kein Ufo vorhanden und ufoCount < XX
         * Ufos schon da waren, wird Ufo erstellt.
         * @type {number}
         */
        superUfo(){

            let random=Math.floor(Math.random()*spiel.alien_formation.length);

            if(random<=3 && this.ufo==null && this.ufoCount<10){
                this.ufo=new Ufo(30);
                this.ufoCount++;
            }
        }

        /**
         * Cleart alle Intervalle, entfernt alle EventListener
         * und schaltet den Hauptautomaten in Zustand 5 um.
         * @type {Element}
         */
        gameOver() {

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

        /**Liefert true, wenn mind. 1 Alien in Alien_formation[]
         * sonst false
         * @type {boolean}
         */
        getInvasion() {

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

        if(playerData.alienFormation.length!=null){
            spiel.setAlienFormation(playerData.alienFormation);
            console.log("set Aliens")

        }else{
            spiel.baueAlienFormation();
        }

        if(playerData.coverFormation != null){
            spiel.setCoverBelt(playerData.coverFormation);
        }


        spiel.gLevel = level;
        spiel.drawCanvas();
        spiel.gameMove(level);
    }


    /*-----------------------------------------EventListeners-------------------------------------------------------------*/

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

    /** Überwacht, ob ein Tab aktiv ist und setzt spiel.pause = true,
     * wenn Tab inaktiv (Tabwechsel, oder Fenster minimiert.
     *
     * @param e
     */
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
     * @type {Element}
     */
    var pauseListener = function (e) {

        let pauseDiv = document.getElementById('pause');
        let key = e.keyCode;
        if (key == 80) {

            clearInterval(spiel.idMoveDown);

            spiel.pause = true;
            //div "pause" anzeigen
            pauseDiv.classList.add('anzeigen');
            window.removeEventListener('keydown', pauseListener);
        }
    }

    //----------------------------------------Datenbank-------------------------------------------------------------

    var dbAusgabe=[];

    /**
     * Holt sich die Daten aus der Datenbank, sobald die Anfrage abgeschlossen ist (readyState),
     * wird Ã¼ber baueHighscore(string) die HighscoreTabelle gebaut.
     * @type {XMLHttpRequest}
     */
    function holen() {

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', '../datenbank/datenbank.php', true);
        xmlhttp.addEventListener('readystatechange', function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                //console.log(xmlhttp.responseText);
                dbAusgabe=JSON.parse(xmlhttp.responseText);
                highscoreBauen(dbAusgabe,document.getElementById('tbody'));
            }
        });
        xmlhttp.send();
    }

    /**
     * Schreibt die Werte von Spieler.name und Spieler.score in die Datenbank
     * @type {XMLHttpRequest}
     */
    function send() {

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', '../datenbank/datenbank.php', true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //@ToDo: OPa, warum nochmal holen??
        //funktioniert auch ohne den Quatsch.... bitte testen und bestÃ¤tigen!

        /*xmlhttp.addEventListener('readystatechange', function () {

         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
         holen();
         }

         });*/
        xmlhttp.send("spieler=" + encodeURIComponent(spieler.name) +  "&score=" + encodeURIComponent(spieler.score));
    }

    //----------------------------------------localStorage----------------------------------------------------------


    /**Objekt playerData
     * @param Das Objekt beinhaltet alle notwendigen Attribute und ein Spielstand zu speichern und ggf. wiederherstellen.
     */
    var playerData = {
        name: "",
        diff: "",
        level: "1",
        live: "3",
        highscore: "0",
        design: "",
        alien1: "0",
        alien2: "0",
        alien3: "0",
        alien4: "0",
        alien5: "0",
        alienFormation:"",
        coverFormation: "",
        close: "false"
    };

    /**
     * Holt sich die Spieldaten aus den HTML-Elementen und speichert sie als String in
     * den zugehörigen Attributen von PlayerData
     */
    function getData() {

        playerData.name = document.getElementById('name').value;
        playerData.diff = spiel.gLevel;
        playerData.level = document.getElementById('level').innerHTML;
        playerData.live = document.getElementById('l1').innerHTML;
        playerData.highscore = document.getElementById('score').innerHTML;
        playerData.design = gewModus;
        playerData.alien1 = document.getElementById('a1').innerHTML;
        playerData.alien2 = document.getElementById('a2').innerHTML;
        playerData.alien3 = document.getElementById('a3').innerHTML;
        playerData.alien4 = document.getElementById('a4').innerHTML;
        playerData.alien5 = document.getElementById('a5').innerHTML;
        playerData.alienFormation = spiel.getAlienFormationString();
        playerData.coverFormation = spiel.getCoverBelt();
    }

    /**
     * Holt mit getData(); die aktuellen Werte und speichert
     * das PlayerData Objekt im LocalStorage (wenn der Browser dies unterstützt)
     */
    function saveData() {

        getData();
        if (typeof(localStorage) !== "undefined"){
            localStorage.setItem('playerData', JSON.stringify(playerData));
        }
    }

    /**
     * Lädt die Daten aus dem LocalStorage und speichert diese im Objekt PlayerData
     */
    function loadData() {

        if (typeof(localStorage) !== "undefined")
            playerData = JSON.parse(localStorage.getItem('playerData'));
    }

    /**
     * Wenn Daten im localStorage hinterlegt sind, werden diese durch loadData() im playerData Objekt
     * gespeichert und in die entsprechenden Variablen bzw. HTML-Elemnte geschrieben.
     * "Name" und "Leben" werden immer gesetzt, die restlichen Daten nur,
     * wenn das Window in der vorherigen Sitzung geschlossen wurde
     */
    function setData() {

        if(localStorage.length!=0) {
            loadData();
            document.getElementById('name').value = playerData.name;
            document.getElementById('l1').innerHTML=playerData.live;
        }
        if(playerData.close == "true"){
            document.getElementById('name').value = playerData.name;
            gewLevel = playerData.diff;
            document.getElementById('level').innerHTML = playerData.level;
            document.getElementById('l1').innerHTML = playerData.live;
            document.getElementById('score').innerHTML = playerData.highscore;
            gewModus = playerData.design;
            document.getElementById('a1').innerHTML = playerData.alien1;
            document.getElementById('a2').innerHTML = playerData.alien2;
            document.getElementById('a3').innerHTML = playerData.alien3;
            document.getElementById('a4').innerHTML = playerData.alien4;
            document.getElementById('a5').innerHTML = playerData.alien5;
            /*spiel.setAlienFormation(playerData.alienFormation);*/
            /*spiel.setCoverBelt(playerData.coverFormation);*/
        }
    }

    /**
     * Resettet alle Daten des PlayerData Objektes und schreibt
     * diese in den localStorage (sofern der Browser dies unterstützt)
     * @type {string}
     */
    function reset(){

        playerData.diff = "";
        playerData.level = "1";
        playerData.live = "3";
        playerData.highscore = "0";
        playerData.design = "";
        playerData.alien1 = "0";
        playerData.alien2 = "0";
        playerData.alien3 = "0";
        playerData.alien4 = "0";
        playerData.alien5 = "0";
        playerData.alienFormation = "";
        playerData.coverFormation = "";
        playerData.close ="false";

        if (typeof(localStorage) !== "undefined")
            localStorage.setItem('playerData', JSON.stringify(playerData));
    }

    /*------------------------------------------Automat---------------------------------------------------------------*/

/*------------------------------------------variablen-------------------------------------------------------------------*/
    "use strict";
    var spieler = {name: null, score: 0};
    var zustand = {status: 0};
    var gewLevel;
    var gewModus;


    /*-------------------------------------------functions------------------------------------------------------------*/

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



    /**Function für die Design Wahl
     * @param Es wird eine Grafik mit einem RadioButton verknüpft, um so Parameter zu speichern.
     * Diese Function befindet sich ausserhalb des Automaten, dar diese immer nutzbar ist(zu jeder Zeit).
     */


    //WahlLevel
    //WahlDesign

    /*---------------------------------------------controller---------------------------------------------------------*/

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


})();
/**Function für EasterEgg
 * Beim Klick auf einen bestimmten Stern wird ein EasterEgg freigeschaltet
 * Dieses bewegt sich dan durch den Bildschirm und macht sich durch einen Sound
 * bemerkbar. Diese Function ist nur einmal nutzber.
 * Diese Function befindet sich ausserhalb des Automaten, dar diese immer nutzbar ist(zu jeder Zeit).
 */

/*--------------------------------------------Funktionen die immer gebraucht werden-----------------------------------*/
function egg() {

    document.getElementById("flurry").classList.add('anzeigen');
    document.getElementById("egg").classList.add('NoDisplay');
    document.getElementById("egg-sound").play();
    setTimeout(function () {
        document.getElementById("flurry").classList.remove('anzeigen');
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
