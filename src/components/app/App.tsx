import * as React from 'react';
import Background from './Background';
import Error from './Error';
import Game from 'components/game/Game';

class App extends React.Component {
  state = {
    error: undefined,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  // TODO: Load, initialize and run the game systems.
  componentDidCatch(error) {
    console.error('An unknown error occurred:', error);
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <Error error={error} />
        <Background />
        <Game />
      </div>
    );
  }
}

export default App;
