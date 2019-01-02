import * as React from 'react';
import styled from 'styled-components';
import { Point, Map, Entity, SpaceStation, AsteroidBelt } from 'game';
import useGame from 'game/useGame';
import { cartesianToWebCoords } from 'game/coords';
import { Icon, HBox } from 'ui';

const waypointToIconName = (waypoint: Entity) => {
  // TODO: Think of a better way to do this.
  if (waypoint instanceof SpaceStation) {
    return 'charging-station';
  } else if (waypoint instanceof AsteroidBelt) {
    return 'asterisk';
  } else {
    return 'question';
  }
};

const StyledWaypoint = styled(HBox)`
  align-items: flex-start;
  display: inline-block;
  left: ${props => props.webPos.left}px;
  position: absolute;
  top: ${props => props.webPos.top}px;
`;

const WaypointName = styled.span`
  display: inline-block;
  font-size: 1rem;
  vertical-align: top;
  margin: 3px 0 0 10px;
`;

const Waypoint = ({ waypoint, map }) => {
  const webPos = cartesianToWebCoords(waypoint.pos, map);

  return (
    <StyledWaypoint pos={waypoint.pos} webPos={webPos}>
      <Icon name={waypointToIconName(waypoint)} />
      <WaypointName>{waypoint.name}</WaypointName>
    </StyledWaypoint>
  );
};

const Player = ({ pos, map }) => {
  return (
    <StyledWaypoint webPos={cartesianToWebCoords(pos, map)}>
      <Icon name="dot-circle" type="solid" color="fuchsia" size={20} fontSize={20} />
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
