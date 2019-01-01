// NOTE: This is just a prototype of a basic feature:
//   - You can travel between waypoints in a star system.
//   - You can mine asteroids for ore.
//   - You have an ship inventory (finite) and a station inventory (infinite).
//   - You can store your mined ore in your station inventory or sell it in a marketplace.

import uuid from 'uuid';

// These could be used for names of unidentified ores, alien ships, space anomolies, star systems, etc.
const glyphs = 'आईऊऋॠऌॡऐऔऎअंअँकखगघङचछजझञटठडढणतथदधनपफबभयरवळशषसह'.split('');

class Point {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

type EntityOptions = {
  id?: string;
  name?: string;
  pos?: Point;
};

class Entity {
  id: string;
  name: string;
  pos?: Point;

  constructor(options: EntityOptions = {}) {
    this.id = options.id || uuid.v4(); // Some entities need the same id across loads, others don't.
    this.name = options.name || `Unknown Entity ${this.id}`;
    this.pos = options.pos;
  }
}

type EntityMap<T extends Entity> = { [key: string]: T };

const entityArrayToMap = <T extends Entity>(entities: Array<T>): EntityMap<T> => {
  return entities.reduce((acc: EntityMap<T>, entity: T) => {
    acc[entity.id] = entity;
    return acc;
  }, {});
};

class Map {
  topLeft: Point;
  bottomRight: Point;

  constructor(topLeft: Point, bottomRight: Point) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }
}

class SpaceStation extends Entity {
  // ...
}

class AsteroidBelt extends Entity {
  // ...
}

type StarSystemOptions = EntityOptions & {
  map: Map;
  waypoints: Array<Entity>;
};

class StarSystem extends Entity {
  map: Map;
  waypoints: EntityMap<Entity>;

  constructor(options: StarSystemOptions) {
    super(options);
    this.map = options.map;
    this.waypoints = entityArrayToMap(options.waypoints);
  }

  hasWaypoint(id: string): boolean {
    return !!this.waypoints[id];
  }
}

const exampleSystem = new StarSystem({
  id: '75892086-3aaf-401e-99ba-114db5d76dbf',
  name: 'Example System',
  map: new Map(new Point(-250, -250), new Point(250, 250)),
  pos: new Point(50, 50), // Star systems have positions within the galaxy.
  waypoints: [
    new SpaceStation({
      id: '0c23759b-658d-4318-b035-585c9c8d13e6',
      name: "Bob's Space Station",
      pos: new Point(-132, 50), // Waypoints have positions within the star system.
    }),
    new AsteroidBelt({
      id: 'b2690138-f58f-4e2e-829f-dfb0d7b39ab1',
      name: 'Asteroid Belt 1',
      pos: new Point(17, -10),
    }),
  ],
});

class GameLocation {
  system: string;
  waypoint: string;

  constructor(system: string, waypoint: string) {
    this.system = system;
    this.waypoint = waypoint;
  }
}

type GameOptions = {
  systems: Array<StarSystem>;
  currentLocation: GameLocation;
};

export class Game {
  systems: EntityMap<StarSystem>;
  currentLocation: GameLocation;

  constructor(options: GameOptions) {
    this.systems = entityArrayToMap(options.systems);
    this.currentLocation = options.currentLocation;
  }

  hasSystem(id: string): boolean {
    return !!this.systems[id];
  }

  // TODO: This should probably return undefined if you're travelling
  // to another system.
  get currentSystem(): StarSystem {
    return this.systems[this.currentLocation.system];
  }

  get currentWaypoint(): Entity | void {
    return this.currentSystem.waypoints[this.currentLocation.waypoint];
  }
}

export default new Game({
  systems: [exampleSystem],
  currentLocation: new GameLocation(
    exampleSystem.id,
    exampleSystem.waypoints[Object.keys(exampleSystem.waypoints)[0]].id,
  ),
});
