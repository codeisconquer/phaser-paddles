import Road from "../classes/Road";
import { G } from "../index";
import AlignGrid from "../classes/utility/AlignGrid";
import Align from "../classes/utility/Align";
import SoundButtons from "../classes/ui/SoundButtons";
import ScoreBox from "../classes/comps/ScoreBox";
import Singleton from "../classes/mc/Singleton";
import FlatButton from "../classes/ui/FlatButton";
import { Sound } from "phaser";

export default class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() { }
    create() {
        const s = new Singleton();
        const emitter = s.emitter;
        this.emitter = emitter;
        const model = s.model;
        this.mediaManager = s.mediaManager;


        this.alignGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });


        var soundButtons = new SoundButtons({ scene: this, model: model, emitter: emitter });


        this.velocity = 100;
        this.centerX = this.game.config.width / 2;
        this.centerY = this.game.config.height / 2;
        this.quarter = this.game.config.height / 4;
        this.pMove = this.game.config.height / 32;

        this.bar = this.add.image(this.centerX, this.centerY, "bar");
        this.bar.displayWidth = this.game.config.width / 3;
        this.bar.displayHeight = this.game.config.height;


        this.ball = this.physics.add.sprite(this.centerX, this.centerY, "balls");
        Align.scaleToGameWidth(this.ball, .05);


        this.paddle1 = this.physics.add.sprite(this.centerX, this.quarter, "paddles");
        Align.scaleToGameWidth(this.paddle1, .25);
        this.pScale = this.paddle1.scaleX;


        this.paddle2 = this.physics.add.sprite(this.centerX, this.quarter * 3, "paddles");
        Align.scaleToGameWidth(this.paddle2, .25);

        this.setBallColor();
        this.ball.setVelocity(0, this.velocity);
        this.paddle1.setImmovable();
        this.paddle2.setImmovable();
        this.physics.add.collider(this.ball, this.paddle1, this.ballHit, null, this);
        this.physics.add.collider(this.ball, this.paddle2, this.ballHit, null, this);

        var scoreBox = new ScoreBox({ scene: this, model: model, emitter: emitter });
        this.alignGrid.placeAtIndex(5, scoreBox);
        // this.alignGrid.showNumbers();

        this.input.on("pointerdown", this.changePaddle, this);
        this.input.on("pointerup", this.onUp, this);
    }

    onUp(pointer) {
        var diff = Math.abs(pointer.y - this.downY);
        if (diff > 300) {
            this.tweens.add({ targets: this.paddle1, duration: 1000, y: this.quarter });
            this.tweens.add({ targets: this.paddle2, duration: 1000, y: this.quarter * 3 });
        }
    }

    changePaddle(pointer) {

        var paddle = (this.velocity > 0) ? this.paddle2 : this.paddle1;
        this.tweens.add({
            targets: paddle, duration: 500, scaleX: 0,
            onComplete: this.onCompleteHandler, onCompleteParams: [{ scope: this, paddle: paddle }]
        });


        this.downY = pointer.y

        this.mediaManager.playSound("flip");
    }
    onCompleteHandler(tween, targets, custom) {

        var paddle = custom.paddle;
        paddle.scaleX = custom.scope.pScale;
        var color = (paddle.frame.name == 1) ? 0 : 1;
        paddle.setFrame(color);
    }

    setBallColor() {
        var r = Math.floor(Math.random() * 100);
        if (r < 50) {
            this.ball.setFrame(0)
        } else {
            this.ball.setFrame(1)
        }
    }

    ballHit(ball, paddle) {
        this.velocity = -this.velocity;
        this.velocity *= 1.01;
        this.mediaManager.playSound("hit");
        var distY = Math.abs(this.paddle1.y - this.paddle2.y);
        if (ball.frame.name == paddle.frame.name) {

            var points = 1;
            
            if (distY < this.game.config.height / 3) {
                points = 2;
            } else if (distY < this.game.config.height / 4) {
                points = 3;
            }
            this.emitter.emit(G.UP_POINTS, points);
        } else {
            this.time.addEvent({ delay: 2000, callback: this.doOver, callbackScope: this, loop: false });

        }

        ball.setVelocity(0, this.velocity);
        this.setBallColor();

        var targetY = 0;
        if (distY > this.game.config.height / 5) {
            if (paddle.y > this.centerY) {
                targetY = paddle.y - this.pMove;
            } else {
                targetY = paddle.y + this.pMove
            }
    
            this.tweens.add({ targets: paddle, duration: 1000, y: targetY });
        }
        
    }

    doOver() {
        this.scene.start("SceneOver");
    }
    onEnd() {
        this.scene.start('SceneOver');
    }
    onClick() {

        console.log('click...', new Date())
        const s = new Singleton();
        const mediaManager = s.mediaManager;
        mediaManager.playSound("alarm");

    }
    update() { }

}