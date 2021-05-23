const http = require("http"),
  express = require("express"),
  socketIo = require("socket.io"),
  cors = require("cors"),
  path = require("path"),
  router = require("./router");

const {
  addPlayer,
  findPlayer,
  getPlayer,
  getPlayersInGameScene,
  getGlobalDataByToken,
  removePlayer,
  removeGlobalDataByToken,
  updateGlobalDataByToken,
  updatePlayerScore,
} = require("./users");

const { cardListGenerator, CARD_SIZE } = require("./cardLists");

const app = express();
app.use(cors());
app.use(router);

const server = http.createServer(app);
const io = socketIo(server);

const socketChannels = require("./socketChannels");

io.on(socketChannels.connect, (socket) => {
  console.log("New client connected");

  /**
   * Player join game
   */
  socket.on(socketChannels.join, ({ pseudo, token }, callback) => {
    token = token.trim().toLowerCase();
    const { error, player, canStartGame } = addPlayer({
      id: socket.id,
      pseudo,
      token,
    });

    if (error) return callback(error);

    // add player to game scene
    socket.join(player.token);

    // send welcome message to all (02) users
    socket.emit(socketChannels.welcomeMsg, {
      pseudo: "AI",
      text: `${player.pseudo}, Welcome to this game.`,
    });

    /**
     * We can start game if canStartGame === true
     */
    let intervalCount,
      secondsBeforeStart = 5000,
      generateBoard = false;
    let playersInGameScene = getPlayersInGameScene(token);

    if (canStartGame) {
      if (intervalCount) clearInterval(intervalCount);

      intervalCount = setInterval(() => {
        if (secondsBeforeStart > 0) {
          countUntilGameStart();
          return;
        }
        clearInterval(intervalCount);

        let players = [
          {
            pseudo: playersInGameScene[0].pseudo,
            score: playersInGameScene[0].score,
          },
          {
            pseudo: playersInGameScene[1].pseudo,
            score: playersInGameScene[1].score,
          },
        ];
        io.to(player.token).emit(socketChannels.startGameNow, {
          pseudo: "AI",
          players,
        });

        // generate the gameboard with the same cardsList in the same order by the backend for data integrity
        io.to(player.token).emit(socketChannels.generateBoard, {
          cardsGenerate: cardListGenerator(),
        });

        io.to(player.token).emit(socketChannels.changePlayer, players[0].pseudo)

      }, 1000);
    }

    // turn card
    socket.on(
      socketChannels.turnCard,
      ({ pos, value, pseudoCurr }, callback) => {
        if (error) return callback(error);

        let playersInGameScene = getPlayersInGameScene(token);
        let { nbTurned, currentIndex, cardTurnedPos, cardTurnedValue } =
          getGlobalDataByToken(token);

        if (
          playersInGameScene[currentIndex].pseudo === pseudoCurr &&
          cardTurnedPos !== pos
        ) {
          nbTurned += 1;
          cardTurnedValue = nbTurned == 1 ? value : cardTurnedValue;
          cardTurnedPos = nbTurned == 1 ? pos : cardTurnedPos;

          let cardToTurn = {
            pos: [pos],
            pseudoCurr,
          };
          io.to(player.token).emit(socketChannels.turnCard, cardToTurn);
        }

        if (nbTurned == 2) {
          let cardToTurn = {
            pos: [cardTurnedPos, pos],
            pseudoCurr,
          };

          if (cardTurnedValue === value) {
            // pseudoCurr find pair
            let { pseudo, score } = findPlayer(token, pseudoCurr);
            let newPlayersData = [
              {
                pseudo: playersInGameScene[0].pseudo,
                score: playersInGameScene[0].pseudo === pseudoCurr ? playersInGameScene[0].score + 1 : playersInGameScene[0].score 
              },
              {
                pseudo: playersInGameScene[1].pseudo,
                score: playersInGameScene[1].pseudo === pseudoCurr ? playersInGameScene[1].score + 1 : playersInGameScene[1].score
              }
            ]
            
            updatePlayerScore(token, newPlayersData[0].pseudo, newPlayersData[0].score);
            updatePlayerScore(token, newPlayersData[1].pseudo, newPlayersData[1].score);

            setTimeout(() => {
              io.to(player.token).emit(socketChannels.hideCard, cardToTurn, newPlayersData);
            }, 1100);
      
          } else {
            // two selections don't match
            setTimeout(() => {
              io.to(player.token).emit(socketChannels.turnCard, cardToTurn);
            }, 1100);
          }

          cardTurnedPos = -1;
          cardTurnedValue = -1;
          nbTurned = 0;
          currentIndex =
            currentIndex + 1 >= playersInGameScene.length
              ? 0
              : currentIndex + 1;
          
          setTimeout(() => {
            io.to(player.token).emit(socketChannels.changePlayer, playersInGameScene[currentIndex].pseudo);
          }, 1600);
        }

        updateGlobalDataByToken(token, {
          token,
          nbTurned,
          currentIndex,
          cardTurnedPos,
          cardTurnedValue,
        });
      }
    );

    // disconnect from game scene
    socket.on(socketChannels.disconnect, () => {
      clearInterval(intervalCount);
      secondsBeforeStart = 30000;

      removePlayer(player.id);

      if (getPlayersInGameScene(token).length == 0) {
        removeGlobalDataByToken(token);
      }

      //console.log("Player quit game!");
    });

    // utilities functions
    const countUntilGameStart = () => {
      secondsBeforeStart -= 1000;
      const response = {
        pseudo: "AI",
        text: `${playersInGameScene[0].pseudo} vs ${playersInGameScene[1].pseudo} in: ${secondsBeforeStart}`,
      };

      io.to(player.token).emit(socketChannels.message, { ...response });
    };

    callback();
  });

  /**
   * Player disconnect to game scene or form game channels
   */
  socket.on(socketChannels.disconnect, () => {
    if (socket.id !== undefined)  removePlayer( socket.id);
    
    console.log("Client disconnected");
  });
});

/**
 * File serving
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../guessing-game-client/build")));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../guessing-game-client/build", "index.html"));
  })
}


/**
 * Server PORT configuration
 */
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Server has started");
});
