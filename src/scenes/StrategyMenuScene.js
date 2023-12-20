// StrategyMenuScene.js

import Phaser from 'phaser';

export default class StrategyMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StrategyMenuScene' });
    }

    preload() {
        // Carregue recursos específicos desta cena, se necessário
    }

    create() {
        // Adicione um fundo ou defina uma cor de fundo
        this.cameras.main.setBackgroundColor('#2ecc71'); // Cor de fundo verde

        // Adicione elementos à cena (botões, textos, etc.)
        const titleLabel = this.add.text(400, 100, 'Menu de Estratégia', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5);

        const backButton = this.add.text(50, 50, 'Voltar', { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => this.goBackToMainMenu());
    }

    goBackToMainMenu() {
        this.scene.start('MainMenuScene');
    }

    // Adicione outros métodos conforme necessário
}
