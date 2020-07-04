import Phaser from "phaser";
import tanks from "./assets/tanks.png";
import {generateLevel} from "./level";
import {cellSize, height, scale, tileSize, width} from "./constants";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: width * cellSize * tileSize * scale,
  height: height * cellSize * tileSize * scale,
  backgroundColor: "#ff0000",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  pixelArt: true,
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('game', tanks);
}

function create() {
  const level = generateLevel(width, height, cellSize);
  const map = this.make.tilemap({data: level, tileWidth: tileSize, tileHeight: tileSize});
  const tiles = map.addTilesetImage('game');
  const layer = map.createStaticLayer(0, tiles, 0, 0).setScale(scale);
}

function update() {
}