import React, { useEffect, useState } from "react";
import { Box, Button, Text, TextInput } from "grommet";
import { MainContainer } from "../components/containers";
import { CustomBox } from "../components";
import { tokenGeneratorBasedOnPseudo } from "../utils/tokenManagers";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  // State
  const [userPseudo, setUserPseudo] = useState("");
  const [tokenGenerated, setTokenGenerated] = useState("");
  const [tokenJoined, setTokenJoined] = useState("");

  // References
  const pseudoInputRef = React.useRef<HTMLInputElement>(null);

  // Lifecycles
  useEffect(() => {
    localStorage.clear();
  }, [])

  // Events handlers
  const generateToken = () => {
    if (userPseudo.length >= 1) {
      setTokenGenerated(tokenGeneratorBasedOnPseudo(userPseudo));
    }
  };

  const setPseudoInputFocus = () => {
    pseudoInputRef.current?.focus();
  };

  /* const handlePlayNow = (e:  React.ChangeEvent<HTMLInputElement>) => {
        if (!(userPseudo.length > 0) && !(tokenJoined.length > 0) ) {
            e.preventDefault();
        }
    } */
  const handleUserPseudo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPseudo(e.target.value);
  };

  const handleTokenJoined = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenJoined(e.target.value);
  };

  return (
    <MainContainer>
      <Box flex direction="column" align="center" justify="center">
        <Box
          flex
          direction="row"
          align="center"
          justify="center"
          margin={{ vertical: "15px" }}
        >
          <Text>You: </Text>
          <CustomBox text={userPseudo} />
        </Box>

        <Box
          flex
          direction="column"
          align="center"
          justify="center"
          margin={{ vertical: "15px" }}
        >
          <Box flex direction="row" align="center" justify="center">
            <TextInput
              ref={pseudoInputRef}
              placeholder="Your pseudo"
              size="medium"
              value={userPseudo}
              onChange={handleUserPseudo}
            />
            <Button
              label="Pseudo"
              onClick={setPseudoInputFocus}
              margin={{ left: "15px" }}
              focusIndicator={false}
              style={{ border: "1px black dashed" }}
            />
          </Box>
          {userPseudo.length < 1 && (
            <Text alignSelf="start">Pseudo cannot be empty</Text>
          )}
        </Box>

        <Text textAlign="center">MultiPlayers Mode (2 players)</Text>
        <Box
          flex
          direction="column"
          align="center"
          justify="center"
          margin={{ vertical: "15px" }}
        >
          <Box flex direction="row" align="center" justify="center">
            <TextInput
              placeholder="Token generated"
              size="medium"
              value={tokenGenerated}
              readOnly
            />
            <Button
              label="Get"
              onClick={generateToken}
              margin={{ left: "15px" }}
              focusIndicator={false}
              style={{ border: "1px black dashed" }}
            />
          </Box>
          {tokenGenerated.length > 0 && (
            <Text alignSelf="start">And paste it in join field to start</Text>
          )}
        </Box>

        <Box
          flex
          direction="column"
          align="center"
          justify="center"
          margin={{ vertical: "15px" }}
        >
          <Box
            flex
            direction="row"
            align="center"
            justify="center"
            margin={{ vertical: "15px" }}
          >
            <TextInput
              placeholder="Token to join"
              size="medium"
              value={tokenJoined}
              onChange={handleTokenJoined}
            />
            <Button
              label="Join"
              margin={{ left: "15px" }}
              focusIndicator={false}
              style={{ border: "1px black dashed" }}
            />
          </Box>
          {tokenJoined.length > 0 && userPseudo.length > 0 && (
            <Text alignSelf="start">Share it with friends to join</Text>
          )}
          {tokenJoined.length > 0 && userPseudo.length > 0 && (
            <Link
              to={`/gamescene/${userPseudo}/${tokenJoined}`}
              style={{ textDecoration: "none" }}
            >
              <CustomBox text="Play" />
            </Link>
          )}
        </Box>
      </Box>
      {/* <Link to="/gameover">
            <CustomBox text="GameOver" />
      </Link> */}
    </MainContainer>
  );
};

export default Home;
