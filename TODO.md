# TODO

**Game Design**

- [ ] What kind of incremental game am I building?
  - [ ] What's the theme? Fantasy? Cyberpunk? Post-apocalyptic? Political?
  - [ ] What's the "story"?
  - [ ] Who is the player supposed to be relative to the game world?
  - [ ] What is the player's motivation?
  - [ ] Is there anything important I want to "say" with this game?
- [ ] What's the core game loop?
- [ ] How do I keep the game interesting?
  - [ ] What if there is always a decision to be made?
- [ ] Should I include a prestige mechanic? (i.e. starting over with some earnings multiplier)

**Architecture**

- [ ] Prototype one basic game mechanic.
  - [ ] Two places: A space station and an asteroid belt.
  - [ ] A view showing those two places, their relative locations, and where you are.
  - [ ] A component that lets you choose a location within your current system to travel to.
  - [ ] Travel takes real time to complete.
  - [ ] When you're in the astroid belt, you can see all of the asteroids that are there, what their
        materials are, and how far away you are from each asteroid.
  - [ ] You can travel to a specific asteroid.
  - [ ] Once you are in range of an asteroid, you can start mining it.
  - [ ] Mining takes real time and only gets some of the asteroid each time.
  - [ ] You can deplete an asteroid of all its resources, destrying it.
  - [ ] You can travel to other asteroids to mine them.
  - [ ] You can see what is in your inventory.
  - [ ] Once your inventory is full, you can travel back to the space station and either deposit
        your ore in your station inventory, or sell it.
  - [ ] Travel back to the asteroid belt and repeat.
- [ ] Figure out how systems will work.
  - [ ] A system provides data and actions, and a way to listen for changes.
  - [ ] A system can depend on other systems.
  - [ ] A view can depend on a system.
  - [ ] Write a utility that wraps a system in a React context.
- [ ] Build out the basic mechanism for loading and running systems.
- [ ] Build an API for loading/saving game data.
  - [ ] Make an adapter for localStorage.
  - [ ] Prototype an adapter for something like Firebase.
- [ ] Should systems be loaded dynamically, like separate modules?
- [ ] Maybe the game can be designed with a plugin system, and plugins can add their own systems.

## Idea - "Eve Clicker Game"

Make a browser/clicker game with a lot of the same mechanics as Eve Online, such as:

- A large galaxy.
- Space travel.
- Jump gates for getting to other star systems.
- Mining asteroids.
- Mining moons/planets.
- Many different ships with different properties.
- Ship building (creating ships from raw materials), outfitting (hard points, upgrades, etc),
  and customization (design, paint job, etc).
- Large skill tree that takes real time to progress.
- Industry (research, blueprints, crafting).
- A living marketplace for buying/selling raw materials, character upgrades, items you've made,
  ships, ship parts, weapons, etc.
- Combat.
- NPCs that give out quests/missions and standing with them/their organization/faction.
- Corporations, factions, other types of organizations.
- Leasing/owning star systems, space stations, planets, etc.
- Space anomolies.
- Space bandits/pirates/other hostile NPCs.

Basically it's kind of like a space RPG played out entirely in the browser using buttons and menus.

**Questions**

- [ ] Are there any parts about what I've mentioned so far, or any other part about how Eve works,
      that wouldn't work as a browser-based "menu" game?
- [ ] Are there any other games I can take inspiration from?
  - [ ] Star Citizen?
  - [ ] Neopets? (if you've ever played it. In my head it has kind of that same style. It's a website.
        That's also a game. That's a website.)
- [ ] Any novel mechanics I can add?
