var towerImg,tower;
var doorImg,door,doorsGroup;
var climberImg,climber,climbersGroup;
var ghost,ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg=loadImage("tower.png");
  doorImg= loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png"); 
  spookySound = loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300) ;
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost= createSprite(200,200)
  ghost.scale=0.5;
  ghost.addImage("ghost", ghostImg);

  
  doorsGroup= new Group();
  climbersGroup=new Group();
   invisibleBlockGroup = new Group();
 
}
function draw(){
  background("black");
  if (gameState === "play") {
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x-=2;
    }
  if(keyDown("RIGHT_ARROW")){
    ghost.x+=2;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+1;
  
 SpawnDoors();
  if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
  
  drawSprites();
  } 
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

   
}
 function SpawnDoors(){
if(frameCount%240===0){
door= createSprite(200,-15)  
door.addImage(doorImg) ;
  climber= createSprite(200,10);
  climber.addImage(climberImg);
  var invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
   
door.x= Math.round(random(120,400));  
 door.velocityY=1;
  climber.x=door.x;
  climber.velocityY=1;
  invisibleBlock.x= door.x;
  invisibleBlock.velocityY=1
   ghost.depth = door.depth;
    ghost.depth +=1;
   door.lifetime=800;
  climber.lifetime=800;
  invisibleBlock.lifetime = 800;
 doorsGroup.add(door);
  invisibleBlock.debug = true;
 climbersGroup.add(climber); 
 invisibleBlockGroup.add(invisibleBlock);
  
  
 }
  
}


