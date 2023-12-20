// CharacterConfigScene.js
import Phaser from 'phaser';

export default class CharacterConfigScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterConfigScene' });
        this.characterData = {
            pointsToDistribute: 10,
            minAttributePoints: 5,
            attributes: {
                ATK: 5,
                DEF: 5,
                SPD: 5,
                ACC: 5,
                EVA: 5,
                CRIT: 5,
            },
        };
        this.attributeTexts = {};
        this.pointsText = null;
    }

    preload() {
        // Carregue recursos específicos desta cena, se necessário
    }

    create() {
        // Adicione um fundo ou defina uma cor de fundo
        this.cameras.main.setBackgroundColor('#1e272e'); // Cor de fundo cinza escuro

        // Adicione atributos à tabela usando barras de progresso
        const startY = 150;
        const ySpacing = 50;
        const attributes = Object.keys(this.characterData.attributes);

        attributes.forEach((attribute, index) => {
            const labelText = this.add.text(150, startY + index * ySpacing, attribute, { fontSize: '24px', fill: '#fff' });

            const decreaseButton = this.add.text(300, startY + index * ySpacing, '-', { fontSize: '24px', fill: '#fff' })
                .setInteractive()
                .on('pointerdown', () => this.decreaseAttribute(attribute));

            const attributeText = this.add.text(350, startY + index * ySpacing, this.characterData.attributes[attribute], { fontSize: '24px', fill: '#fff' });

            const increaseButton = this.add.text(400, startY + index * ySpacing, '+', { fontSize: '24px', fill: '#fff' })
                .setInteractive()
                .on('pointerdown', () => this.increaseAttribute(attribute));

            this.attributeTexts[attribute] = attributeText;
        });
        
        // Adicione um texto dinâmico para exibir mensagens
        this.messageText = this.add.text(400, 500, '', { fontSize: '24px', fill: '#fff' })
        .setOrigin(0.5)
        .setAlpha(0); // Inicialmente, o texto está invisível
            
        // Adicione um campo para pontos a distribuir
        const pointsText = this.add.text(400, startY + attributes.length * ySpacing + 20, `Pontos Disponíveis: ${this.characterData.pointsToDistribute}`, { fontSize: '24px', fill: '#fff' });
        this.pointsText = pointsText;

        // Botão de confirmação
        const confirmButton = this.add.text(400, startY + attributes.length * ySpacing + 80, 'Confirmar', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

            confirmButton.on('pointerdown', () => {
                if (this.characterData.pointsToDistribute === 0) {
                    // Todos os pontos foram distribuídos, prossiga para a cena de batalha
                    this.registry.set('playerName', this.characterData.name);
                    this.registry.set('playerAttributes', { ...this.characterData.attributes });
                    this.scene.start('StrategyMenuScene');
                } else {
                    // Ainda há pontos a serem distribuídos, exiba uma mensagem na tela
                    this.showMessage('Distribua todos os pontos antes de confirmar.');
                }
            });
    }

    showMessage(text) {
        this.messageText.setText(text);
        this.messageText.setAlpha(1); // Torna o texto visível
        this.time.delayedCall(2000, () => {
            this.messageText.setAlpha(0); // Esconde o texto após 2 segundos
        });
    }

    decreaseAttribute(attribute) {
        if (this.characterData.attributes[attribute] > this.characterData.minAttributePoints) {
            this.characterData.attributes[attribute]--;
            this.characterData.pointsToDistribute++;
            this.updateAttributeDisplay(attribute);
            this.updatePointsText();
        }
    }

    increaseAttribute(attribute) {
        if (this.characterData.pointsToDistribute > 0) {
            this.characterData.attributes[attribute]++;
            this.characterData.pointsToDistribute--;
            this.updateAttributeDisplay(attribute);
            this.updatePointsText();
        }
    }

    updateAttributeDisplay(attribute) {
        this.attributeTexts[attribute].setText(this.characterData.attributes[attribute].toString());
    }

    updatePointsText() {
        this.pointsText.setText(`Pontos Disponíveis: ${this.characterData.pointsToDistribute}`);
    }

    update() {
        // Lógica de atualização da cena de configuração do personagem, se necessário
    }
}
