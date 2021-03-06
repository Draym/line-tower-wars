import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    create() {
        const text = this.add.text(250, 250, 'Toggle UI', {
            backgroundColor: 'white',
            color: 'blue',
            fontSize: "48"
        })
        text.setInteractive({ useHandCursor: true })
        text.on('pointerup', () => {})
    }
}