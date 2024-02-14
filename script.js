/* Gia's qns:
1) How come in the main function, in line 141 and 155, the input in the function are different? In line 141, it is just function () while in line 155, it is function(input). How do we actually identify what is the right 'input' to put in?

2) How come my P1 and P2 dice rolls are the same? Though I wrote code the same way that Bryan did in his video.

3) I dont uds why is there a need for this line of code '// We want to clear current player roll array for the next player' in line 125. 


/* Beat that! Game
Requirements:
- There are 2 players and players take turns.
- When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
- The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
- After both players have rolled and chosen dice order, the player with the higher combined number wins.

We create modes only when user is required to input multiple times into the input box. How do I decide how many modes to design for? 

1. Create the basics where: 
i) (Mode 1) Player 1 gets to roll 2 dices, diceRoll1 and diceRoll2.  The system to return an output that tells user the dice rolls. An array to be created. 
  --> Helper function 1: the system to generate dice roll, called genDiceRoll.
  --> Helper function 2: the system to generate 2 dice rolls, called genDiceRollsForPlayer.
  --> Mode: Indicate we are in Mode 1, called gameMode1_userRollsDice.
  --> Input: User hits Submit button twice, gets to see 2 dices numbers.

ii) (Mode 2) Then, player picks the order. Player should indicate if they want 1st dice or 2nd dice to go first, by entering '1' or '2'. 
  --> Change to Mode 2, called gameMode_userPicksOrder
  --> Input: User enters '1' or '2' to indicate if they want the 1st or 2nd number to be first in the order. 
  --> Helper function 3 to be created: the system to contatenate dice roll 1 and 2 to become a 2 digits number. 

iii) Then the system will return an output that tells user their final number. 
iv) Then system should prompt player 2 to go. 
  --> Return output to be a message 'This is your final number. Now, it's Player 2 turn. '


2. After player 1 is done, player 2 will go. The game mode will be player2State. Repeat steps 1, ii, iii. 
  --> Since it is a repeat of player 1 steps. We should refactor the code so that the code is efficient. 
  i) We can do this by using global variables to keep track of the current player, 
  ii) and also an array to store the score of both players.
  iii) Then we need to refactor the output messages to specifically address player 1 or player 2
  iv) Then we write logic for Player 1 to go first then Player 2, and finally compare scores in next step. 


3. After player 1 and player 2 are done, the system will compare both numbers and inform the outcome of who won. If player 1 has a same number as player 2, they draw. If player 1 has a higher number than player 2, they win.  Else, they lose. 


4. Reset the game so that the players can continue to play more rounds of the same game.
*/

// We set these game modes to remind us that these variables do not change.
var gameMode1_userRollsDice = 'Game mode 1'
var gameMode2_userPicksOrder = 'Game mode 2'
var gameMode3_weCompareBothPlayersNumbers = 'Game mode 3'
var gameMode = gameMode1_userRollsDice

// We create an array that stores the 2 dice rolls of a player. 
var playerDiceRollsInAnArray = [];

// We create an array to store the scores of both players. 
var bothPlayersNumbersInAnArray = []

// We create a variable that represents a player's final number. 
var playerNumber;

// We create a variable that represents the current player.
var currentPlayer;

// We create global variable where currentPlayer is set to 1 because Player 1 starts first. 
var currentPlayer = 1

/* ======== HELPER FUNCTIONS ========

/* 0. Create a dice roll game.*/

var getDiceRoll = function() {
  console.log ('Control flow: start of getDiceRoll.')
  // Generate a random number between 0 to 5.9999. This number will be inclusove of 0 and less than 6. 
  var randomDecimalFrom1To6 = Math.random() * 6 
  //Generate a random integer between 0 to 5. 
  var randomInteger = Math.floor(randomDecimalFrom1To6) 
  //Generate a random integer between 1 to 6. 
  var diceNumber = randomInteger + 1
  console.log ('This is the dice roll number: ' + diceNumber)
  return diceNumber;
};

