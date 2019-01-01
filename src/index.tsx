import * as React from 'react';
import { render } from 'react-dom';
import Game from 'components/game/Game';
import './styles.css';

function App() {
  // TODO: Load, initialize and run the game systems.
  return (
    <div>
      <Game />
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
