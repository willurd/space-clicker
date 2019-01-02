// NOTE: This is just a prototype of a basic feature:
//   - You can travel between waypoints in a star system.
//   - You can mine asteroids for ore.
//   - You have an ship inventory (finite) and a station inventory (infinite).
//   - You can store your mined ore in your station inventory or sell it in a marketplace.

import uuid from 'uuid';
import EventEmitter from 'events';
import debounce from 'lodash/debounce';
import { clamp } from 'game/utils';

// These could be used for names of unidentified ores, alien ships, space anomolies, star systems, etc.
export const glyphs = 'आईऊऋॠऌॡऐऔऎअंअँकखगघङचछजझञटठडढणतथदधनपफबभयरवळशषसह'.split('');

export class Point {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export type EntityOptions = {
  id?: string;
  name?: string;
  pos?: Point;
};

export class Entity {
  id: string;
  name: string;
  pos?: Point;

  constructor(options: EntityOptions = {}) {
    this.id = options.id || uuid.v4(); // Some entities need the same id across loads, others don't.
    this.name = options.name || `Unknown Entity ${this.id}`;
    this.pos = options.pos;
  }
}

export type EntityMap<T extends Entity> = { [key: string]: T };

export const entityArrayToMap = <T extends Entity>(entities: Array<T>): EntityMap<T> => {
  return entities.reduce((acc: EntityMap<T>, entity: T) => {
    acc[entity.id] = entity;
    return acc;
  }, {});
};

export class Map {
  topLeft: Point;
  bottomRight: Point;

  constructor(topLeft: Point, bottomRight: Point) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }

  get width(): number {
    return this.bottomRight.x - this.topLeft.x;
  }

  get height(): number {
    return this.topLeft.y - this.bottomRight.y;
  }
}

export class SpaceStation extends Entity {
  // ...
}

export class AsteroidBelt extends Entity {
  // ...
}

export type StarSystemOptions = EntityOptions & {
  map: Map;
  waypoints: Array<Entity>;
};

export class StarSystem extends Entity {
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

  getWaypoint(id: string): void | Entity {
    return this.waypoints[id];
  }

  get waypointList(): Array<Entity> {
    return Object.keys(this.waypoints).map(id => this.getWaypoint(id) as Entity);
  }
}

export class GameLocation {
  system?: string;
  waypoint?: string;
  pos?: void | Point;

  constructor(system?: string, waypoint?: string, pos?: void | Point) {
    this.system = system;
    this.waypoint = waypoint;
    this.pos = pos;
  }
}

export class Travel {
  from: GameLocation;
  to: GameLocation;
  tripTime: number;
  timeRemaining: number;
  lastTime: number;

  constructor(from: GameLocation, to: GameLocation, tripTime: number) {
    this.from = from;
    this.to = to;
    this.tripTime = tripTime;
    this.timeRemaining = tripTime;
    this.lastTime = Date.now();
  }

  get isDone(): boolean {
    return this.timeRemaining <= 0;
  }

  get percentComplete(): number {
    return clamp(0, 1, (this.tripTime - this.timeRemaining) / this.tripTime);
  }

  tick(): void {
    const now = Date.now();
    const diff = now - this.lastTime;
    this.timeRemaining -= diff;
    this.lastTime = now;
  }
}

