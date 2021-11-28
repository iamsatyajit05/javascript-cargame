console.log("This is JS Car game");

//Acessing all div
const score = document.querySelector('.score');
const bestScore = document.querySelector('.bestScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const carGame = document.querySelector('.carGame');
const decoration = document.querySelector('.decoration');

//Functionality for starting game
startScreen.addEventListener('click', start);

//Creating Player Object
let player={
    speed:5, 
    score:0, 
    bestScore:0
}

//Intilising all arrow keys to False
let keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

//Taking key values from users
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key]=true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key]=false;
}

//Functionality for checking main cars is collid with enemys cars?
function isCollide(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}

//Functionality for Moving Lines on Roads
function moveLines(){
    let lines=document.querySelectorAll('.lines');

    lines.forEach(function(item) {
        if (item.y>=700) {
            item.y-=750;
        }
        item.y+=player.speed;
        item.style.top = item.y+"px";
    })
}

//Functionality for Moving Houses
function moveHouse(){
    let leftTree=document.querySelectorAll('.houses');

    leftTree.forEach(function(item) {
        if (item.y>=700) {
            item.y-=750;
        }
        item.y+=player.speed;
        item.style.top = item.y+"px";
    })
}

//Functionality for Moving Trees
function moveTree(){
    let rightTree=document.querySelectorAll('.trees');

    rightTree.forEach(function(item) {
        if (item.y>=700) {
            item.y-=750;
        }
        item.y+=player.speed;
        item.style.top = item.y+"px";
    })
}

//Functionality for Ending Game
function endGame() {
    player.start = false; 
    startScreen.classList.remove('hide');
    startScreen.innerHTML="<b>Game Over</b> <br> Your Final Score is "+player.score+"<br>Press here to start here"
    player.speed=5;
    if (player.score>player.bestScore) {
        player.bestScore=player.score;
    }
}

//Functionality for Genrating enemy cars at random location
function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy');

    enemy.forEach(function(item) {
        if (isCollide(car, item)) {
            console.log("Boom Hit....");
            endGame();
        }
        
        if (item.y>=700) {
            item.y=-300;
            item.style.left = Math.floor(Math.random()*350)+"px";
        }
        item.y+=player.speed;
        item.style.top = item.y+"px";
    })
}

//Functionality for Playing Game
function gamePlay() {
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();

    if(player.start){

        moveLines();
        moveHouse();
        moveTree();
        moveEnemy(car);

        if (keys.ArrowUp && player.y>(road.top+100)) {
            player.y-=player.speed;
        }
        if (keys.ArrowDown && player.y<(road.bottom-100)) {
            player.y+=player.speed;
        }
        if (keys.ArrowLeft && player.x>0) {
            player.x-=player.speed;
        }
        if (keys.ArrowRight && player.x<(road.width-80)) {
            player.x+=player.speed;
        }

        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);

        player.score++;
        let ps = player.score - 1;
        score.innerHTML="Score: " + ps;


        bestScore.innerHTML="Best Score: " + player.bestScore;
    }
}

//Intializing all things before staring game
function start() {
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML='';
    decoration.innerHTML='';

    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);

    //Creating Centar Line of Road
    for (let i = 0; i < 5; i++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (i*150);
        roadLine.style.top = roadLine.y+"px";
        gameArea.appendChild(roadLine);
    }

    //Creating Houses for Decoration
    for (let i = 0; i < 3; i++) {
        let house = document.createElement('div');
        house.setAttribute('class', 'houses');
        house.y = (i*500);
        house.style.top = house.y+"px";
        decoration.appendChild(house);
    }

    //Creating Trees for Decoration
    for (let i = 0; i < 5; i++) {
        let tree = document.createElement('div');
        tree.setAttribute('class', 'trees');
        tree.y = (i*150);
        tree.style.top = tree.y+"px";
        decoration.appendChild(tree);
    }

    //Creating Enemy Cars
    for (let i = 0; i < 3; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((i+1)*350)*-1;
        enemyCar.style.top = enemyCar.y+"px";
        enemyCar.style.left = Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemyCar);
    }

    //Appending Main Car to Road
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    //functionality for moving car
    player.x=car.offsetLeft;
    player.y=car.offsetTop;

}
