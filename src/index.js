import Phaser from 'phaser';

import MainMenuScene from './scenes/MainMenuScene';
import CharacterConfigScene from './scenes/CharacterConfigScene';
import BattleScene from './scenes/BattleScene';
import StrategyMenuScene from './scenes/StrategyMenuScene';


const gameData = {
    playerName: '',
    playerAttributes: {},
};


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [StrategyMenuScene, MainMenuScene, CharacterConfigScene, BattleScene], // Adicione suas cenas aqui
    gameData: gameData,
};

const game = new Phaser.Game(config);
console.log(game.registry.values); // Isso deve incluir playerName e playerAttributes