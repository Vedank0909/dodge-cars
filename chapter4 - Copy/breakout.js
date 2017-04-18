const WALL_THICKNESS = 20;
const PADDLE_WIDTH = 100;
const PADDLE_SPEED = 16;
const PUCK_SPEED = 5;
const PADDLE_HITS_FOR_NEW_LEVEL = 5;
const SCORE_BOARD_HEIGHT = 50;
const ARROW_KEY_LEFT = 37;
const ARROW_KEY_RIGHT = 39;
const SPACE_KEY = 32;

var canvas, stage, paddle,paddle1, puck, board, scoreTxt, livesTxt, messageTxt, messageInterval;
var leftWall, rightWall, ceiling, floor;
var leftKeyDown = false;
var rightKeyDown = false;

var bricks = [];

var paddleHits = 0;
var combo = 0;
var lives = 5;
var score = 0;
var level = 0;
var speed = 1;
var speed2 = 0.8;
var d,db;

var gameRunning = true;

var car,carb,carb2,car2,car3,carb3;
var counter=3;

var levels = [
    {color:'#705000', points:1},
    {color:'#743fab', points:2},
    {color:'#4f5e04', points:3},
    {color:'#1b5b97', points:4},
    {color:'#c6c43b', points:5},
    {color:'#1a6d68', points:6},
    {color:'#aa7223', points:7},
    {color:'#743fab', points:8},
    {color:'#4f5e04', points:9},
    {color:'#1b5b97', points:10},
    {color:'#c6c43b', points:11},
    {color:'#1a6d68', points:12}
];

function init() {
    canvas = document.getElementById('canvas');
    stage = new createjs.Stage(canvas);
    newGame();
    startGame();
}
function newGame() {
 
    stage.update();
    buildCar();
    setControls();
    buildMessageBoard() 
}

function buildMessageBoard() {
    board = new createjs.Shape();
    board.graphics.beginFill('#333');
    board.graphics.drawRect(0, 0, canvas.width, SCORE_BOARD_HEIGHT);
    board.y = canvas.height - SCORE_BOARD_HEIGHT;
    stage.addChild(board);
    livesTxt = new createjs.Text('lives: ' + lives, '20px Times', '#fff');
    livesTxt.y = board.y + 10;
    livesTxt.x = WALL_THICKNESS;
    stage.addChild(livesTxt);
    scoreTxt = new createjs.Text('score: ' + score, '20px Times', '#fff');
    scoreTxt.textAlign = "right";
    scoreTxt.y = board.y + 10;
    scoreTxt.x = canvas.width - WALL_THICKNESS;
    stage.addChild(scoreTxt);
    messageTxt = new createjs.Text('press spacebar to pause', '18px Times', '#fff');
    messageTxt.textAlign = 'center';
    messageTxt.y = board.y + 10;
    messageTxt.x = canvas.width / 2;
    stage.addChild(messageTxt);
}
function buildCar() {
    carb = new Image();
    carb.src='1.png';
car = new createjs.Bitmap(carb);
    car.x = 350;
    car.y = 420;
    car.height=100;
    car.width=100;
    stage.addChild(car);

    carb2 = new Image();
    carb2.src='2.png';
car2 = new createjs.Bitmap(carb2);
    car2.x = 400;
    car2.y = 10;
    car2.width=100;
    car2.height=100;
    stage.addChild(car2);

     carb3 = new Image();
    carb3.src='4.png';
car3 = new createjs.Bitmap(carb3);
    car3.x = 10;
    car3.y = 0;
    car3.width=100;
    car3.height=100;
    stage.addChild(car3);
    buildD();
}

function buildCar2() {
    carb2 = new Image();
    carb2.src='2.png';
car2 = new createjs.Bitmap(carb2);
    car2.x = Math.random() * (670 - 330) + 330;
    car2.y = 0;
    car2.width=100;
    car2.height=100;
    stage.addChild(car2);
}

function buildCar3() {
    carb3 = new Image();
    carb3.src='4.png';
car3 = new createjs.Bitmap(carb3);
    car3.x = Math.random() * (330 - 0) + 0;
    car3.y = 0;
    car3.width=100;
    car3.height=100;
    stage.addChild(car3);
}

