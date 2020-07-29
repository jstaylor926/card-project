var myDollars = 100;
var cards = [];
var count = 0;
var score = 0;
var lives = 3;
var cardOutput = document.getElementById('cards');
var suits = ["spades", "hearts", "clubs", "diams"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var message = document.getElementById('message');
var scoreOutput = document.getElementById('score');

function gameStart() {
    message.innerHTML = "Game Started!";
    document.getElementById('start').style.display = 'none';
    document.getElementById('highLow').style.display = 'block';
    buildCards();
    shuffleArray(cards);
    cardOutput.innerHTML += showCard();
    scoreOutput.innerHTML = "SCORE:" + score + " LIVES:(" + lives + ")";
}

function hilo(a) {
    var win = false;
    var oldCard = cards[count].cardValue;
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
        message.innerHTML = "You were RIGHT :)";
        score++;
    }
    else {
        message.innerHTML = "You were WRONG :(";
        lives--;
        if (lives < 1) {
            endPlay();
        }
    }
    scoreOutput.innerHTML = "SCORE:" + score + " LIVES:(" + lives + ")";
}

function endPlay() {
    document.getElementById('highLow').style.display = 'none';
    message.innerHTML = "Game over your score was " + score;
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
    return '<span class="icard" style="color:' + bgColor + '">' + c.num + ' &' + c.suit + ';</span>';
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
    console.log(cards);
}