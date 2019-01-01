import * as React from 'react';
import styled from 'styled-components';
import CurrentLocation from './CurrentLocation';
import MapDisplay from './MapDisplay';

const StyledGame = styled.main`
  display: flex;
  flex-direction: row;
`;

const Game = () => {
  return (
    <StyledGame>
      <CurrentLocation />
      <MapDisplay />
    </StyledGame>
  );
};

export default Game;