// 1. Here, we are generating 2 dice rolls number for the player. And putting the dices into an array. 
var genDiceRollsForPlayer = function() {
console.log ('Control flow: start of generating two dice rolls for player')
  var counter = 0

  // Create a loop where the system will keep adding a dice roll number into the playerDiceRollsArray until the counter hits 2. essentially adding 2 dice roll numbers into the array, since it will run counter = 0 and 1. 
  while (counter < 2 ){
    playerDiceRollsInAnArray.push(getDiceRoll())
    counter = counter + 1
  }
  console.log('This prints that the helper function genDiceRollsForPlayer works')
  // Return an output message that tells user about their pair of dices rolled.
  return 'Hello Player ' + currentPlayer + ', these are your dices rolled: ' + playerDiceRollsInAnArray[0] + ' and ' + playerDiceRollsInAnArray[1] + '<br> Next, enter 1 or 2 to pick the order of your dices.' 
  }
  
  // 2. Here, we are getting the player's final number by concatenating dice roll 1 and dice roll 2 numbers.
  var getPlayerNumber = function (playerInputOfChoiceOrder){
  
    // Design an input validation, where anything other than 1 or 2 should return an error message. 
    if (playerInputOfChoiceOrder != 1 && playerInputOfChoiceOrder != 2){
      console.log ('Control flow: This runs the input validation where user should only input 1 or 2.')
      return 'Error. Please only input a value of 1 or 2.' 
    }

    // if input is equals to 1
    if (playerInputOfChoiceOrder == 1){
      console.log('Control flow: This prints that input is 1')
      var playerNumber = Number(String(playerDiceRollsInAnArray[0]) + String(playerDiceRollsInAnArray[1]))
    }

    // if input is equals to 2
    if (playerInputOfChoiceOrder == 2){
      console.log('Control flow: This prints that input is 2')
      var playerNumber = Number(String(playerDiceRollsInAnArray[1]) + String(playerDiceRollsInAnArray[0]))
    }

    // We want to store the players 1 and 2 numbers in an array so we can call upon it later to compare these numbers. Player 1 number will be index 0, and Player 2 number will be index 1. 
    bothPlayersNumbersInAnArray.push(playerNumber)

    // We want to clear current player roll array for the next player
    playerDiceRollsInAnArray = []

      return 'Hi Player ' + currentPlayer + ', you chose the order of Dice ' + playerInputOfChoiceOrder + ' first. <br> So this is your final number ' + playerNumber + '.'
  }





