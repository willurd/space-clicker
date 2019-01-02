import * as React from 'react';
import styled from 'styled-components';
import useGame from 'game/useGame';
import { Point, Map, Entity, SpaceStation, AsteroidBelt } from 'game';
import { Icon } from 'ui';

const StyledWaypoint = styled.span`
  display: inline-block;
  left: ${props => props.webPos.left}px;
  position: absolute;
  top: ${props => props.webPos.top}px;
`;

const cartesianToWebCoords = (pos: Point, map: Map) => ({
  top: pos.y + map.topLeft.y,
  left: pos.x - map.topLeft.x,
});

const waypointToIconName = (waypoint: Entity) => {
  // TODO: Think of a better way to do this.
  if (waypoint instanceof SpaceStation) {
    return 'artstation';
  } else if (waypoint instanceof AsteroidBelt) {
    return 'asterisk';
  } else {
    return 'question';
  }
};

const Waypoint = ({ waypoint, map }) => {
  return (
    <StyledWaypoint pos={waypoint.pos} webPos={cartesianToWebCoords(waypoint.pos, map)}>
      <Icon name={waypointToIconName(waypoint)} />
    </StyledWaypoint>
  );
};

const Player = ({ pos, map }) => {
  return (
    <StyledWaypoint webPos={cartesianToWebCoords(pos, map)}>
      <Icon name="location-arrow" color="white" />
    </StyledWaypoint>
  );
};

const StyledStarSystemView = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #aaa;
  height: ${props => props.height}px;
  margin: 20px;
  position: relative;
  width: ${props => props.width}px;
  transform: scale(${props => props.scale});
`;

StyledStarSystemView.defaultProps = {
  scale: 1,
};

const StarSystemView = () => {
  const game = useGame();
  const system = game.currentSystem;
  const waypoint = game.currentWaypoint;
  const pos = game.currentPosition;

  if (!system) {
    return;
  }

  const map = system.map;

  console.log({ system, waypoint, pos });

  console.log(
    system.waypointList.map(waypoint => ({
      pos: waypoint.pos,
      map,
      webPos: cartesianToWebCoords(waypoint.pos, map),
    })),
  );

  return (
    <StyledStarSystemView width={map.width} height={map.height}>
      {system.waypointList.map(waypoint => (
        <Waypoint waypoint={waypoint} map={map} />
      ))}

      <Player pos={pos} map={map} />
    </StyledStarSystemView>
  );
};

export default StarSystemView;
