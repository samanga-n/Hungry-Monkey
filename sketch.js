
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(30,260,20,10);
  monkey.addAnimation("move",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(0,300,800,20);
  ground.velocityX=-3;
  ground.x=ground.width/2;
  
  
   foodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
}


function draw() {
  background("lightblue");
  
   if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  if(foodGroup.isTouching(monkey)){
        foodGroup.destroyEach();
  
  } 
  
  if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
        stroke("violet");
        strokeWeight(20);
        textSize(40);
        fill("red");
        text("Game over",100,150);
  }
  
  stroke("orange");
  strokeWeight(2);
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) ;
  text("Survival Time: "+ survivalTime, 100,50); 
  drawSprites();
  
  
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.08;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,263,10,40);
    obstacle.velocityX = -5;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}






