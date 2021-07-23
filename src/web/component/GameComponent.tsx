import { Game, Types } from 'phaser';
import {Component} from "react";
import GameScene from "../../game/scene/GameScene";

type GameProperties = {
    numberOfPlayers: number,
    gameWidth: number,
    gameHeight: number
}

type GameState = {
    numberOfPlayers: Number
}

export default class GameComponent extends Component<GameProperties, GameState> {

    componentWillMount() {
        //init state
    }

    componentDidMount() {
        const config: Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: this.props.gameWidth,
            height: this.props.gameHeight,
            parent: 'LineTowerWars',
            scene: [GameScene]
        }

        new Game(config)
    }

    shouldComponentUpdate() {
        return false
    }

    // render will know everything!
    render() {
        return <div id="phaser-game" />
    }
}