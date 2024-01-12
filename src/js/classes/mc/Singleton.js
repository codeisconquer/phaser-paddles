class Singleton {
    constructor(config) {
      if (!Singleton.instance) {
        // Wenn keine Instanz vorhanden ist, erstelle eine
        this.score = 0;
        this.emitter = config.emitter;
        this.model = config.model;
        this.controller = config.controller;
        this.mediaManager = config.mediaManager;
        Singleton.instance = this;
      }
  
      // Rückgabe der Singleton-Instanz
      return Singleton.instance;
    }
  
    increaseScore() {
      this.score += 1;
      console.log('Score erhöht:', this.score);
    }

    destroy() {
      if (Singleton.instance) {
        Singleton.instance = null;
      }
    }
  }
  
  export default Singleton;