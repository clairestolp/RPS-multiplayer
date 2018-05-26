# RPS-multiplayer
An online multiplayer rock, paper, scissors game.

## Objective
To create an application that can store and retrieve information from a database using Firebase

## Technology Used
* HTML, CSS, JavaScript
* jQuery
* Firebase
* BootStrap
* FontAwesome

## Assignment
* Create a game that suits this user story:

  * Only two users can play at the same time.

  * Both players pick either `rock`, `paper` or `scissors`. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.

  * The game will track each player's wins and losses.

  * Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.

  * Styling and theme are completely up to you. Get Creative!

  * Deploy your assignment to Github Pages.

## Approach


## Planning

<details>
<summary>Login</summary>

* User inputs their name
* A new user object is added to an array of users
    ** This array has 5 properties: username (string), wins(int), loses(int), choice(string/num), isPaired(bool)
</details>
<details>
<summary>make a choice</summary>

* Upon login a navbar is displayed that shows the user and their current score with a logout btn
* chat bar appears (chat history stored as localStorage)
* The user and their opponent's name is displayed
* Under the name is a container element that will display their choice with a message that says "you have not yet choosen" and "username has not yet chosen" that will change once a choice has been made 
* under the players is a div that holds the choices that when clicked will store the user's choice 
</details>
<details>
<summary>Once both users have chosen...</summary>

* "Saisho wa gu, Janken Poi" animations is played
    ** When the two users input their choice, an animation plays in 3 stages 

    1. "Saisho wa gu..." 

    2. "...janken Poi!"

    3. results are displayed.

* data base is updated 
* a button appears to start a new match
</details>
<details>
<summary>footer</summary>

* Each page has a footer that contains the current online users. Upon hover a tooltip appears that displays that player's current wins and loses
</details>