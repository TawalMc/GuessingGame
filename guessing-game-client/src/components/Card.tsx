import styled from "styled-components";

const CardDiv = styled.div`
    width: 25px;
    height: 35px;
    border: 1px solid black;
    padding: 2px;
    margin: 1px;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    `;
    /* visibility: ${props => props.visibility ? "visible" : "hidden"}; */
    
const CardBox = styled.div`
    background-color: rgb(238, 237, 237); 
    width: 100%;
    height: 100%;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

interface CardProps {
    emoji?: string;
    value: number;
    pos: number;
    currentEmoji: boolean;
    visibility: boolean;
    handleClick: (pos: number, value: number) => void;
}

const Card = (props: CardProps): JSX.Element => {
    const backEmoji = "❓";
    
    const onClickEvent = () => {
        props.handleClick(props.pos, props.value);
    }

    return (
        <CardDiv style={{visibility: props.visibility ? "visible" : "hidden"}} onClick={onClickEvent}>
            <CardBox> {props.currentEmoji ? props.emoji : backEmoji } </CardBox>
        </CardDiv>
    )
}

export default Card;