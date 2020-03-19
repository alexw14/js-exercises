class Timer {
  constructor(durationInput, startButton, pauseButton, cb) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (cb) {
      this.onStart = cb.onStart;
      this.onTick = cb.onTick;
      this.onComplete = cb.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 50);
  }

  pause = () => {
    clearInterval(this.interval);
  }

  tick = () => {
    if (this.timeRemaining > 0) {
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    } else {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    }
  }

  // Getters and Setters
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }

}