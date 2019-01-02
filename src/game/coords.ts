import { Point, Map } from 'game';

export const cartesianToWebCoords = (pos: Point, map: Map) => ({
  top: pos.y + map.topLeft.y,
  left: pos.x - map.topLeft.x,
});
