const PLAYERS = [];
const GLOBAL_DATA_BY_TOKEN = [];

const addPlayer = ({ id, pseudo, token }) => {
  //pseudo = pseudo.trim().toLowerCase();
  token = token.trim().toLowerCase();

  const existingPlayer = PLAYERS.find(
    (player) => player.token === token && player.pseudo === pseudo
  );

  if (!pseudo || !token) return { error: "Pseudo and token are required." };
  
  if (existingPlayer) return { error: "This pseudo is taken."};
  
  if (getPlayersInGameScene(token).length >= 2)
    return { error: "Only 2 players are admitted." };

  const player = { id, pseudo, token, score: 0 };
  PLAYERS.push(player);

  if (getPlayersInGameScene(token).length == 2) {
    const globalData = { token, nbTurned: 0, currentIndex: 0, cardTurnedPos: -1, cardTurnedValue: -1};
    GLOBAL_DATA_BY_TOKEN.push(globalData);
    //console.log("global", GLOBAL_DATA_BY_TOKEN);
  }

  //console.log("players", getPlayersInGameScene(token));
  /**
   * Just adter adding the second player, we will start decount to play game.
   */
  const canStartGame = getPlayersInGameScene(token).length > 1;

  return { player, canStartGame };
};

const removePlayer = (id) => {
  const index = PLAYERS.findIndex((player) => player.id === id);
  if (index !== -1) return PLAYERS.splice(index, 1)[0];
};

const updatePlayerScore = (token, pseudo, score) => {
  const index = PLAYERS.findIndex((player) => player.token === token && player.pseudo === pseudo);
  if (index !== -1) {
    let oldData = PLAYERS[index];
    PLAYERS[index] = {...oldData, score};
  }
}

const findPlayer = (token, pseudo) => {
  return PLAYERS.find((player) => player.token === token && player.pseudo === pseudo);
}

const getPlayer = (id) => PLAYERS.find((player) => player.id === id);

const getPlayersInGameScene = (token) =>
  PLAYERS.filter((player) => player.token == token.trim().toLowerCase());

const updateGlobalDataByToken = (token, newData) => {
  const globalDataIndex = GLOBAL_DATA_BY_TOKEN.findIndex(
    (data) => data.token === token
  );
  if (globalDataIndex !== -1) {
    let oldData = GLOBAL_DATA_BY_TOKEN[globalDataIndex];
    GLOBAL_DATA_BY_TOKEN[globalDataIndex] = {...oldData, ...newData };
  }
};

const getGlobalDataByToken = (token) => {
  return GLOBAL_DATA_BY_TOKEN.find((data) => data.token === token);
};

const removeGlobalDataByToken = (token) => {
  const index = GLOBAL_DATA_BY_TOKEN.findIndex((data) => data.token === token);
  if (index !== -1) return GLOBAL_DATA_BY_TOKEN.splice(index, 1)[0];
};

module.exports = {
  addPlayer,
  findPlayer,
  getGlobalDataByToken,
  getPlayer,
  getPlayersInGameScene,
  removePlayer,
  removeGlobalDataByToken,
  updateGlobalDataByToken,
  updatePlayerScore
};
