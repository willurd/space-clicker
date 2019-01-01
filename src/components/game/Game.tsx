import * as React from 'react';
import styled from 'styled-components';
import game from 'game';

console.log(game.currentLocation);

const StyledIcon = styled.span`
  color: #999;
  display: inline-block;
  height: ${props => props.size}px;
  text-align: center;
  width: ${props => props.size}px;
`;

StyledIcon.defaultProps = {
  size: 16,
};

const Icon = ({ name, ...props }) => (
  <StyledIcon {...props}>
    <i className={`fas fa-${name}`} />
  </StyledIcon>
);

const StyledCurrentLocation = styled.div`
  margin-top: 10px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    line-height: 1.4em;
  }

  li span {
    font-weight: bold;
  }
`;

const CurrentLocation = () => {
  return (
    <StyledCurrentLocation>
      <ul>
        <li style={{ fontSize: '1.5em', lineHeight: '1.3em' }}>
          <Icon name="map-marker-alt" size={30} />
          <span>{game.currentWaypoint ? game.currentWaypoint.name : 'Travelling...'}</span>
        </li>
        <li>
          <Icon name="sun" size={30} />
          <span>{game.currentSystem.name}</span>
        </li>
      </ul>
    </StyledCurrentLocation>
  );
};

const StyledGame = styled.main`
  display: flex;
  flex-direction: row;
`;

const Game = () => {
  return (
    <StyledGame>
      <CurrentLocation />
    </StyledGame>
  );
};

export default Game;
