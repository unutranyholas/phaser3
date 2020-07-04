import Phaser from "phaser";
import tanks from "./assets/tanks.png";
import {generateLevel} from "./level";
import {cellSize, height, scale, tileSize, velocity, width} from "./constants";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: width * cellSize * tileSize * scale,
  height: height * cellSize * tileSize * scale,
  backgroundColor: "#ff0000",
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
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
  this.load.spritesheet('game-sprite', tanks, {frameWidth: tileSize, frameHeight: tileSize});
}

let player;
let cursors;

function create() {
  const level = generateLevel(width, height, cellSize);
  const map = this.make.tilemap({data: level, tileWidth: tileSize, tileHeight: tileSize});
  const tiles = map.addTilesetImage('game');
  const layer = map.createStaticLayer(0, tiles, 0, 0).setScale(scale);

  cursors = this.input.keyboard.createCursorKeys();
  player = this.physics.add.sprite(400, 256, 'game-sprite', 0).setScale(scale);
  player.setCollideWorldBounds(true);
}

function update() {
  player.setVelocity(0);

  if (cursors.left.isDown) {
    player.setFrame(2);
    player.setVelocityX(-velocity);
  } else if (cursors.right.isDown) {
    player.setFrame(6);
    player.setVelocityX(velocity);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-velocity);
    player.setFrame(0);
  } else if (cursors.down.isDown) {
    player.setFrame(4);
    player.setVelocityY(velocity);
  }
}