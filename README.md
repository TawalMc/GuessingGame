# Real Time Guessing Game
Real time guessing game is a multiplayers (02 players) web game where each users try to find the odds emojis when they turn the cards. Each player can only turn two cards each time. If the player finds two cards with same emojis so he wins 1 point.
It is an open source projects that you can run on your machine or try on website.

### *Source code*: [GuessingGame](https://github.com/TawalMc/GuessingGame)
### *Demo app*: [real time guessing game](https://guessing-game-mc.herokuapp.com/)

## To play it: 
1- A player enter his name
2- If he wants to invite a friend he generates a token that he pastes into **join** field. And click on play.
3- He shares this token with a friend who will enter his name and just pastes the same token in the **join** folder. The game starts if the two players are connected.

## Installation
This app contains two parts and each part has its packages:
<br>
- client side in : [guessing-game-client](https://github.com/TawalMc/GuessingGame/tree/master/guessing-game-client).
- server side in: [guessing-game-server](https://github.com/TawalMc/GuessingGame/tree/master/guessing-game-server).

It is deployed on Heroku.
### To try it on your machine
Requirements:
- git: latest
- nodejs: "14.x"
- npm
 
1. clone
```
$ git clone https://github.com/TawalMc/GuessingGame.git
$ cd GuessingGame
#
# To install client side packages go to guessing-game-client
#
$ cd guessing-game-client
$ npm install
```
```
#
# To install server side packages, you can open another console tab go to guessing-game-server
#
$ cd guessing-game-server
$ npm install
```

2. configurations
- Change in the GameScene.tsx file of guessing-game-client, the ENDPOINT connection via socket to your server localhost address. You can comment its line and uncomment the line above
```
# if your server run on port 5000 so your ENDPOINT must be
const ENDPOINT = "http://localhost:5000"
```

3. run client server and server

In client folder
```
$ npm start
```
In server folder
```
$ npm start
``` 

4- deploy it on Heroku

You can follow the tutorial to create an Heroku application on command line to create your own application on Heroku and just push this code from the root on this app. All configurations needed are setup already when I deploy it. Good luck.

You can share with me your critics or impovements:

## Connect with me
- [Twitter](https://twitter.com/Tawal_Mc): 
- [Github](https://github.com/TawalMc/)
- [Dev](https://dev.to/tawalmc)
- [mail](alaotawaliou@gmail.com)

Made: 2021


