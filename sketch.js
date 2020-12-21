
  var ground1,ground,playerC,enemyC,obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle5,mons,playB,play ,sa,se,sj,re,restart;
var score=0;

var gameState="s1";
function preload(){
 obstacle1 = loadImage("obstacle1.png");//obstacles
  obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
 playB=loadImage("play.png");
  obstacle5 = loadImage("obstacle5.png");
  sa=loadAnimation("s1.png","s2.png","s3.png","s4.png","s5.png");
  se=loadImage("fall.png");
  sj=loadImage("jump.png");
  restart=loadImage("r.png");
mons=loadAnimation("ezgif.com-crop.png","ezgif.com-crop-2.png","ezgif.com-crop-3.png");
  
}

function setup(){
    createCanvas(500,500);

    play=createSprite(250,250,10,10);
  play.addImage("play",playB);
  play.visible=true;
  play.scale=0.3;
 
playerC=createSprite(40,480,20,20);  
 enemyC=createSprite(10,480,20,20);
 enemyC.addAnimation("enemy",mons)
  playerC.addAnimation("sprite",sa);
  enemyC.shapeColor="green";
playerC.shapeColor="pink";
    playerC.visible=false;
   enemyC.visible=false;
 obstaclesGroup=createGroup();
  
  
  ground1= createSprite(1000,480,800,20);
  ground1.visible=false;
  ground1.x=ground1.width/2;
  ground1.velocityX=-2;
//ground1.lifetime=83;
  
re=createSprite(250,250,10,10);
  re.addAnimation("e",restart)
  re.visible=false;//restart button
  re.scale=0.1;

  ground= createSprite(1000,480,800,20);
  ground.visible=false;
ground.shapeColor="blue";
  ground.x=ground1.width/2;
  ground.velocityX=-2;

 
}
function draw(){
  
if(gameState==="s1"){
  background("pink");
       if(mousePressedOver(play)){
       
      gameState="play";
    }
}
if(gameState==="play"){
  background("yellow");
  score = score + Math.round(getFrameRate()/60);
   play.visible=false; //pic of play(start)
 enemyC.visible=true;   //monster 
  playerC.visible=true; //player
  ground.visible=true;//main ground=blue
 
   if (ground1.x < 0) {
    ground1.x = ground1.width / 2;
  }
    
   if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
    
  
  if(keyDown("space")&&playerC .y>=100){
  playerC.velocityY=-10;}
 playerC.velocityY = playerC.velocityY + 0.8;
playerC.changeAnimation("s",sj);
  playerC.collide(ground);
 enemyC.collide(ground1);
    
 spawnObstacles();
  if(obstaclesGroup.isTouching(enemyC)){
    enemyC.visible=false;
  }
  
  if(obstaclesGroup.isTouching(playerC)){
    gameState="end";
    enemyC.visible=false; 
  
  }
}
if(gameState==="end"){
re.visible=true; 
  ground.visible=false;
  ground.velocity=0;
  ground1.velocity=0;

    ground1.visible=false;
  enemyC.visible=false;    
  playerC.visible=false;
  playerC.velocityY=0;
  obstaclesGroup.setLifetimeEach(-1);
  obstaclesGroup.setVelocityXEach(0);
  ground1.lifetime=-1;
  obstaclesGroup.visible=false;
  if(localStorage.getItem
     ("HighestScore")<score){
    localStorage.setItem("HighestScore" ,score);
  }
  score = 0;
 if(mousePressedOver(re)){
      gameState="play";
     console.log("hi");
     

  fill("blue");
  textSize(20);
  text("G A M E O V E R",250,150);
  text("Click on play to restart",290,190);
  
    }}

  
  
 
   drawSprites();
  text("Score:"+score,15,20);
  
 text("HightestScore:"+localStorage.getItem("HighestScore"),40,40);


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,458,10,40);
   obstacle.velocityX = -6;
   
  obstaclesGrouplifetime=100;
  
    var rand = Math.round(random(1,6));
    switch(rand) {
      //fire
      case 1: obstacle.addImage(obstacle1);
      
              break;
     //ice
              case 2: obstacle.addImage(obstacle2);
              break;
              
      // wheel 
              case 3: obstacle.addImage(obstacle3);
              break;
      //stone 
              case 4: obstacle.addImage(obstacle5);
              break;
       
        
        
           
      default: break;
    }
   
         
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}}