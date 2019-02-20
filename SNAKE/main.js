'use strict'
function play_game() 
{
let lvlpd = 160;
let gameBoardW = 45;// game board width/10 for simplicity 
let gameBoardH = 30;// game board height/10 for simplicity 
let canvasAttr; // canvas attribute 
let SafeCheckDir= [];
let DirX = [-1,0,1,0]//array Determines if the snake is moving left or right 
let DirY = [0,-1,0,1]//array Determines if the snake is moving up or down
let queue = [];
let map = [];//map array for the spawning position of food and snake head 
let food = 1;
// let BadFood =2;
let rand = Math.random;
let X = 5 + (rand() * (gameBoardW - 10))|0; //keeps the snake spawning in  a random position 
let Y = 5 + (rand() * (gameBoardH - 10))|0; //that is more in the center  of the game board 
let direction = rand() *3 | 0; //decides which direction to start the snake 
let interval = 0;
let score = 0;
let sum = 0;
let i;
let dir; 

// console.log(10.5858557085|0);

let PA = document.getElementById('playArea');
canvasAttr = PA.getContext('2d');
document.getElementById('playButton').style.display = 'none';


// canvasAttr.strokeStlye = goodFood;
// let S = document.getElementById('snake');
// canvasAttr = PA.getContext('2d');

for (i = 0; i < gameBoardW; i++)//setting the game board width to map 
{
    map[i] = [];
}

function randFood() {
var x, y;

//allows food colors to be different but ended up not using  this fuction
// just made them all the same, was going to create poisonus food  
var gradient = canvasAttr.createLinearGradient(0, 0, 170, 0);
gradient.addColorStop("0", "gold");
gradient.addColorStop("0.5" ,"gold");
gradient.addColorStop("1.0", "gold");

do {

x = rand() * gameBoardW|0;//random x corrdinate, truncated 
y = rand() * gameBoardH|0;//random y corrdinate , truncated 
} 
//placeing x & y into the map and drawing the food 
while (map[x][y]);
map[x][y] = 1;
// canvasAttr.fillStyle = snakeColor;
canvasAttr.strokeStyle = gradient;
canvasAttr.strokeRect(x * 10+1, y * 10+1, 8, 8);//creating food with strockrect 
// canvasAttr.fillRect.strokeRect();
}
//poisonus food didnt have a good idea/time for this function 
// function BadFood() {
//     var x, y;
    
//     var gradient2 = canvasAttr.createLinearGradient(0, 0, 170, 0);
//     gradient2.addColorStop("0", "magenta");
//     gradient2.addColorStop("0.5", "blue");
//     gradient2.addColorStop("1.0", "red");

    
//     do {

//     x = rand() * gameBoardW|0;
//     y = rand() * gameBoardH|0;
//     } 
//     while (map[x][y]);
//     map[x][y] = 1;
//     // canvasAttr.fillStyle = snakeColor;
//     canvasAttr.strokeStyle = gradient2;
//     canvasAttr.strokeRect(x * 10+2, y * 10+2, 8, 8);
    



//     }
randFood();
randFood();
randFood();
randFood();
randFood();
// BadFood();
// randSuperFood();


function SnakeMovment() 
{



//making sure the snake is in a valid location 
if (SafeCheckDir.length) 
{
dir = SafeCheckDir.pop();
if ((dir % 2) !== (direction % 2)) 
{
direction = dir;
}
}

//making sure everything is in fuctioning game  perameters  
if (( (0 <= X && 0 <= Y && X < gameBoardW && Y < gameBoardH)) && 2 !== map[X][Y]) 
{
//if on a food item, creating a new peice  of food, and adding one to the score 
    if (1 === map[X][Y]) 
{
randFood();
// BadFood();
food++;
// food++;
}
//canvasAttr.fillStyle("#ffffff");
//filling in a snake head, and determining its direction 
canvasAttr.fillRect(X * 10, Y * 10, 9, 9);
map[X][Y] = 2;
queue.unshift([X, Y]);
X+= DirX[direction];
Y+= DirY[direction];
score++;

//if not on a piece of food(so just moving), poping off the back of the array
if (food < queue.length) 
{
dir = queue.pop()
map[dir[0]][dir[1]] = 0;
canvasAttr.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
--score;
}
} 
//if at the edge of the map kill the game, send the message and present the play again button 
else if (!SafeCheckDir.length) 
{
var gameMsg = document.getElementById("msg");
gameMsg.innerHTML = "<br /><br /> <br /><br /><br /><br /><br /><br />Good try! Give it another Go!<br /> Your Snake Length : <b>"+score+"</b><br /><br /><input type='button' value='Play Again' onclick='window.location.reload();' />";
document.getElementById("playArea").style.display = 'none';
window.clearInterval(interval);
}
}
interval = window.setInterval(SnakeMovment, lvlpd);
//.onkeydown fires when the user presses the keyboard arrows
// arrow keys are between 40-37 determining which direction to shift the array
//based on users decision 
document.onkeydown = function(e) {
var code = e.keyCode - 37;
if (0 <= code && code < 4 && code !== SafeCheckDir[0]) {

SafeCheckDir.unshift(code);
} 
else if (-5 == code) {

if (interval) {

window.clearInterval(interval);
interval = 0;
} 
else {

interval = window.setInterval(SnakeMovment, 60);
}
}
else {
 
dir = sum + code;
if (dir == 44||dir==94||dir==126||dir==171) {

sum+= code
} else if (dir === 218); 
}
}
}