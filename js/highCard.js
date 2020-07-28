I have pasted the sample HTML code below containg the game code.
There are two buttons to help players P1,P2 pick cards
First P1 picks card and then P2 picks card
In case of any doubts just comment down
<button type="button" id="p1Button">P1 PickCard</button>

<button type="button" id="p2Button">P2 PickCard</button>

<div id="main">

</div>

<script type="text/javascript">

var cardName1, cardName2;

var cardPoints1, cardPoints2;

var numPlays = 0;

var p1Points = 0;

var p2Points = 0;

var player1 = "House";

var player2 = "Player";

var card_to_num = {'2':0,'3':1,'4':2,'5':3,'6':4,'7':5,'8':6,'9':7,'10':8,'J':9,'Q':10,'K':11,'A':12};

var BR = '</br>';

var p1Stack = [], p2Stack = [];

var winningStack1 = [], winningStack2 = [];

var deck = [];

var suits = ['C','D','H','S'];

var cards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

var holdArr = [];

var div = document.getElementById('main');

function getPoints(cardName){

var len = cardName.length;

len--;

return card_to_num[cardName.substring(0,len)];

}

function initAndShuffleDeck(){

// Initialize Deck

for(var i=0; i<4; i++){

for(var j=0; j<13; j++){

deck.push(cards[j] + suits[i]);

}

}

//Shuffle Deck

for (var i=deck.length-1; i>=0; i--) {

var j = Math.floor(Math.random() * (i + 1));

var temp = deck[i];

deck[i] = deck[j];

deck[j] = temp;

}

}

function dealCards(){

for(var i=0; i<26; i++){

p1Stack.push(deck[2*i]);

p2Stack.push(deck[2*i+1]);

}

}

function endGame(){

if(p1Stack.length==0 && winningStack1.length==0){

div.innerHTML += ("P2 Won the Game" + BR);

}

if(p2Stack.length==0 && winningStack2.length==0){

div.innerHTML += ("P1 Won the Game" + BR);

}

}

var p1Button, p2Button;

function onClickp1(){

cardName1 = p1Stack.splice(-1,1)[0];

p1Button.disabled = true;

p2Button.disabled = false;

}

function onClickp2(){

cardName2 = p2Stack.splice(-1,1)[0];

p1Button.disabled = false;

p2Button.disabled = true;

playGame();

}

function addButtons(){

p1Button = document.getElementById("p1Button");

p2Button = document.getElementById("p2Button");

p1Button.onclick = onClickp1;

p2Button.onclick = onClickp2;

}

function playGame(){

if((p1Stack.length==0 && winningStack1.length==0) || (p2Stack.length==0 && winningStack2.length==0)){

endGame();

return;

}

if(p1Stack.length==0){

p1Stack.concat(winningStack1);

winningStack1 = [];

}

if(p2Stack.length==0){

p2Stack.concat(winningStack2);

winningStack2 = [];

}

div.innerHTML += (player1 + " card: " + cardName1 + ", " + player2 + " card: " + cardName2);

cardPoints1 = getPoints(cardName1);

cardPoints2 = getPoints(cardName2);

if(cardPoints1 > cardPoints2){

div.innerHTML += (", " + player1 + " wins hand." + BR);

winningStack1.concat(holdArr);

holdArr = [];

winningStack1.push(cardName1);

winningStack1.push(cardName2);

}else if(cardPoints2 > cardPoints1){

div.innerHTML += (", " + player2 + " wins hand." + BR);

winningStack2.concat(holdArr);

holdArr = [];

winningStack2.push(cardName1);

winningStack2.push(cardName2);

}else {

div.innerHTML += (", Tie hand. " + BR);

holdArr.push(cardName1);

holdArr.push(cardName2);

}

}

initAndShuffleDeck();

dealCards();

addButtons();