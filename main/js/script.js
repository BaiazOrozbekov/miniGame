const $start = document.getElementById("start");
const $game = document.getElementById("game");
const $time = document.getElementById("time");
const $timeHeader = document.getElementById("time-header");
const $resultHeader = document.getElementById("result-header");
const $result = document.getElementById("result");
const $gameTime = document.getElementById("game-time");

let score = 0;

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBox);
$gameTime.addEventListener("input", setGameTime);


function startGame(){
    $start.classList.toggle("hide");
    score = 0;

    setGameTime();

    $game.style.background = "linear-gradient(to bottom, skyblue, gray)";

    $gameTime.setAttribute("disabled", true);

    let interval = setInterval(() => {
        let time = parseFloat($time.textContent);

        if(time <= 0){
            clearInterval(interval);
            endGame()
        }else{
            $time.textContent = (time - 0.1).toFixed(1);
        }
        console.log("interval", $time.textContent);
    }, 100);

    renderBox();
}

function endGame() {
    $start.classList.toggle("hide");
    $game.style.background = "#ccc";
    $game.innerHTML = "";
    $gameTime.removeAttribute("disabled");
    $timeHeader.classList.toggle("hide");
    $resultHeader.classList.toggle("hide");
    setScore();
}

function renderBox(){
    
    $game.innerHTML = "";
    let box = document.createElement("div");
    let boxSize = getRandom(30, 100);
    let gamezone = $game.getBoundingClientRect();
    let maxLeft = gamezone.width - boxSize;
    let maxTop = gamezone.height - boxSize;

    box.style.height = box.style.width = boxSize + "px";
    box.style.background = "#000";
    box.style.cursor = "pointer";
    box.style.position = "absolute";
    box.style.top = getRandom(0, maxTop) + "px";
    box.style.left = getRandom(0, maxLeft) + "px";
    box.classList.add("check");

    $game.appendChild(box);

}




function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function handleBox(event) {
    if (event.target.classList.contains("check")){
     score++;
    renderBox();
    console.log(score);
}
}

function setGameTime() {
    let time = +$gameTime.value;
    $time.innerText = time.toFixed(1);
    $timeHeader.classList.remove("hide");
    $resultHeader.classList.add("hide");

}

function setScore() {
    $result.innerText = score;
}