// MainMenuScene.js

import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // Carregue recursos específicos desta cena, como botões e fundo do menu principal
    }

    create() {
        // Adicione elementos do menu principal, como botões
        const startButton = this.add.text(400, 300, 'Start', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

        // Configuração de evento de clique para o botão
        startButton.on('pointerdown', () => {
            this.scene.start('CharacterConfigScene'); // Inicie a cena do menu de estratégia
        });
    }

    update() {
        // Lógica de atualização da cena do menu principal, se necessário
    }
}
