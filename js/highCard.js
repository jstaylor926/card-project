var myDollars = 0;
var count = 0;
var firstRun = true;
var suits = ["spades", "hearts", "clubs", "diams"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var cards = [];
var cardOutput = document.getElementById('cards');
var message = document.getElementById('message');
var scoreOutput = document.getElementById('score');
var myDol = document.getElementById('dollars');
var myB = document.getElementById('myBet');
myB.addEventListener("change", checkMe);
myB.addEventListener("blur", checkMe);

function checkMe() {
    if (this.value > myDollars) {
        this.value = myDollars;
    }
    if (this.value < 0) {
        this.value = 0;
    }
    message.innerHTML = "Bet changed to $" + this.value;
}

function gameStart() {
    myDollars = 100;
    count = 0;
    message.innerHTML = "Game Started!";
    document.getElementById('cards').innerHTML = "";
    document.getElementById('start').style.display = 'none';
    document.getElementById('highLow').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    if (firstRun) {
        buildCards();
        firstRun = false;
    }
    shuffleArray(cards);
    cardOutput.innerHTML += showCard();
}

function hilo(a) {
    var win = false;
    var oldCard = cards[count].cardValue;
    var myBetAmount = parseInt(myB.value);
    count++;
    cardOutput.innerHTML += showCard();
    var newCard = cards[count].cardValue;
    if (a == 'high' && oldCard < newCard) {
        win = true;
    }
    else if (a == 'low' && oldCard > newCard) {
        win = true;
    }
    if (win) {
        message.innerHTML = "You were RIGHT :) You made $" + myBetAmount;
        myDollars = myDollars + myBetAmount;
    }
    else {
        message.innerHTML = "You were WRONG :( You lost $" + myBetAmount;
        myDollars = myDollars - myBetAmount;
    }
    var currentBet = parseInt(myB.value);
    if (myDollars < 1) {
        myB.value = 0;
    }
    if (currentBet > myDollars) {
        myB.valve = myDollars;
    }
    myB.max = myDollars;
    myDol.innerHTML = myDollars;
    if (count > 3) {
        endPlay();
    }
}

function endPlay() {
    document.getElementById('highLow').style.display = 'none';
    message.innerHTML = "Game over.  You have $" + myDollars;
    document.getElementById('start').style.display = 'block';
    document.getElementById('score').style.display = 'none';
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var holder = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[holder];
        array[holder] = temp;
    }
    return array;
}

function showCard() {
    var c = cards[count];
    var bgColor = (c.icon == "H" || c.icon == "D") ? 'red' : 'black';
    var hpos = (count > 0) ? count * 80 + 30 : 30;
    return '<div class="icard ' + c.suit + '" style="left:' + hpos + 'px;"> <div class="cardtop suit">' + c.num + '<br></div> <div class="cardmid suit"></div>  <div class="cardbottom suit">' + c.num + '<br></div></div>';
}

function buildCards() {
    cards = [];
    for (s in suits) {
        var suit = suits[s][0].toUpperCase();
        for (n in numbers) {
            var card = {
                suit: suits[s]
                , num: numbers[n]
                , cardValue: parseInt(n) + 2
                , icon: suit
            }
            cards.push(card);
        }
    }
}