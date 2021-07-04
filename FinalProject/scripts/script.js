//buttons
var rollButton = document.getElementById("roll");
var playAgainButton = document.getElementById("play-again");
//turn counter
var turn = 0;
//result
var result = document.getElementById("result");
//player object with all associated elements.
var player = {
    die1Img     : document.getElementById("p-die-1-img"),
    die2Img     : document.getElementById("p-die-2-img"),
    die1Value   : document.getElementById("p-value-1"),
    die2Value   : document.getElementById("p-value-2"),
    thisScore   : document.getElementById("p-this-score"),
    totalScore  : document.getElementById("p-total-score"),
    total       : 0,
    cont        : document.getElementById("player-container")
    
}

//computer object with all associated elements.
var comp = {
    die1Img     : document.getElementById("c-die-1-img"),
    die2Img     : document.getElementById("c-die-2-img"),
    die1Value   : document.getElementById("c-value-1"),
    die2Value   : document.getElementById("c-value-2"),
    thisScore   : document.getElementById("c-this-score"),
    totalScore  : document.getElementById("c-total-score"),
    total       : 0,
    cont        : document.getElementById("comp-container")

}



//roll dice and set images and values to the rolled numbers, set the totals,
//add one to the turn counter, and check if the game is over.
function rollDice(){
    //roll numbers
    var tempPlayerDie1Value = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    var tempPlayerDie2Value = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    var tempCompDie1Value = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    var tempCompDie2Value = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    //set rolled numbers to imgs and values
    player.die1Img.src = `./assets/die-${tempPlayerDie1Value}.png`;
    player.die1Value.innerHTML = tempPlayerDie1Value;
    player.die2Img.src = `./assets/die-${tempPlayerDie2Value}.png`;
    player.die2Value.innerHTML = tempPlayerDie2Value;
    comp.die1Img.src = `./assets/die-${tempCompDie1Value}.png`;
    comp.die1Value.innerHTML = tempCompDie1Value;
    comp.die2Img.src = `./assets/die-${tempCompDie2Value}.png`;
    comp.die2Value.innerHTML = tempCompDie2Value;
    setTotals();
    turn++;
    checkIfCompleted();
}

//check if there has been 3 turns, then display a result if there has been
function checkIfCompleted(){
    if(turn === 3){
        if(parseInt(player.total) > parseInt(comp.total)){
            player.cont.classList.add('winner');
            result.innerHTML = `Player won! ${player.total} to ${comp.total}.`;
            winnerAnimation(player);
        }
        if(parseInt(player.total) < parseInt(comp.total)){
            comp.cont.classList.add('winner');
            result.innerHTML = `Computer won! ${comp.total} to ${player.total}.`;
            winnerAnimation(comp);
        } 
        if(parseInt(player.total) == parseInt(comp.total)) {
            result.innerHTML = `Its a tie! ${comp.total} to ${player.total}! Play again!!`;
        }
        playAgainButton.disabled = false;
        rollButton.disabled = true;
    }
}

//set totals of scores and implement game logic.
function setTotals(){
    //variables
    var playerDie1 = parseInt(player.die1Value.innerText);
    var playerDie2 = parseInt(player.die2Value.innerText);
    var compDie1 = parseInt(comp.die1Value.innerText);
    var compDie2 = parseInt(comp.die2Value.innerText);
    var playerThisTotal = 0;
    var compThisTotal = 0;
    player.die1Value.classList.remove('double');
    player.die2Value.classList.remove('double');
    comp.die1Value.classList.remove('double');
    comp.die2Value.classList.remove('double');

    //logic
    if(playerDie1 == 1 || playerDie2 == 1){
        playerThisTotal = 0;
    } else {
        if(playerDie1 === playerDie2){
            playerThisTotal = playerDie1*4;
            player.die1Value.classList.add('double');
            player.die2Value.classList.add('double');
        } else {
            playerThisTotal = playerDie1 + playerDie2;
        }
    }
    if(compDie1 === 1 || compDie2 === 1){
        compThisTotal = 0;
    } else {
        if(compDie1 === compDie2){
            compThisTotal = compDie1*4;
            comp.die1Value.classList.add('double');
            comp.die2Value.classList.add('double');
        } else {
            compThisTotal = compDie1 + compDie2;
        }
    }

    //set scores
    player.thisScore.innerHTML = playerThisTotal;
    comp.thisScore.innerHTML = compThisTotal;
    player.total += playerThisTotal;
    comp.total += compThisTotal;
    player.totalScore.innerHTML = player.total;
    comp.totalScore.innerHTML = comp.total;
}

//reset totals and images
function reset(){
    //reset values
    player.total = 0;
    comp.total = 0;
    turn = 0;
    //reset html
    player.die1Value.innerHTML = 0;
    player.die2Value.innerHTML = 0;
    comp.die1Value.innerHTML = 0;
    comp.die2Value.innerHTML = 0;
    player.totalScore.innerHTML = 0;
    comp.totalScore.innerHTML = 0;
    player.thisScore.innerHTML = 0;
    comp.thisScore.innerHTML = 0;
    result.innerHTML = '';
    //reset images
    player.die1Img.src = `./assets/die-1.png`;
    player.die2Img.src = `./assets/die-1.png`;
    comp.die1Img.src = `./assets/die-1.png`;
    comp.die2Img.src = `./assets/die-1.png`;
    //reset buttons
    rollButton.disabled = false;
    playAgainButton.disabled = true;
    //remove classes
    comp.cont.classList.remove('winner');
    player.cont.classList.remove('winner');
}

//animation for winner
function winnerAnimation(winner){
    let id = null;
    clearInterval(id);
    let deg = 0;
    id = setInterval(frame, 5);
    function frame(){
        if(deg == 360){
            clearInterval(id);
        } else {
            deg++;
            winner.cont.style.transform = `rotate(${deg}deg)`;
        }
    }
}
