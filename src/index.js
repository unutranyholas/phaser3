import Phaser from "phaser";
import tanks from "./assets/tanks.png";
import {blocks, generateLevel} from "./level";
import {cellSize, height, scale, snapGap, tileSize, velocity, width} from "./constants";

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
  layer.setCollisionBetween(1, 66);

  cursors = this.input.keyboard.createCursorKeys();
  player = this.physics.add.sprite(tileSize * cellSize, tileSize * cellSize, 'game-sprite', 0).setScale(scale);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, layer, overlap, null, this);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('game-sprite',{start: 2, end: 3}),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('game-sprite', { start: 6, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('game-sprite', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('game-sprite', { start: 4, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

}

function overlap(player, {x, y, index}) {
  return blocks.includes(index)
}

function update() {
  player.setVelocity(0);
  if (cursors.left.isDown) {
    player.setY(Phaser.Math.Snap.To(player.y, snapGap));
    player.setVelocityX(-velocity);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setY(Phaser.Math.Snap.To(player.y, snapGap));
    player.setVelocityX(velocity);
    player.anims.play('right', true);
  }else if (cursors.up.isDown) {
    player.setX(Phaser.Math.Snap.To(player.x, snapGap));
    player.setVelocityY(-velocity);
    player.anims.play('up', true);
  } else if (cursors.down.isDown) {
    player.setX(Phaser.Math.Snap.To(player.x, snapGap));
    //player.setFrame(4);
    player.setVelocityY(velocity);
    player.anims.play('down', true);
  } else{
    player.anims.play(false);
  }
}