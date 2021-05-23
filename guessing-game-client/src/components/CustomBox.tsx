import React from "react";
import { Box, Text } from "grommet";

interface CustomBoxProps {
    text: string;
    handleClick?: () => void;
}

const CustomBox = ({text, handleClick}: CustomBoxProps) : JSX.Element => {
    return <Box 
        pad={{"vertical" : "5px", "horizontal" : "20px"}} 
        margin={{"left" :"15px", "vertical": "10px"}} 
        round="large"
        elevation="large"
        background="#051937"
        onClick={handleClick}
        style={{
            cursor: "pointer"
        }}
        >
            <Text size="large">{text}</Text>
    </Box>
}

export default CustomBox;