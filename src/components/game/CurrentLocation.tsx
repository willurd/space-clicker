import * as React from 'react';
import styled from 'styled-components';
import { Icon, HBox } from 'ui';
import { SpaceStation } from 'game';
import useGame from 'game/useGame';

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

const TravelDetails = styled.ul`
  // Increased specificity is needed because StyledCurrentLocation's ul selector
  // has both a class selector and element selector.
  && {
    font-size: 1.3rem;
    line-height: 1rem;
    margin-left: 24px;
  }

  .travel-dots {
    font-size: 1rem;
    line-height: 1em;
    margin: 0 0 10px 10px;
  }
`;

const TravelTime = styled.div`
  color: #daf7a6;
  font-size: 2rem;
  line-height: 40px;
  margin-left: 25px;
`;

const CurrentLocation = () => {
  const game = useGame();

  const onTravelClick = () => {
    if (game.currentWaypoint instanceof SpaceStation) {
      game.travelToWaypoint('b2690138-f58f-4e2e-829f-dfb0d7b39ab1');
    } else {
      game.travelToWaypoint('0c23759b-658d-4318-b035-585c9c8d13e6');
    }
  };

  return (
    <StyledCurrentLocation>
      <ul>
        <li style={{ fontSize: '1.5em', lineHeight: '1.3em' }}>
          <Icon name="map-marker-alt" size={30} />
          <span>{game.isTraveling ? 'Traveling' : game.currentWaypoint.name}</span>
          {game.isTraveling && (
            <TravelDetails>
              <li>
                <Icon name="arrow-left" size={24} height={16} />
                <span>{game.travelingFromWaypoint.name}</span>
              </li>
              <li>
                <HBox>
                  <ul className="travel-dots">
                    <li>.</li>
                    <li>.</li>
                    <li>.</li>
                  </ul>
                  <TravelTime>{(game.travel.timeRemaining / 1000).toFixed(1)}s</TravelTime>
                </HBox>
              </li>
              <li>
                <Icon name="arrow-right" size={24} height={16} />
                <span>{game.travelingToWaypoint.name}</span>
              </li>
            </TravelDetails>
          )}
        </li>
        <li>
          <Icon name="sun" size={30} />
          <span>{game.currentSystem.name}</span>
        </li>
        {!game.isTraveling && (
          <li>
            <button onClick={onTravelClick}>
              Travel to {game.currentWaypoint instanceof SpaceStation ? 'Asteroid Belt' : 'Space Station'}
            </button>
          </li>
        )}
      </ul>
    </StyledCurrentLocation>
  );
};

export default CurrentLocation;
