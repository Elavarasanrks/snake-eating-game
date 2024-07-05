var collision_flag;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var interval_game;
var interval_time;
var dir;
var bg;
var divtime = document.getElementById("time");
var gamestatus = 0;
var startcount;
var interval_start;
var foodrandom;
foodrandom = Math.floor(Math.random() * 11);
var foodcount;
var coins;
var arrow_status = 0;

// Init variables

var foodimages;
var snakehead,snakebody_left,snakebody_right;
var snakebody_up,snakebody_down,snakeleg_left;
var snakeleg_right,snakeleg_up,snakeleg_down;
var foodImg;
var snake;
var food;


// Create square details

var square = 24;
var margin = 2 * square;

// Identify turn position

var turnX = 0;
var turnY = 0;

// Audio set up.
var move = new Audio;
move.src = "audio/snakemove.mp3";
var dead = new Audio;
dead.src = "audio/snakedead.mp3";
var eat = new Audio;
eat.src = "audio/snakeeat.wav";



// Set Score Details

var score = 0;
var padlength = 4;
var divscore = document.getElementById("score");

// Set Level details

var pause = 0;
var time = 0;
var currentlevel = 0;
var totallevel = 8;

// check level


var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
};


//var urlParams = new URLSearchParams(window.location.search);
if(getUrlParameter('level')) {
  currentlevel = getUrlParameter('level');
  //alert(currentlevel)
}


var level = [
  { duration:180,score:0,line:0,foodcount:22},
  { duration:180,score:0,line:0,foodcount:22},
  { duration:160,score:0,line:1,foodcount:20},
  { duration:160,score:0,line:1,foodcount:20},
  { duration:120,score:0,line:1,foodcount:18},
  { duration:120,score:0,line:1,foodcount:18},
  { duration:100,score:0,line:1,foodcount:15},
  { duration:100,score:0,line:1,foodcount:15},
]



//alert(level[currentlevel].line)

// Set snake Images

var snakeimg = [
  {imgskhdleft:"snake-headleft.png",imgskhdup:"snake-headup.png",
  imgskhdright:"snake-headright.png",imgskhddown:"snake-headdown.png",
  imgskbdleft:"snake-bodyleft.png",
   imgskbdright:"snake-bodyright.png",imgskbdup:"snake-bodyup.png",
   imgskbddown:"snake-bodydown.png",imgsklgleft:"snake-legleft.png",
   imgsklgright:"snake-legright.png",imgsklgup:"snake-legup.png",
   imgsklgdown:"snake-legdown.png"},   
]

// Load canvas width and height

var width = canvas.width;
var height = canvas.height;

// Load canvas width and height

var width  = Math.floor(window.innerWidth/square)*square-margin*2;
var height = Math.floor(window.innerHeight/square)*square-margin*6;

canvas.style.paddingLeft = margin-15 + "px";
//canvas.style.paddingRight = margin + "px";
canvas.style.paddingTop = "60px";
canvas.width = width;
canvas.height = height;

// Set Game Over Pop up position

document.getElementById("gameover").style.top = (window.innerHeight/2-150) + 'px';
document.getElementById("levelcompleted").style.top = (window.innerHeight/2-150) + 'px';

//alert(Math.floor(width/square/2)*square)
// Set Line details.

var line = [
  {},
  {},
  {x1:Math.floor(width/square/2)*square,y1:margin,
    x2:Math.floor(width/square/2)*square,y2:height-margin,dir:'LEFT'},
  {x1:margin,y1:Math.floor(height/square/2)*square,
    x2:width-margin,y2:Math.floor(height/square/2)*square,dir:'UP'},
  {x1:Math.floor(width/square/2)*square,y1:square,
    x2:Math.floor(width/square/2)*square,y2:height-square,dir:'LEFT'}, 
  {x1:square,y1:Math.floor(height/square/2)*square,
    x2:width-square,y2:Math.floor(height/square/2)*square,dir:'UP'},
  {x1:Math.floor(width/square/2)*square,y1:0,
    x2:Math.floor(width/square/2)*square,y2:height,dir:'LEFT'},
  {x1:0,y1:Math.floor(height/square/2)*square,
    x2:width,y2:Math.floor(height/square/2)*square,dir:'UP'},
  
]

