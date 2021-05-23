import React from 'react';
import { Box, Button, Paragraph } from "grommet";
import { MainContainer } from '../components/containers';
import { CustomBox } from "../components";
import { useHistory } from 'react-router-dom';
import { useLocalStorage, BROWSER_PLAYER, SCORE_STORAGE } from "../utils/customHooks";

interface ScoreDisplayProps {
    pseudo: string,
    score: number,
    isGreat: boolean
}

const GameOver = (): JSX.Element => {
    // state management
    const history = useHistory();
    const players = useLocalStorage<{ pseudo: string, score: number }[]>(SCORE_STORAGE, [])[0];
    const browserPlayer = useLocalStorage<{ pseudo?: string, token?: string }>(BROWSER_PLAYER, {})[0];
    const greatScore = players[0].score >= players[1].score ? players[0].score : players[1].score;


    // button action functions
    const restartAction = () => {
        console.log([browserPlayer?.pseudo, browserPlayer?.token])
        history.push(`/gamescene/${browserPlayer?.pseudo}/${browserPlayer?.token}`);
        
    }

    const homeAction = () => {
        history.push("/");
    }

    const ScoreDisplay = ({ pseudo, score, isGreat }: ScoreDisplayProps) => {
        return (
            <Box flex direction="row" align="center" justify="between" width="400px" margin={{ top: "20px" }}>
                <Box flex direction="row" align="center" justify="start" width="60%">
                    <Box width="20px" height="20px" background={isGreat ? "green" : "red"} margin={{ right: "20px" }} round="15px" /><Paragraph>{pseudo}</Paragraph>
                </Box>
                <Box flex direction="row" align="center" justify="around" width="20%">
                    <CustomBox text={`${score}`} />
                </Box>
            </Box>
        )
    }

    return (
        <MainContainer>
            <Box flex direction="column" align="center" justify="around">
                {players.map(item => <ScoreDisplay {...item} isGreat={item.score == greatScore} key={item.pseudo} />)}
            </Box>
            <Box flex direction="row" align="center" justify="around" width="100%" margin={{ top: "100px" }}>
                <Button label="Restart"
                    onClick={restartAction}
                    margin={{ bottom: "15px" }}
                    focusIndicator={false}
                    style={{ border: "1px black dashed" }} />

                <Button label="Home"
                    onClick={homeAction}
                    margin={{ bottom: "15px" }}
                    focusIndicator={false}
                    style={{ border: "1px black dashed" }} />

                {/* <Button
                    label="My Github"
                    margin={{ bottom: "15px" }}
                    focusIndicator={false}
                    style={{ border: "1px black dashed" }} /> */}

            </Box>
        </MainContainer>
    )
}

export default GameOver;