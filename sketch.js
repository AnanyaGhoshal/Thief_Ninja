var space, spaceImg;
var ninja, ninjaflying, ninjadead;
var invisibleline;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var coin, coinImg, coinImage, coinGroup;
var gold, goldImg, goldImage, goldGroup;
var score;
var astroids, astroidsImg, astroidsGroup;
var diamond, diamondImg, diamondGroup;
var gameover, gameoverImg;
var restart, restartImg;
var uparrow, uparrowImg;
var enemy, enemyImg;
var weapon, weaponImg, weaponGroup;
var obstacle, obstacleImg, obstacleGroup;
var coinSound, jump, gameoverSound;

function preload(){

spaceImg = loadImage("space.png");
ninjaflying = loadAnimation("Glide_000.png","Glide_001.png","Glide_002.png","Glide_003.png","Glide_004.png","Glide_005.png","Glide_006.png","Glide_007.png","Glide_008.png","Glide_009.png"); 
ninjadead = loadAnimation("Idle__008.png");
coinImg = loadImage("coin.png");
coinImage = loadImage("gold.png");
goldImg = loadImage("ruppee.png");
goldImage = loadImage("rubi.png");
astroidsImg = loadImage("astroids.png");
diamondImg = loadImage("diamond.png");
gameoverImg = loadImage("gameover.png");
restartImg = loadImage("play.png");
uparrowImg = loadImage("up.png");
enemyImg = loadImage("enemy.png");
weaponImg = loadImage("laser.png");
obstacleImg = loadImage("obstacle.png");
  
coinSound = loadSound("coin.mp3");
jump = loadSound("jump.mp3"); 
gameoverSound = loadSound("gameover.mp3");

}


