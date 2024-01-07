import {G} from "../../index";
import Singleton from "../mc/Singleton";

export default class ScoreBox extends Phaser.GameObjects.Container {
    constructor(config) {

        super(config.scene);
        const emitter = config.emitter;
        this.model = config.model;
        this.scene = config.scene;

        this.text1 = this.scene.add.text(0, 0, "SCORE:0", {fontSize: config.scene.game.config.width/20});
        this.text1.setOrigin(0.5, 0.5);
        this.text1.setBackgroundColor("#000000");
        this.add(this.text1);

        this.scene.add.existing(this);

        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
    }

    scoreUpdated() {
        const s = new Singleton();
        const model = s.model;
        this.text1.setText("SCORE:" + model.getScore());
    }
}