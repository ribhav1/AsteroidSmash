var windowW, windowH;
var enterNameInput, playButton;
var playerName;

var rSlider, gSlider, bSlider;
var rColor, gColor, bColor;

var player;
var asteriod;

var score = 0;
var scoreIncrease = 0;

var spawnSpeed = 30;

var gameState = 1;

var asteriodImg;

var p;
var pVel;
var force;
var pos;
var fDirection;
var fireColor;
var playerColor;
var touch;
var forcePush;

var bullet;
var playerX, playerY;

var bulletGroup, asteriodGroup, powerUpGroup;

var pCollider;
var pColliderGroup;

var score = 0;
var health = 25;

var angle;

var difIncrease = 60;

var powerUp;
var fullautoIcon;
var morehealthIcon;
var bulletspeedIcon;

var bulletSpeed = 15;

var playerColorPreview;

var shootMode = "semiauto";

var timer = 2;
var timerStart;
var textY = 250;

function preload(){
    asteriodImg = loadImage("tAsteriod.png");

    fullautoIcon = loadImage("fullautoIcon.png");
    morehealthIcon = loadImage("morehealthIcon.png");
    bulletspeedIcon = loadImage("bulletspeedIcon.png");
}

function setup(){
    windowW = windowWidth - 15
    windowH = windowHeight - 21

    createCanvas(windowW, windowH);
    
    p=createVector(width/2,height/2)
    pVel=createVector(0,0);
    force=createVector(0,0);
    pos = 10;
    fDirection = 0;
    angle = 0;

    if(gameState === 1){
        enterNameInput = createInput("Enter Username");
        enterNameInput.center();

        playButton = createButton("Play");
        playButton.position((windowW / 2) - (playButton.width / 2), (windowH / 2) + 20);    

        rSlider = createSlider(0, 255, 0, 0);
        rSlider.position((windowW / 2) - (rSlider.width / 2), (windowH / 2) + 50);    
        gSlider = createSlider(0, 255, 0, 0);
        gSlider.position((windowW / 2) - (gSlider.width / 2), (windowH / 2) + 80);    
        bSlider = createSlider(0, 255, 0, 0);
        bSlider.position((windowW / 2) - (bSlider.width / 2), (windowH / 2) + 110); 
    }

    player = new rocket();

    bulletGroup = new Group();
    asteriodGroup = new Group();
    pColliderGroup = new Group();
    powerUpGroup = new Group();

    pCollider = createSprite(798, 474, 30, 30);
    pCollider.addToGroup(pColliderGroup);

}

