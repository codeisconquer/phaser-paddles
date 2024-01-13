import Align from "../classes/utility/Align";
import AlignGrid from "../classes/utility/AlignGrid";
import FlatButton from "../classes/ui/FlatButton";
import Singleton from "../classes/mc/Singleton";

export default class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload() {

    }
    create() {
        const s = new Singleton();
        console.log("s 2", s);
        const emitter = s.emitter;
        const mediaManager = s.mediaManager;

        this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
        this.backImage = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "titleBack");

        var title = this.add.image(0, 0, 'title');
        Align.scaleToGameWidth(title, .8)
        this.alignGrid.placeAtIndex(38, title);

        var btnStart = new FlatButton({ scene: this, emitter: emitter, model: s.model, key: 'button1', 
            event: 'start_game', text: "Start Game" });
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on("start_game", this.startGame, this);
        

        this.centerX = this.game.config.width / 2;
        this.centerY = this.game.config.height / 2;
        this.ball = this.physics.add.sprite(this.centerX, this.centerY, 'balls');
        this.ball.body.setBounce(0, 1);
        this.ball.body.setVelocity(0, 100);
        this.ball.body.collideWorldBounds = true;
        Align.scaleToGameWidth(this.ball, 0.05);
    }

    startGame() {

        this.scene.start("SceneMain");
    }
    update() { }
}