export const exampleSystem = new StarSystem({
  id: '75892086-3aaf-401e-99ba-114db5d76dbf',
  name: 'Example System',
  map: new Map(new Point(-250, 250), new Point(250, -250)),
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

export type GameState = {
  currentLocation?: {
    system?: string;
    waypoint?: string;
    pos?: void | { x: number; y: number };
  };
};

export type GameOptions = {
  systems: Array<StarSystem>;
  currentLocation: GameLocation;
};

export class Game extends EventEmitter {
  systems: EntityMap<StarSystem>;
  currentLocation: GameLocation;
  travel?: Travel;

  constructor(state: void | GameState, options: GameOptions) {
    super();
    this.systems = entityArrayToMap(options.systems);
    this.currentLocation = options.currentLocation;
    this.setState(state);
    // DEBUG ONLY!
    // this.travel = new Travel(
    //   options.currentLocation,
    //   new GameLocation(options.currentLocation.waypoint, 'b2690138-f58f-4e2e-829f-dfb0d7b39ab1'),
    // );
  }

  gameChanged() {
    this.saveState();
    this.emit('change');
  }

  saveState = debounce(() => {
    saveGameState(this.getState());
  }, 500);

  setState(state?: void | GameState): void {
    if (!state) {
      return;
    }

    if (state.currentLocation) {
      const loc = state.currentLocation;
      const pos = loc.pos;
      this.currentLocation = new GameLocation(loc.system, loc.waypoint, pos && new Point(pos.x, pos.y));
    }
  }

  getState(): GameState {
    return {
      currentLocation: this.currentLocation,
    };
  }

  hasSystem(id: string): boolean {
    return !!this.systems[id];
  }

  getSystem(id: string): void | StarSystem {
    return this.systems[id];
  }

  // TODO: This should probably return undefined if you're travelling
  // to another system.
  get currentSystem(): void | StarSystem {
    return this.getSystem(this.currentLocation.system);
  }

  getWaypoint(id: string): void | Entity {
    return this.currentSystem && this.currentSystem.waypoints[id];
  }

  get currentWaypoint(): void | Entity {
    return this.getWaypoint(this.currentLocation.waypoint);
  }

  get currentPosition(): void | Point {
    const { pos } = this.currentLocation;
    const waypoint = this.currentWaypoint;
    return pos || (waypoint && waypoint.pos);
  }

  get isTraveling(): boolean {
    return !!this.travel;
  }

  get travelingFromWaypoint(): void | Entity {
    return this.travel && this.getWaypoint(this.travel.from.waypoint);
  }

  get travelingToWaypoint(): void | Entity {
    return this.travel && this.getWaypoint(this.travel.to.waypoint);
  }

  travelToWaypoint(id: string): void {
    if (this.travel) {
      console.error('Already traveling');
      return;
    } else if (!this.currentSystem) {
      console.error('Not currently in any system');
      return;
    }

    const waypoint = this.currentSystem.waypoints[id];

    if (!waypoint) {
      console.error(`Unknown waypoint: ${id}`);
      return;
    }

    this.travel = new Travel(
      new GameLocation(this.currentLocation.system, this.currentLocation.waypoint, this.currentPosition),
      new GameLocation(this.currentLocation.system, id, waypoint.pos),
      5000,
    );
    this.gameChanged();

    let intervalId = setInterval(() => {
      this.travel.tick();
      const { from, to } = this.travel;

      if (from.pos && to.pos) {
        // Show your ship's current location as it is traveling.
        this.currentLocation.pos = new Point(
          from.pos.x - (from.pos.x - to.pos.x) * this.travel.percentComplete,
          from.pos.y - (from.pos.y - to.pos.y) * this.travel.percentComplete,
        );
      }

      this.gameChanged();

      if (this.travel.isDone) {
        this.travel = undefined;
        clearInterval(intervalId);
        this.currentLocation.waypoint = id;
        this.currentLocation.pos = undefined;
        this.gameChanged();
      }
    }, 50);
  }
}

const loadGameState = () => {
  try {
    const state = JSON.parse(localStorage.getItem('game-state'));
    console.log('Loaded game state:', state);
    return state;
  } catch (e) {
    return {};
  }
};

const saveGameState = state => {
  localStorage.setItem('game-state', JSON.stringify(state));
  console.log('Saved game state:', state);
};

const game = new Game(loadGameState(), {
  systems: [exampleSystem],
  currentLocation: new GameLocation(
    exampleSystem.id,
    exampleSystem.waypoints[Object.keys(exampleSystem.waypoints)[0]].id,
  ),
});

export default game;