function setup() {
 createCanvas(500,400);
  space = createSprite(250,300,500,10);
  space.addImage(spaceImg);
  ninja = createSprite(180,200,500,10);
  ninja.addAnimation("flying",ninjaflying);
  ninja.addAnimation("dying",ninjadead);
  ninja.scale = 0.2;
  //ninja.debug =true;
  ninja.setCollider("rectangle",10,10,160,160);
  
  invisibleline = createSprite(250,370,500,10);
  invisibleline.visible = false;
  
  gameover = createSprite(248,200,500,10);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(450,70,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.4;
  restart.visible = false;
  
  uparrow = createSprite(450,370,10,10);
  uparrow.addImage(uparrowImg);
  uparrow.scale = 0.3;
  
  enemy = createSprite(40,170,10,10); 
  enemy.addImage(enemyImg);
  enemy.scale = 0.1;
  
  score = 0;
  
  coinGroup = createGroup();
  goldGroup = createGroup();
  diamondGroup = createGroup();
  astroidsGroup = createGroup();
  weaponGroup = createGroup();
  obstacleGroup = createGroup();
  coin = 0;
  gold = 0;
  diamond = 0;
  
}

function draw() {
 
  if(gameState===PLAY){
    
    space.velocityX = -10;
    
    spawnCoins();
    spawnGolds();
    spawnasteroids();
    spawndiamonds();
    spawnObstacles();
    spawnweapon();
    
    if(mousePressedOver(uparrow)){
    ninja.velocityY = -2;
    jump.play();
      
  }
    
    ninja.velocityY = ninja.velocityY + 0.1;
    
    enemy.y = ninja.y;
    
    score = score+Math.round(getFrameRate()/60);
    
    if(ninja.isTouching(coinGroup)){
      
      coinGroup.destroyEach();
      score = score +5;
      coin = coin+1;
      coinSound.play();
      
    }
    
    if(ninja.isTouching(goldGroup)){
      
      goldGroup.destroyEach();
      score = score +10;
      gold = gold+1;
      coinSound.play();
      
    }
    
    if(ninja.isTouching(diamondGroup)){
      
      diamondGroup.destroyEach();
      score = score +50;
      diamond = diamond+1;
      coinSound.play();
      
    }
    
    
    if(ninja.isTouching(invisibleline)||ninja.isTouching(astroidsGroup)|| ninja.isTouching(obstacleGroup) || ninja.isTouching(weaponGroup)){
      
      gameoverSound.play();
      gameState = END;
      
    }
    
  }else if(gameState===END){
    ninja.changeAnimation("dying",ninjadead);
    space.velocityX = 0;
    ninja.velocityY = 0;
    coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
    goldGroup.setVelocityXEach(0);
    goldGroup.setLifetimeEach(-1);
    astroidsGroup.setVelocityYEach(0);
    astroidsGroup.setLifetimeEach(-1);
    diamondGroup.setVelocityXEach(0);
    diamondGroup.setLifetimeEach(-1);
    weaponGroup.setVelocityXEach(0);
    weaponGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    uparrow.visible = false;
    gameover.visible = true;
    restart.visible = true;
    ninja .x = 100;
    ninja .y = 200;
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  ninja.collide(invisibleline);
  
  if(space.x<0){
    space.x = space.width/2;
  }
  
  
  
  
  
  drawSprites();
  
  
  fill("white");
  textSize(20);
  text("Score: "+score,380,30);
  
  if(gameState===END){
  fill("yellow");
  textSize(20);
  text("Coins: "+coin,30,50);
  
  fill("yellow");
  textSize(20);
  text(" "+gold,86,69);
    
  fill("lightgreen");
  textSize(20);
  text("Diamond: "+diamond,25,30);
  }
}

function spawnCoins(){
  
  if(frameCount % 15 === 0){
    var coin = createSprite(490,50,10,10);
    coin.velocityX = -(10+2*score/200);
    coin.lifetime = 180;
    coin.y = Math.round(random(250,370));
  
   var rand;
  
   rand = Math.round(random(1,2));
   
  switch(rand){
      case 1: coin.addImage(coinImg);
              coin.scale = 0.05;
      break;
      case 2: coin.addImage(coinImage);
              coin.scale = 0.05;
      break;
  }
    coinGroup.add(coin);
    
  }
}

function spawnGolds(){
  
  if(frameCount % 30 === 0){
    var gold = createSprite(490,50,10,10);
    gold.velocityX = -(10+2*score/200);
    gold.lifetime = 180;
    gold.y = Math.round(random(250,370));
  
   var rand;
  
   rand = Math.round(random(1,2));
   
  switch(rand){
      case 1: gold.addImage(goldImg);
              gold.scale = 0.02;
      break;
      case 2: gold.addImage(goldImage);
              gold.scale = 0.01;
      break;
  }
    goldGroup.add(gold);
    
  }
}

function spawnasteroids(){
  
  if(frameCount % 200 === 0){
    
    var astroids = createSprite(490,70,10,10);
    astroids.addImage(astroidsImg);
    astroids.scale = 0.1;
    astroids.velocityY = (3+2*score/50);
    astroids.lifetime = 160;
    astroids.x = Math.round(random(90,490));
    //astroids.debug = true;
    astroidsGroup.add(astroids);
  }
}

function spawndiamonds(){
  
   if(frameCount % 2500 === 0){
    var diamond = createSprite(490,50,10,10);
    diamond.addImage(diamondImg);
    diamond.scale = 0.15;
    diamond.velocityX = -(6+2*score/150);
    diamond.lifetime = 180;
    diamond.y = Math.round(random(200,370));
    diamondGroup.add(diamond);
   
  }
}

function spawnObstacles(){
  
  if(frameCount % 300 === 0){
    var obstacle = createSprite(490,100,10,10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(8+2*score/50);
    obstacle.lifetime = 160;
    obstacle.y = Math.round(random(150,350));
    obstacleGroup.add(obstacle);
    
  }
}

function spawnweapon(){
  if(frameCount % 500 === 0){
      var weapon = createSprite(100,50,10,10);
      weapon.addImage(weaponImg);
      weapon.scale = 0.02;
      weapon.y = enemy.y;
      weapon.velocityX = 3;
      weapon.lifetime = 180;
      weaponGroup.add(weapon);
    
    }
}

function reset(){
  gameState = PLAY;
  ninja.changeAnimation("flying",ninjaflying);
  ninja.x = 180;
  score = 0;
  coin = 0;
  gold = 0;
  diamond = 0;
  coinGroup.destroyEach();
  goldGroup.destroyEach();
  astroidsGroup.destroyEach();
  diamondGroup.destroyEach();
  weaponGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  uparrow.visible = true;
  
}