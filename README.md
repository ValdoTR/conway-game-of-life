# Conway's Game of Life

An attempt to play John Conway's Game of Life inside of WorkAdventure (maybe a dumb idea).

![map](./map.png)

[Proof of Concept DEMO](https://play.workadventu.re/@/valdo/life/poc)

## Requirements

Node.js version >=17

## Installation

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal in the root directory of this project:

```shell
npm install
npm run dev
```

## Test production map

You can test the optimized map as it will be in production:

```sh
npm run build
npm run prod
```

## Licenses

This project contains multiple licenses as follows:

* [Code license](./LICENSE.code) *(all files except those for other licenses)*
* [Map license](./LICENSE.map) *(`map.tmj` and the map visual as well)*
* [Assets license](./LICENSE.assets) *(the files inside the `src/assets/` folder)*
* Shoutout to [playgameoflife.com](https://playgameoflife.com/) for letting me test the actual game online.

### About third party assets

If you add third party assets in your map, do not forget to:

1. Credit the author and license with the "tilesetCopyright" property present in the properties of each tilesets in the `map.tmj` file
2. Add the license text in LICENSE.assets
