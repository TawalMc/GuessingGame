import styled from "styled-components";
import { CardInfos } from "../utils/cardList";
import Card from "./Card";

const GameBoardMain = styled.div`
  width: 280px;
  height: 350px;
  background-color: lightblue;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const GameBoardRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

interface GameBoardProps {
  cardList: CardInfos[] | [];
  handleClick: (pos: number, value: number) => void;
}

const GameBoard = ({ cardList, handleClick }: GameBoardProps): JSX.Element => {
  const cardSize = cardList.length;
  const rowArray = Array.from({ length: 8 }, (_, i) => i);

  const Row = (index: number) => {
    return cardList.map((item: any, i: any) => ((index + 1) * 8 - 8 <= i) && (i <= (index + 1) * 8 - 1) && <Card {...item} key={`${item.pos}${item.value}`} handleClick={handleClick} />)
  }

  return (

    <GameBoardMain>
      {rowArray.map((_, index) => {
        return <GameBoardRow key={index.toString()}>{Row(index)}</GameBoardRow>;
      })}
    </GameBoardMain>

  );
};

export default GameBoard;
