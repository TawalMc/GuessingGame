import React from 'react';
import { Grommet } from "grommet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GameOver, GameScene, Home } from './pages';
import theme from "./utils/theme";

function App() {
  return (
    <Grommet theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/gamescene/:pseudo/:token" component={GameScene} />
          <Route path="/gameover" component={GameOver} />
        </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
