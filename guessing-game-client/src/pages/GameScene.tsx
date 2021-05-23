import { useCallback, useEffect, useState } from "react";
import { Box, /* Button, */ Paragraph } from "grommet";
import { CustomBox, GameBoard, MessageModal } from "../components";
import socketIOClient from "socket.io-client";
import socketChannels from "../utils/socketChannels";
import { CardInfos } from "../utils/cardList";
import { useHistory } from "react-router-dom";
import { useLocalStorage, BROWSER_PLAYER, SCORE_STORAGE } from "../utils/customHooks";

const ENDPOINT = "http://localhost:5000";
const socket = socketIOClient(ENDPOINT);

interface MessageEmitted {
  pseudo: string;
  msg: string;
  showModal: boolean;
}

export interface CardClicked {
  pseudo: string;
  pos: number;
  value: number;
}

const GameScene = ({ match }: any): JSX.Element => {
  // globals and props variables
  const { pseudo, token } = match.params;
  
  // state management
  const [msgFromGame, setMsgFromGame] = useState<MessageEmitted>({
    pseudo: "AI",
    msg: "Nothing",
    showModal: false,
  });
  const [cards, setCards] = useState<CardInfos[]>([]);
  const [players, setPlayers] = useLocalStorage<{ pseudo: string, score: number }[]>(SCORE_STORAGE, []);
  const [browserPlayer, setBrowserPlayer] = useLocalStorage<{pseudo: string, token: string}>(BROWSER_PLAYER, {pseudo, token});
  const [currentPlayer, setCurrentPlayer] = useState("");
  const history = useHistory();
  
  // other hooks
  /**
   * when a player join the game, we emit an event and check the player validity
   * and greeting him
   */
  const playerJoinGame = useCallback(() => {
    socket.emit(socketChannels.join, { pseudo, token }, (error: string) => {
      if (error) {
        setMsgFromGame({ pseudo: "AI", msg: error, showModal: true });
        
        setTimeout(() => {
          history.push("/");
        }, 5000);

      }
    });
  }, [pseudo, token]);
  
  // lifecycles functions
  useEffect(() => {
    socket.connect();

    // save the browser player infos to use after for restart
    setBrowserPlayer({pseudo, token});

    return () => {
      socket.disconnect();
    };
  }, []);
  
  useEffect(() => {
    playerJoinGame();
    
    socket.on(socketChannels.welcomeMsg, ({ pseudo, text }) => {
      setMsgFromGame({ pseudo: "AI", msg: text, showModal: true });
    });
    
    socket.on(socketChannels.message, ({ pseudo, text }) => {
      setMsgFromGame({ pseudo: "AI", msg: text, showModal: true });
    });
    
    socket.on(socketChannels.startGameNow, ({ pseudo, players }) => {
      setMsgFromGame({ pseudo: pseudo, msg: "", showModal: false });
      setPlayers(players);
    });
    
    socket.on(socketChannels.generateBoard, ({ cardsGenerate }) => {
      setCards(cardsGenerate);
    });

    socket.on(socketChannels.turnCard, (cardToTurn) => {
      //console.log(cardToTurn);
      if (cardToTurn.pos.length == 1) {
        
        setCards((cardList) => cardList.map((eachCard, index) => {
          if (eachCard.pos === cardToTurn.pos[0]) eachCard.currentEmoji = true;
          return eachCard;
        }));
      }

      else if (cardToTurn.pos.length == 2) {
        setCards((cardList) => cardList.map((eachCard, index) => {
          if (eachCard.pos === cardToTurn.pos[0] || eachCard.pos === cardToTurn.pos[1]) eachCard.currentEmoji = false;
          return eachCard;
        }))
      }

    })

    socket.on(socketChannels.hideCard, (cardToTurn, newPlayersData) => {
      //console.log("c", [cardToTurn]);
      setCards((cardList) => cardList.map((eachCard, index) => {
        if (eachCard.pos === cardToTurn.pos[0] || eachCard.pos === cardToTurn.pos[1]) eachCard.visibility = false;
        return eachCard;
      }));

      //console.log(newPlayersData);
      setPlayers(newPlayersData);
    })

    socket.on(socketChannels.changePlayer, (currPlayer) => {
      setCurrentPlayer(currPlayer);
    })

  }, [playerJoinGame, match]);

  useEffect(() => {
    if (players.length != 0 && (players[0].score + players[1].score) == 32) {
      history.push("/gameover");
    }
  }, [players])

  // event handling
  const okClickAction = () => {
    setMsgFromGame((prev) => ({ ...prev, showModal: false }));
  };

  const onClickOnCard = (pos: number, value: number) => {
    //console.log([pos, value, pseudo]);

    socket.emit(socketChannels.turnCard, { pos, value, pseudoCurr: pseudo }, (error: string) => {
      if (error) {
        setMsgFromGame({ pseudo: "AI", msg: error, showModal: true });

      }
    })
  };

  /* const gameOverAction = () => {
    history.push(`/gameover`);
  } */

  return (
    <Box width="100%" height="90vh">
      <MessageModal
        from={msgFromGame.pseudo}
        message={msgFromGame.msg}
        showMessageModal={msgFromGame.showModal}
        okClickAction={okClickAction}
      />
      {cards.length != 0 ? (
        <Box flex direction="column" align="center" justify="center">
          <Box flex direction="row" align="center" justify="between">
            {<Box style={{visibility: currentPlayer === players[0].pseudo ? "visible" : "hidden"}} width="20px" height="20px" background="green" border={{ color: "green" }} margin={{ right: "20px" }} round="15px" />}<Paragraph>{players[0].pseudo}</Paragraph><CustomBox text={`${players[0].score}`} />
          </Box>
          <GameBoard cardList={cards} handleClick={onClickOnCard} />
          <Box flex direction="row" align="center" justify="between">
            {<Box style={{visibility: currentPlayer === players[1].pseudo ? "visible" : "hidden"}} width="20px" height="20px" background="green" border={{ color: "green" }} margin={{ right: "20px" }} round="15px" />}<Paragraph>{players[1].pseudo}</Paragraph><CustomBox text={`${players[1].score}`} />
          </Box>
         {/*  <Button label="Home"
                    onClick={gameOverAction}
                    margin={{ bottom: "15px" }}
                    focusIndicator={false}
                    style={{ border: "1px black dashed" }} /> */}
        </Box>
      ) : <Box flex direction="column" align="center" margin={{ top: "20px" }}>Wait... until a second player😥!</Box>}
    </Box>
  );
};

export default GameScene;
