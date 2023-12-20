import Phaser from 'phaser';
import StrategyMenuPNG from '../assets/StrategyMenu/StrategyMenuPNG.png';
import mapJson from '../assets/StrategyMenu/StrategyMenu.json';
import item from '../assets/PNG/Background/Icon1_no_effect.png';

export default class StrategyMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StrategyMenuScene' });
        this.draggingItem = false;
        this.selectedItem = null;
    }

    preload() {
        this.load.image('tiles', StrategyMenuPNG);
        this.load.tilemapTiledJSON('map', mapJson);
        this.load.image('item', item);
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('01 Border 03', 'tiles');

        // Adicione as camadas do seu mapa
        const itemsLayer = map.createLayer('ItensPersonagens', tileset);
        const bagLayer = map.createLayer('Bag', tileset);

        // Adicione a imagem StrategyMenuPNG como background
        this.add.image(0, 0, 'tiles').setOrigin(0);

        // Encontre as coordenadas da posição desejada na camada "Bag"
        const bagPosition = this.findBagPosition(map);
        if (bagPosition) {
            // Adicione um item na camada de itens e defina a posição na bag
            this.item = this.add.image(bagPosition.x, bagPosition.y, 'item').setInteractive();
            this.input.setDraggable(this.item);

            // Configurar objetos interativos
            this.input.on('pointerdown', this.handlePointerDown, this);
            this.input.on('pointerup', this.handlePointerUp, this);
            this.input.on('pointermove', this.handlePointerMove, this);
        }
    }

    findBagPosition(map) {
        const bagLayer = map.layers.find(layer => layer.name === 'Bag');
        const bagPosition = { x: 0, y: 0 };

        if (bagLayer) {
            bagLayer.data.forEach((row, rowIndex) => {
                const colIndex = row.indexOf(1); // Assumindo que 1 representa a posição desejada
                if (colIndex !== -1) {
                    bagPosition.x = colIndex * map.tileWidth;
                    bagPosition.y = rowIndex * map.tileHeight;
                }
            });
        }

        return bagPosition;
    }

    handlePointerDown(pointer, gameObject) {
        // Lógica ao clicar/drag no objeto
        this.draggingItem = true;
        this.selectedItem = gameObject;
    }

    handlePointerUp() {
        // Lógica ao soltar o objeto
        this.draggingItem = false;
        this.selectedItem = null;
    }

    handlePointerMove(pointer, x, y) {
        // Lógica ao mover o objeto (se estiver arrastando)
        if (this.draggingItem) {
            this.selectedItem.x = x;
            this.selectedItem.y = y;
        }
    }
}
