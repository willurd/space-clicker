import { useState, useEffect } from 'react';
import game from 'game';

const useGame = () => {
  const [dirty, setDirty] = useState();
  useEffect(() => {
    const onChange = () => setDirty({});
    game.on('change', onChange);
    return () => game.off('change', onChange);
  }, []);
  return game;
};

export default useGame;
