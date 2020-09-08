var bananaImage, obstacleImage;
var obstaclesGroup, bananasGroup;
var bground, backImg, invisibleGround;
var monkeyRunning, monkey; 
var score;

function preload() {
  backImg = loadImage("jungle.jpg");
  
  monkeyRunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400); 
  
  bground = createSprite(200,180,400,20);
    bground.addImage("bground",backImg);
    bground.x = bground.width /2;
    bground.velocityX = -2;
  
  monkey = createSprite(50,380,20,50);
    monkey.addAnimation("running", monkeyRunning);
    monkey.scale = 0.2;
  
  invisibleGround = createSprite(200,390,400,10);
    invisibleGround.visible = false;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  
  if (bground.x < 0){
    bground.x = bground.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(invisibleGround);
  
  if(bananasGroup.isTouching(monkey)){
    score = score+2;
    bananasGroup.destroyEach();
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.2;  
  }
  
  switch(score){   
    case 10: monkey.scale = 0.12;
      break; 
    case 20: monkey.scale = 0.14;
      break;  
    case 30: monkey.scale = 0.16;
      break; 
    case 40: monkey.scale = 0.18;
      break; 
    default: break;
  }

  drawSprites();
  
  spawnBananas();
  spawnObstacles();
  
  stroke("black");
  textSize(20);
  fill("black");  
  text("Score: "+ score, 250, 50);
  
}

function spawnBananas(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 120);
      banana.addImage(bananaImage);
      banana.scale = 0.05;
      banana.y = Math.round(random(120,200));
      banana.velocityX = -3;
    banana.lifetime = 134;
    bananasGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400, 340);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.15;
      obstacle.velocityX = -3; 
    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
  }
}