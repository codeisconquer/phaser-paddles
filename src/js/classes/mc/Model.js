import { emitter, G } from "../../index";
import Singleton from "./Singleton";

export default class Model {
    constructor(config) {

        this._gameOver = false;
        this.score = 0;
        this._soundOn = true;
        this._musicOn = true;

        this.emitter = config.emitter;
        this.isMobile = navigator.userAgent.indexOf("Mobile");
        if (this.isMobile == -1) {
            this.isMobile = navigator.userAgent.indexOf("Tablet");
        }

        this.reset();
    }

    reset() {
        this._gameOver = false;
        this.speed = 1;
        this._score = 0;
    }

    setScore(val) {
        this.score = val;
        console.log('Score updated', this._score);
        if (this._gameOver == true) return;
        const s = new Singleton();
        s.emitter.emit(G.SCORE_UPDATED);
    }

    getScore() {
        return this.score;
    }

    get gameOver() {
        return this._gameOver;
    }

    set gameOver(val) {
        this._gameOver = val;
    }

    get soundOn() {
        return this._soundOn;
    }

    set soundOn(val) {
        this._soundOn = val;
    }

    get musicOn() {
        return this._musicOn;
    }

    set musicOn(val) {
        this._musicOn = val;
        const s = new Singleton();
        s.emitter.emit(G.MUSIC_CHANGED);
        s.mediaManager.musicChanged();
    }
}