// Load background Image
bg = new Image();
bg.src = "img/bg.jpg";

// Set food images.  

foodimages = [
  {0:"apple.png",1:"banana.png",2:"cherry.png",3:"corn.png",4:"egg.png",
   5:"grapes.png",6:"orange.png",7:"raspberry.png",8:"strawberry.png",9:"tomato.png",
   10:"watermelon.png"
  },
  {0:"apple.png",1:"banana.png",2:"cherry.png",3:"corn.png",4:"egg.png",
   5:"grapes.png",6:"orange.png",7:"raspberry.png",8:"strawberry.png",9:"tomato.png",
   10:"watermelon.png"
  },
  {0:"apple.png",1:"banana.png",2:"cherry.png",3:"corn.png",4:"egg.png",
   5:"grapes.png",6:"orange.png",7:"raspberry.png",8:"strawberry.png",9:"tomato.png",
   10:"watermelon.png"
  },
  {0:"apple.png",1:"banana.png",2:"cherry.png",3:"corn.png",4:"egg.png",
   5:"grapes.png",6:"orange.png",7:"raspberry.png",8:"strawberry.png",9:"tomato.png",
   10:"watermelon.png"
  },
  {0:"apple.png",1:"banana.png",2:"cherry.png",3:"corn.png",4:"egg.png",
   5:"grapes.png",6:"orange.png",7:"raspberry.png",8:"strawberry.png",9:"tomato.png",
   10:"watermelon.png"
  },
  {0:"apple.png",1:"banana.png",2:"cherry.png",3:"corn.png",4:"egg.png",
   5:"grapes.png",6:"orange.png",7:"raspberry.png",8:"strawberry.png",9:"tomato.png",
   10:"watermelon.png"
  },
  {0:"apple.png",1:"banana.png",2:"cherry.png",3:"corn.png",4:"egg.png",
   5:"grapes.png",6:"orange.png",7:"raspberry.png",8:"strawberry.png",9:"tomato.png",
   10:"watermelon.png"
  },
  {0:"apple.png",1:"banana.png",2:"cherry.png",3:"corn.png",4:"egg.png",
   5:"grapes.png",6:"orange.png",7:"raspberry.png",8:"strawberry.png",9:"tomato.png",
   10:"watermelon.png"
  },
]

document.addEventListener("keydown" , checkArrow);



function init() {
  arrow_status = 0;
  foodcount = 0;
  dir = ''; 
  score = 0; 
  divscore.innerHTML = scorePad(score, padlength);
  // Set time duration for corresponding level.  

  time = level[currentlevel].duration;

  divtime.innerHTML = secondsToTime(time);

  //document.getElementById("level").innerHTML = parseInt(currentlevel)+1;

  document.getElementById("food").innerHTML = foodcount;
  document.getElementById("foodtotal").innerHTML = level[currentlevel].foodcount;

  // Hide Count display

  document.getElementById("displaycount").innerHTML = '';
  document.getElementById("displaycount").style.display = "none";

  // Load snake Images

  snakehdleft = new Image();
  snakehdleft.src = 'img/' + snakeimg[0].imgskhdleft;
  snakehdup = new Image();
  snakehdup.src = 'img/' + snakeimg[0].imgskhdup;
  snakehdright = new Image();
  snakehdright.src = 'img/' + snakeimg[0].imgskhdright;
  snakehddown = new Image();
  snakehddown.src = 'img/' + snakeimg[0].imgskhddown;

  snakebody_left = new Image();
  snakebody_left.src = 'img/' + snakeimg[0].imgskbdleft;
  snakebody_right = new Image();
  snakebody_right.src = 'img/' + snakeimg[0].imgskbdright;
  snakebody_up = new Image();
  snakebody_up.src = 'img/' + snakeimg[0].imgskbdup;
  snakebody_down = new Image();
  snakebody_down.src = 'img/' + snakeimg[0].imgskbddown;

  snakeleg_left = new Image();
  snakeleg_left.src = 'img/' + snakeimg[0].imgsklgleft;
  snakeleg_right = new Image();
  snakeleg_right.src = 'img/' + snakeimg[0].imgsklgright;
  snakeleg_up = new Image();
  snakeleg_up.src = 'img/' + snakeimg[0].imgsklgup;
  snakeleg_down = new Image();
  snakeleg_down.src = 'img/' + snakeimg[0].imgsklgdown;  

  // Load food image

  foodImg = new Image();

  // Create snake details
  snake = [];
  snake[0] = {
    x : Math.floor(Math.random() * ((width/square)-1)+ 0) * square,
    y : Math.floor(Math.random() * ((height/square)-1)+ 0) * square,
  }
  snake[1] = {
    x : snake[0].x+square,
    y : snake[0].y,
  }  

  // Create Food Image details

  food = {
      x : Math.floor(Math.random() * ((width/square)-1)+ 0) * square,
      y : Math.floor(Math.random() * ((height/square)-1)+ 0) * square,
  }
  startGame();
}

