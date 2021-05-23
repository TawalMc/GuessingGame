import React from "react";
import { Box, Text } from "grommet";
import styled from "styled-components";
import CustomBox from "../CustomBox";

interface ModalProps {
  children?: React.ReactNode;
  handleOkClick?: () => void;
  okButton: boolean;
}

const BackgroundDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.568);
  display: flex;
  flex-direction: "center";
  justify-content: "center";
  align-items: "center";
`;

const Modal = ({
  children,
  handleOkClick,
  okButton = false,
}: ModalProps): JSX.Element => {
  return (
    <BackgroundDiv>
      <Box
        flex
        direction="column"
        align="center"
        justify="center"
        width="100%"
        height="100%"
      >
        <Box
          direction="column"
          align="start"
          justify="start"
          background="white"
          width="90%"
          height="40%"
          style={{
            paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "10px",
            position: "relative",
          }}
          round="10px"
        >
          <Box height="60%">
            {children}
          </Box>
          {okButton && (
            <Box
              direction="column"
              align="end"
              justify="center"
              style={{
                borderTop: "1px solid #051937",
                position: "absolute",
                bottom: "0px",
              }}
              height="30%"
              width="90%"
            >
              <CustomBox text="Ok" handleClick={handleOkClick} />
            </Box>
          )}
        </Box>
      </Box>
    </BackgroundDiv>
  );
};

export default Modal;