/* ======== MAIN FUNCTION ======== */
// Getting the 2 dices a player rolls
// 1i) (Mode 1) Player 1 gets to roll 2 dices, diceRoll1 and diceRoll 2.  The system to return an output that tells user the dice rolls.
var main = function (input) {
  console.log('Check game state on submit button click: ' + gameMode)
  console.log('Check which is the current player on submit button click: ' + currentPlayer)

  var myOutputValue = ''

  if (gameMode == gameMode1_userRollsDice){
    console.log('Control flow: start of Game mode 1.' + gameMode)
  
    // Return an output message that tells user about their pair of dices rolled. 
    myOutputValue = genDiceRollsForPlayer() ;
    console.log('This prints that helper function genDiceRollsForPlayer is called and working in the main function.')

    // Switch to game mode 2 where user picks order of the dices. 
    gameMode = gameMode2_userPicksOrder 
    console.log ('This is supposed to switch to game mode 2.')

    return myOutputValue;
  }

  if (gameMode == gameMode2_userPicksOrder){
    console.log ('Control flow: start of Game mode 2.' + gameMode)

    //Call get player number function.
    myOutputValue = getPlayerNumber(input)
    console.log('This prints that helper function getPlayerNumber works.')

    // Now, after Player 1 is done, we want to proceed to Player 2 to go. 
    if (currentPlayer == 1){
      console.log('Control flow: end of player 1 turn. Now it is player 2 turn.')
      currentPlayer = 2
      gameMode = gameMode1_userRollsDice
      return myOutputValue + '<br> It is now player 2 turn.'

    }

    if (currentPlayer == 2){
      console.log('Control flow: end of player 2 turn. Now we compare both players numbers.')

      gameMode = gameMode3_weCompareBothPlayersNumbers
      return myOutputValue + '<br> Next, click on submit button to compare the players numbers.'
    }

    
  }

};

  // 1ii) (Mode 2) Then, player picks the order. Player should indicate if they want 1st dice or 2nd dice to go first, by entering '1' or '2'. 
  // --> User enters '1' or '2' to indicate if they want the 1st or 2nd number to be first in the order. 

  // Only after user has clicked on submit button to get their 2 dice rolls, we can move from game mode 1 to game mode to 2, which is user picks order. 

  // else if (gameMode == gameMode2_userPicksOrder) {
  //   console.log('This should print Game mode 2. ' + gameMode)
  //   var userChoiceOfOrder = input
  //   console.log ('This prints user input as choice of order.')
    
  //   var playerNumber = ''

  //   if (userChoiceOfOrder == '1') {
  //     console.log ('Player has chosen the order of 1')
  //     // If the player has chosen the order of 1, create player number starting with 1st dice

  //    playerNumber = concatenate2Numbers (playerDiceRollsArray[1], playerDiceRollsArray[2]);

    

      // var playerNum;
      // // If the chosen first numeral index is 1, create player number starting with 1st dice
      // if (firstNumeralIndex === 1) {
      // playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
      // }
      // // Otherwise, create player number starting with 2nd dice
      // else {
      // playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
      // }


  //     // Return an output message that tells user about their total number.
  //     myOutputValue = 'Since you have chosen ' + userChoiceOfOrder + '. This is the total number you end up with' + playerNumber + '. Now, it is player 2 turn. Click on submit button to get dice rolls.';
  //     console.log ('This should be the total number that user ends up with. ' + playerNumber)
      
  //   }

  //   if (userChoiceOfOrder == '2') {
  //     console.log ('Player has chosen the order of 2')
  //     var playerNumber = Number(String (playerDiceRoll2) + String(playerDiceRoll1))
  //     console.log ('This is player 1 total number.')

  //     // Return an output message that tells user about their total number.
  //     myOutputValue = 'Since you have chosen ' + userChoiceOfOrder + '. This is the total number you end up with' + playerNumber + 'Now, it is player 2 turn. Click on submit button to get dice rolls.';
  //     console.log ('This should be the total number that user ends up with. ' + playerNumber)
  //   }

  // }




// var playerNumber = Number(String(playerDiceRoll1) + String(playerDiceRoll2))
//       console.log ('This is player total number.' + playerNumber)


// check if player chooses first or second digit to be used as first number
//     if (playerInput == 1) {
//       var playerScore = Number(
//         String(currentPlayerDiceNumber[0]) + String(currentPlayerDiceNumber[1])
//       );
//       totalScore.push(playerScore);
//       currentPlayerDiceNumber = [];
//       return "Player " + currentPlayer + ", your Number is: " + playerScore;
//     } else if (playerInput == 2) {
//       var playerScore = Number(
//         String(currentPlayerDiceNumber[1]) + String(currentPlayerDiceNumber[0])
//       );
//       currentPlayerDiceNumber = [];
//       totalScore.push(playerScore);
//       return "Player " + currentPlayer + ", your Number is: " + playerScore;


/* ======== MAIN FUNCTION =========
*/

// var main = function (input) {

// var myOutputValue = getDiceRoll()
//   console.log ('checking on game mode on submit click: ' + gameMode)  

//   return myOutputValue;
// };

// Return a number that is the concatenation of DiceRoll1 and DiceRoll2
//   var playerTotalNumber = Number(String (playerDiceRoll1) + String(playerDiceRoll2))


  