function checkArrow(event) { 
  if(event.keyCode == 37 && dir != "RIGHT" && arrow_status == 0) {
    dir = "LEFT";
    gamestatus = 1;
    arrow_status = 1;
  }
  else if(event.keyCode == 38 && dir != "DOWN" && arrow_status == 0) {
    dir = "UP";
    gamestatus = 1;
    arrow_status = 1;
  }
  else if(event.keyCode == 39 && dir != "LEFT" && arrow_status == 0) {
    dir = "RIGHT";
    gamestatus = 1;
    arrow_status = 1;
  }
  else if(event.keyCode == 40 && dir != "UP" && arrow_status == 0) {
    dir = "DOWN";
    gamestatus = 1;
    arrow_status = 1;
  }
}

// Play button to continue game.

function playbtnfun(status) {
  pause = status;
  document.getElementById("playbtn").style.display = "none";
  if(gamestatus == 1) {
    startGame();
  }  
}

// Pause the game.

function pausegame(imgpause) {
  pause = imgpause;
  if(pause == 1 && gamestatus == 1) {
    pause = 0;
    clearInterval(interval_game);
    clearInterval(interval_time);
    document.getElementById("playbtn").style.display = "block";
    document.getElementById("playbtn").style.top = (height/2 + margin-65) + 'px';
    document.getElementById("playbtn").style.left = (width/2 + margin-65) + 'px'; 
  } 
}


// Identify the keypad

function checkDirection(keynum) {
  if(keynum == 37 && dir != "RIGHT" && arrow_status == 0) {
    dir = "LEFT";
    gamestatus = 1;
    arrow_status = 1;
  }
  else if(keynum == 38 && dir != "DOWN" && arrow_status == 0) {
    dir = "UP";
    gamestatus = 1;
    arrow_status = 1;
  }
  else if(keynum == 39 && dir != "LEFT" && arrow_status == 0) {
    dir = "RIGHT";
    gamestatus = 1;
    arrow_status = 1;
  }
  else if(keynum == 40 && dir != "UP" && arrow_status == 0) {
    dir = "DOWN";
    gamestatus = 1;
    arrow_status = 1;
  }
}