function draw(){
    background(60);
    frameRate(200);

    pCollider.position.x = p.x;
    pCollider.position.y = p.y;

    pCollider.visible = false;
    pCollider.setCollider("rectangle", 0, 0, 30, 30);

    if(gameState === 1){
        playButton.mousePressed(()=>{
            gameState = 2;
            playerName = enterNameInput.value();
        });   
        rColor = rSlider.value();
        gColor = gSlider.value();
        bColor = bSlider.value();
        
        player.playerColor = color(rColor, gColor, bColor);
        
        //Preview to see what the player will look like before game starts
        push();
        fill(player.playerColor);
        noStroke();
        translate(p.x, p.y + 150);
        beginShape();
        vertex(-9, -9);
        vertex(11, -9);
        vertex(20, 0);
        vertex(11, 11);
        vertex(-9, 11);
        endShape();
        pop();
    }
    if(gameState === 2){
        push();
        textSize(22);
        fill(255);
        text(playerName + "'s" + " Score: " + score, 50, 40);
        text("Health: " + health, 50, 60);
        pop();
        enterNameInput.hide();
        playButton.hide();
        rSlider.hide();
        gSlider.hide();
        bSlider.hide();
        spawnAsteriods();
        spawnPowerUp();
        if(frameCount % 350 === 0){
            difIncrease--;
        }
        if(shootMode === "fullauto"){
            if (mouseIsPressed) {
                if (mouseButton === LEFT) {
                    if(frameCount % 10 === 0){
                        spawnBullets();
                    }
                }
            }
        }      
        for(var i = 0; i < asteriodGroup.length; i++){
            var x = asteriodGroup.get(i).position.x;
            var y = asteriodGroup.get(i).position.y;
            if(asteriodGroup.get(i).overlap(bulletGroup)){
                asteriodGroup.get(i).remove();
                score++;
            }
            if(isTouching(asteriodGroup.get(i), pCollider)){
                 if(health > 0){
                     asteriodGroup.get(i).remove();
                     health--;
                 }
            }       
            if(x > 0 && x < windowW){
                 if(y > windowH){
                    asteriodGroup.get(i).remove();
                    health--;
                }
            }
        }
        for(var i = 0; i < powerUpGroup.length; i++){
            if(powerUpGroup.get(i).overlap(pColliderGroup) || powerUpGroup.get(i).overlap(bulletGroup)){
              if(powerUpGroup.get(i).type === "fullauto"){
                shootMode = "fullauto";
              }
              if(powerUpGroup.get(i).type === "morehealth"){
                health += 25;
                timerStart = true;
              
              }
              if(powerUpGroup.get(i).type === "bulletspeed"){
                bulletSpeed += 2;
              }
              powerUpGroup.get(i).remove();
            }
          }
          if(timerStart === true){
            if(frameCount % 60 === 0) { 
              if(timer > 0){
                timer -= 1;
              }
            }
            if(timer > 0){
              textY -= 2;
              fill(0, 240, 30);
              text("+25 Health", 60, textY);
            } 
            if(timer === 0){
              timerStart = false;
              timer = 2;
              textY = 250;
            }
          }
          console.log(timer);
        if(health === 0){
            gameState = 3;
        }
        player.display();
        player.movePlayer();
        drawSprites();
    }
    if(gameState === 3){
        fill(255);
        textSize(22);
        text(playerName + "'s" + " Final Score: " + score, (windowW / 2) - 200, windowH / 2);
    }
}

function spawnBullets(){
    bullet = createSprite(p.x, p.y, 10, 10);
    bullet.draw = function() { ellipse(0,0,10,10) } 
    bullet.life = 100;
    bullet.setSpeed(bulletSpeed, degrees(angle));
    bullet.addToGroup(bulletGroup);
    bullet.setCollider("rectangle", 0, 0, 10, 10);
}
function spawnAsteriods(){
    if(frameCount % difIncrease === 0){
    var randY = Math.round(random(-200, 0));
    var randX = Math.round(random(0, windowW));
    var randDirection = Math.round(random(45, 135));
    asteriod = createSprite(randX, randY, 10, 10);
    asteriod.addImage(asteriodImg);
    asteriodImg.resize(100, 70);
    asteriod.setSpeed(4, randDirection);
    if(randDirection > 90){
        asteriod.rotation = randDirection - 30;
    }
    asteriod.life = 400;
    asteriod.addToGroup(asteriodGroup);
    asteriod.setCollider("circle", 0, 0, 40);
    }
}
function mousePressed() {
    if(shootMode === "semiauto" || shootMode === "fullauto"){
   spawnBullets();
    }
}

function spawnPowerUp(){
    if(frameCount % 500 === 0){
        var randX = random(15, windowW - 15);
        var randY = random(15, windowH - 15);
        var powerUp = createSprite(randX, randY, 50, 50);
        powerUp.type = "nothing"
        fullautoIcon.resize(100, 100);
        morehealthIcon.resize(100, 100);
        bulletspeedIcon.resize(100, 100);
        powerUp.life = 400;
        powerUp.setCollider("circle", 0, 0, 50);
        var rand = Math.round(random(1, 3));
        switch(rand){
            case 1: powerUp.type = "fullauto";
                    powerUp.addImage(fullautoIcon);    
            break;
            case 2: powerUp.type = "morehealth";
                    powerUp.addImage(morehealthIcon);
                break;
            case 3: powerUp.type = "bulletspeed";   
                    powerUp.addImage(bulletspeedIcon);
                break;
        }
        powerUpGroup.add(powerUp);
    }   
}