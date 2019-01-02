import * as React from 'react';
import styled from 'styled-components';
import { HBox, FlexSpacer } from 'ui';
import CurrentLocation from './CurrentLocation';
import StarSystemView from './StarSystemView';

const StyledGame = styled(HBox)``;

const Game = () => {
  return (
    <StyledGame>
      <CurrentLocation />
      <FlexSpacer />
      <StarSystemView />
    </StyledGame>
  );
};

export default Game;