function draw() {
  
  // draw background Image

  ctx.drawImage(bg,0,0);  

  // Draw snake

  for(var i=0;i<snake.length;i++) {
    //ctx.fillStyle = (i == 0) ? "blue" : "grey";
    if(i == 0) {
      if(dir == "LEFT") {
        ctx.drawImage(snakehdleft,snake[i].x,snake[i].y);
      }
      else if(dir == "RIGHT") {
        ctx.drawImage(snakehdright,snake[i].x,snake[i].y);
      }
      else if(dir == "UP") {
        ctx.drawImage(snakehdup,snake[i].x,snake[i].y);
      }
      else if(dir == "DOWN") {
        ctx.drawImage(snakehddown,snake[i].x,snake[i].y);
      }
      else {
        ctx.drawImage(snakehdleft,snake[i].x,snake[i].y);
      }
    }
    else if(i != snake.length-1) {
      if(snake[i-1].y < snake[i].y) {
        ctx.drawImage(snakebody_up,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].y > snake[i].y) {
        ctx.drawImage(snakebody_down,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].x < snake[i].x) {
        ctx.drawImage(snakebody_left,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].x > snake[i].x) {
        ctx.drawImage(snakebody_right,snake[i].x,snake[i].y);
      }

      if(snake[i-1].y < snake[i].y && snake[i].y+square != height) {
        ctx.drawImage(snakebody_up,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].y > snake[i].y && snake[i].y != 0) {
        ctx.drawImage(snakebody_down,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].x < snake[i].x && snake[i].x+square != width) {
        ctx.drawImage(snakebody_left,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].x > snake[i].x && snake[i].x != 0) {        
        ctx.drawImage(snakebody_right,snake[i].x,snake[i].y);
      }
      else if (snake[i].direction == "UP" && (snake[i].y == 0 || snake[i].y+square == height)) {
        ctx.drawImage(snakebody_up,snake[i].x,snake[i].y);
      }
      else if(snake[i].direction == "DOWN" && (snake[i].y == 0 || snake[i].y+square == height)) {
        ctx.drawImage(snakebody_down,snake[i].x,snake[i].y);
      }
      else if(snake[i].direction == "LEFT" && (snake[i].x == 0 || snake[i].x+square == width)) {
        ctx.drawImage(snakebody_left,snake[i].x,snake[i].y);
      }
      else if(snake[i].direction == "RIGHT" && (snake[i].x == 0 || snake[i].x+square == width)) {
        ctx.drawImage(snakebody_right,snake[i].x,snake[i].y);
      }
      //ctx.drawImage(snakebody,snake[i].x,snake[i].y);
      //ctx.fillRect(snake[i].x,snake[i].y,square,square);
      //ctx.strokeStyle = "white";
      //ctx.strokeRect(snake[i].x,snake[i].y,square,square);
    }
    else {      
      if(snake[i-1].y < snake[i].y && snake[i].y+square != height) {
        ctx.drawImage(snakeleg_up,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].y > snake[i].y && snake[i].y != 0) {
        ctx.drawImage(snakeleg_down,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].x < snake[i].x && snake[i].x+square != width) {
        ctx.drawImage(snakeleg_left,snake[i].x,snake[i].y);        
      }
      else if(snake[i-1].x > snake[i].x && snake[i].x != 0) {        
        ctx.drawImage(snakeleg_right,snake[i].x,snake[i].y);
      }
      else if (snake[i-1].direction == "UP" && (snake[i].y == 0 || snake[i].y+square == height)) {
        ctx.drawImage(snakeleg_up,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].direction == "DOWN" && (snake[i].y == 0 || snake[i].y+square == height)) {
        ctx.drawImage(snakeleg_down,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].direction == "LEFT" && (snake[i].x == 0 || snake[i].x+square == width)) {
        ctx.drawImage(snakeleg_left,snake[i].x,snake[i].y);
      }
      else if(snake[i-1].direction == "RIGHT" && (snake[i].x == 0 || snake[i].x+square == width)) {
        ctx.drawImage(snakeleg_right,snake[i].x,snake[i].y);
      }      
      //ctx.drawImage(snakeleg,snake[i].x,snake[i].y);
    }    
  }  

  // Draw line.
  
  //alert(line[0].y1)
  if(level[currentlevel].line != 0) {
    ctx.beginPath(); 
    ctx.moveTo(line[currentlevel].x1,line[currentlevel].y1);
    ctx.lineTo(line[currentlevel].x2,line[currentlevel].y2);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
  

  // Draw food Image
  
  foodImg.src = "img/" + foodimages[currentlevel][foodrandom];
  ctx.drawImage(foodImg, food.x,food.y,square,square);
  

  // snake front position

  snakeX = snake[0].x;
  snakeY = snake[0].y; 
  
  // Find the controll direction.

  if(gamestatus == 1) {
    if(dir == "LEFT") {
      snakeX = snakeX - square;
      arrow_status = 0;
      move.play(); 
    }
    else if(dir == "UP") {
      snakeY = snakeY - square;
      arrow_status = 0;
      move.play(); 
    }
    else if(dir == "RIGHT") {
      snakeX = snakeX + square;
      arrow_status = 0;
      move.play(); 
    }
    else if(dir == "DOWN") {
      snakeY = snakeY + square;
      arrow_status = 0;
      move.play(); 
    }

      
    // if snake collision around the wall, then change the snake postion to opposite direction
    
    if(snake[0].x == 0 && dir == "LEFT") {
      snakeX = width - square;
    }
    else if(snake[0].y == 0 && dir == "UP") {
      snakeY = height - square;
    }
    else if((snake[0].x+square) == width && dir == "RIGHT") {
      snakeX = 0;
    }
    else if((snake[0].y+square) == height && dir == "DOWN") {
      snakeY = 0;
    } 


    // if snake eats food, then keep the last index from the array.
    // if snake not eats food, then remove the last index from the array.
  
    if(snake[0].x == food.x && snake[0].y == food.y) {
      eat.play();
      foodcount = foodcount + 1;
      document.getElementById("food").innerHTML = foodcount;
      food = {
          x : Math.floor(Math.random() * ((width/square)-1)+ 0) * square,
          y : Math.floor(Math.random() * ((height/square)-1)+ 0) * square,
      }
      score = score + 1;        
      divscore.innerHTML = scorePad(score, padlength);
      foodrandom = Math.floor(Math.random() * 11);
      
    }
    else {
      snake.pop();
    }
    
    // snake new front position
    
    var newfront = {
      x : snakeX,
      y : snakeY,
      direction:dir
    }
    // check snack collision itself
    var collision_line_flag = false;
    collision_flag = collision(newfront,snake);    
    if(level[currentlevel].line != 0) {
      collision_line_flag = collisionOnLine(newfront);  
    }
    if(collision_flag) {
      dead.play();
      gameoverPopUp();
    }
    else if(collision_line_flag) {
      dead.play();
      gameoverPopUp();
    }
    snake.unshift(newfront);    
    if(foodcount >= level[currentlevel].foodcount) {
      levelCompletedPopUp();
    }
    
    // Check time interval  
    if(time == 0) {
      gameoverPopUp();      
    }
  }  
}

// Redirect to home.

function home() {
  window.location.href = "index.html";
}

// Game over popup.

function gameoverPopUp() {
  var img = canvas.toDataURL("image/png");
  strwidth = width - 50;
  updateScore(0);
  gamestatus = 0;
  clearInterval(interval_game);
  clearInterval(interval_time);
  if(width > 550) {
    strwidth = 500;
  }
  document.getElementById("goimgcanvas").width = strwidth;
  document.getElementById("goimgcanvas").height = height-50;
  document.getElementById("goimgcanvas").src = img;
  //document.getElementById("goscore").innerHTML = score;
  $('#gameover').modal('show');
}

// Level completed popup.

function levelCompletedPopUp() {  
  uplevel = parseInt(currentlevel)+1;
  var img = canvas.toDataURL("image/png");
  strwidth = width - 50;
  updateScore(1);
  gamestatus = 0;
  clearInterval(interval_game);
  clearInterval(interval_time);
  if(parseInt(currentlevel)+1 != totallevel) {
    localStorage['level'+ uplevel] = 1;
  }  
  completed_time = parseInt(level[currentlevel].duration) - time;
  document.getElementById("lcscore").innerHTML = score;
  document.getElementById("lcfood").innerHTML = foodcount; 
  document.getElementById("lclevel").innerHTML = parseInt(currentlevel)+1;
  document.getElementById("lchs").innerHTML = localStorage['level'+ currentlevel + 'hight_score'];
  document.getElementById("lctotdur").innerHTML = secondsToTime(level[currentlevel].duration);
  document.getElementById("lccompdur").innerHTML = secondsToTime(completed_time);
  //document.getElementById("lctime").innerHTML = score;            
  $('#levelcompleted').modal('show');
}

// Update score

function updateScore(success) {
  if(success == 1) {
    totalscore = parseInt(time) + parseInt(foodcount);
    score = totalscore; 
  }
  else {
    totalscore = foodcount;
    score = totalscore; 
  } 
  localStorage['coins'] = parseInt(localStorage['coins']) + parseInt(totalscore);
  localStorage['level'+ currentlevel + 'score'] = score;
  if(score > localStorage['level'+ currentlevel + 'hight_score']){
    localStorage['level'+ currentlevel + 'hight_score'] = score;
  }
}

// Check the collision on line.

function collisionOnLine(newfront) { 
  x = newfront.x;
  y = newfront.y;
  x1 = line[currentlevel].x1;
  x2 = line[currentlevel].x2;
  y1 = line[currentlevel].y1;
  y2 = line[currentlevel].y2;
  
  if(line[currentlevel].dir == 'UP') {
    if(x >= x1 && x < x2 && y+square == y1 && dir == 'UP') {     
      return true;
    }
    else if(x >= x1 && x < x2 && y == y1 && dir == 'DOWN') {
      return true;
    }
  }
  else if(line[currentlevel].dir == 'LEFT') {
    if(y >= y1 && y < y2 && x+square == x1 && dir == 'LEFT') {     
      return true;
    }
    else if(y >= y1 && y < y2 && x == x1 && dir == 'RIGHT') {
      return true;
    }
  }
  
   
}


function collision(newfront,snake) {
  for(var i=0; i<snake.length; i++) {
    if(newfront.x == snake[i].x && newfront.y == snake[i].y) {      
      return true;
    }
  }
  return false; 
}

// Generate Score Pad

function scorePad(number, length) {   
  var str = '' + number;
  while (str.length < length) {
      str = '0' + str;
  } 
  return str;
}

 // Calculate Time

function calculateTime() {  
   if(pause == 0 && gamestatus == 1) {
    time = time - 1; 
    divtime.innerHTML = secondsToTime(time);
  }
}

// Restart the game.

function refreshGame() {
  time = level[currentlevel].duration + 1;  
  startcount = 0;   
  setTimeout(init, 4000);  
  interval_start = setInterval(startcounting , 1000); 
  $('#gameover').modal('hide');
  
  //alert(time)
}

// Initial start game with counting

function startcounting() {
  startcount = startcount + 1;    
  document.getElementById("displaycount").style.display = "block";
  document.getElementById("displaycount").style.top = (height/2 + margin-60) + 'px';
  document.getElementById("displaycount").style.left = (width/2 + margin-30) + 'px'; 
  document.getElementById("displaycount").innerHTML = startcount;
  if(startcount == 3) {    
    clearInterval(interval_start);
  }   
  //setTimeout(function(){ alert("Hello"); }, 3000);
}

// calculate Time from seconds

function secondsToTime(timeInSeconds) {
  var pad = function(num, size) { return ('000' + num).slice(size * -1); },
  timeinsec = parseFloat(timeInSeconds).toFixed(3),
  hours = Math.floor(timeinsec / 60 / 60),
  minutes = Math.floor(timeinsec / 60) % 60,
  seconds = Math.floor(timeinsec - minutes * 60),
  milliseconds = timeinsec.slice(-3);
  return pad(minutes, 2) + ':' + pad(seconds, 2);
}

// start time.
function setGameTime() {
  interval_time = setInterval(calculateTime , 1000);
}

// Close window.

function closewin() {
  alert(22)
}


// call draw function

function startGame() {
  interval_game = setInterval(draw , 200);
  setGameTime();
}
init();
