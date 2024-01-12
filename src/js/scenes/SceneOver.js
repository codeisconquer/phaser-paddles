import Align from "../classes/utility/Align";
import AlignGrid from "../classes/utility/AlignGrid";
import FlatButton from "../classes/ui/FlatButton";
import Singleton from "../classes/mc/Singleton";
import Model from "../classes/mc/Model";
import Controller from "../classes/mc/Controller";
import MediaManager from "../classes/utility/MediaManager";

export default class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload() {

    }
    create() {
        const s = new Singleton();
        const emitter = s.emitter;
        const model = s.model;
        this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });

        this.backImage = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "titleBack");

        var title = this.add.image(0, 0, 'titleOver');
        Align.scaleToGameWidth(title, .8)
        this.alignGrid.placeAtIndex(38, title);

        var btnStart = new FlatButton({ scene: this, emitter: emitter, model: model, key: 'button1', text: 'Play Again!', event: 'start_game' });
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this);

    }
    startGame() {
        var s = new Singleton();
        s.destroy();
        const emitter = new Phaser.Events.EventEmitter();
        const model = new Model({emitter: emitter});
        const controller = new Controller({ emitter: emitter, model: model });
        const mediaManager = new MediaManager({ scene: this, emitter: emitter, model: model });
        s = new Singleton({
            emitter: emitter,
            model: model,
            controller: controller,
            mediaManager: mediaManager
        });
        this.scene.start('SceneMain');
    }
    update() { }
}