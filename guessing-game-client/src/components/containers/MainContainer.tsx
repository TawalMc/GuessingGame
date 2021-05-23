import React from "react";
import { Heading, Main } from "grommet";

interface MainContainerProps {
  children?: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps): JSX.Element => {
  return (
    <Main>
      <Heading alignSelf="center" level="3">
        Real Time Guessing Game (TawalMc)
      </Heading>
      {children}
    </Main>
  );
};

export default MainContainer;
