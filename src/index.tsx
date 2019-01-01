import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import Game from 'components/game/Game';
import './styles.css';

const Background = styled.div`
  background: url('/space.jpg') no-repeat center center fixed;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  opacity: 0.3;
  z-index: -9999999;
`;

function App() {
  // TODO: Load, initialize and run the game systems.
  return (
    <div>
      <Background />
      <Game />
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