function buildD() {
    db = new Image();
    db.src='3.png';
d = new createjs.Bitmap(db);
    d.x = Math.random() * (670 - 30) + 30;
    d.y = 0;
    d.width=100;
    d.height=100;
    stage.addChild(d);
}


function setControls() {
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;
}
function handleKeyDown(e) {
    e = !e ? window.event : e;
    switch (e.keyCode) {
        case ARROW_KEY_LEFT:
            leftKeyDown = true;
            break;
        case ARROW_KEY_RIGHT:
            rightKeyDown = true;
            break;
    }
}
function handleKeyUp(e) {
    e = !e ? window.event : e;
    switch (e.keyCode) {
        case ARROW_KEY_LEFT:
            leftKeyDown = false;
            break;
        case ARROW_KEY_RIGHT:
            rightKeyDown = false;
            break;
        case SPACE_KEY:
            if (gameRunning) {
                createjs.Ticker.setPaused(createjs.Ticker.getPaused() ? false : true);
            }
            else {
                resetGame();
            }
            break;
    }
}

function update() {
    updateCar();
}
function updateCar() {
    var nextX = car.x;
    if (leftKeyDown) {
        nextX = car.x - PADDLE_SPEED;
        if (nextX < leftWall) {
            nextX = leftWall;
        }
    }
    else if (rightKeyDown) {
        nextX = car.x + PADDLE_SPEED;
        if (nextX > rightWall - car.width) {
            nextX = rightWall - car.width;
        }
    }
    car.nextX = nextX;
    if(car2.y>car.y + 50){
        
        stage.removeChild(car2);
        buildCar2();
        speed = speed + 0.2;
        score++;
      
    }
     if(car3.y>car.y + 50){
        
        stage.removeChild(car3);
        speed2 = speed2 + 0.1;
        buildCar3();
        score ++;
      
    }

    if(d.y>car.y + 50){
        
        stage.removeChild(d);
        
        buildD();
      
    }

     if (car2.x < car.x + car.width &&
   car2.x + car2.width > car.x &&
   car2.y < car.y + car.height &&
   car2.height + car2.y > car.y) {
            console.log("detected");
       lives--;
        stage.removeChild(car2);
        buildCar2();
        speed = speed + 0.5;
       
   }

   if (car3.x < car.x + car.width &&
   car3.x + car3.width > car.x &&
   car3.y < car.y + car.height &&
   car3.height + car3.y > car.y) {
            console.log("detected car 3");
       lives--;
        stage.removeChild(car3);
        buildCar3();
        speed2 = speed2 + 0.6;
   }

   if (d.x < car.x + car.width &&
   d.x + d.width > car.x &&
   d.y < car.y + car.height &&
   d.height + d.y > car.y) {
            console.log("detected diaomond");
       lives++;
        stage.removeChild(d);
        buildD();
        
   }

    else{
        car2.y = car2.y + speed;
        car3.y = car3.y + speed2;
        d.y = d.y + 2;
        
    }


}

function render() {
    car.x = car.nextX;
   
    livesTxt.text = "lives: " + lives;
    scoreTxt.text = "score: " + score;
}

function evalGame() {
    if (lives < 0) {
        gameOver();
    }
   
}
function gameOver() {
    createjs.Ticker.setPaused(true);
    gameRunning = false;
    messageTxt.text = "press spacebar to play";
    car.visible = false;
    stage.update();
    messageInterval = setInterval(function () {
        messageTxt.visible = messageTxt.visible ? false : true;
        stage.update();
    }, 1000);
}
function resetGame() {
    clearInterval(messageInterval);
    level = 0;
    score = 0;
    lives = 5;
    paddleHits = 0;
    car.visible = true;
    messageTxt.visible = true;
    gameRunning = true;
    messageTxt.text = "press spacebar to pause";
    stage.update();
    createjs.Ticker.setPaused(false);
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        if (!e.paused) {
            runGame();
            stage.update();
        }
    });
}
function runGame() {
    update();
    render();
    evalGame();
}
