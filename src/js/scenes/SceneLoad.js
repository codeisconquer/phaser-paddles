import Bar from "../classes/comps/Bar";
import Model from "../classes/mc/Model";
import Controller from "../classes/mc/Controller";
import Singleton from "../classes/mc/Singleton";
import MediaManager from "../classes/utility/MediaManager";

export default class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }

    preload() {

        const emitter = new Phaser.Events.EventEmitter();
        const model = new Model({emitter: emitter});
        const controller = new Controller({ emitter: emitter, model: model });
        const mediaManager = new MediaManager({ scene: this, emitter: emitter, model: model });
        const s = new Singleton({
            emitter: emitter,
            model: model,
            controller: controller,
            mediaManager: mediaManager
        });

        this.bar = new Bar({ scene: this, x: this.game.config.width / 2, y: this.game.config.height / 2 });
        this.progText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "0%", { color: "#ffcc00", fontSize: this.game.config.width / 20 });
        this.progText.setOrigin(0.5, 0.5);
        this.load.on("progress", this.onProgress, this);


        this.load.image("toggleBack", "images/ui/toggles/3.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");

        this.load.audio("flip", ["audio/flip.wav", "audio/flip.ogg"]);
        this.load.audio("hit", ["audio/hit.wav", "audio/hit.ogg"]);
        this.load.audio("lose", ["audio/lose.wav", "audio/lose.ogg"]);

        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("title", "images/title.png");
        this.load.image("titleBack", "images/titleBack.jpg");
        this.load.image("titleOver", "images/titleOver.png");

        this.load.spritesheet("balls", "images/balls.png", {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet("paddles", "images/paddles.png", {frameWidth: 400, frameHeight: 50});
        this.load.image("bar", "images/bar.jpg");

    }
    create() {
        this.scene.start("SceneMain"); //SceneTitle
    }

    onProgress(value) {

        this.bar.setPercent(value);
        var per = Math.floor(value * 100);
        this.progText.setText(`${per}%`);
    }

}