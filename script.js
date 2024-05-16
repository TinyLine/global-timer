class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      days: document.querySelector(`${this.selector} [data-value="days"]`),
      hours: document.querySelector(`${this.selector} [data-value="hours"]`),
      mins: document.querySelector(`${this.selector} [data-value="mins"]`),
      secs: document.querySelector(`${this.selector} [data-value="secs"]`),
    };
    this.start();
  }

  start() {
    this.updateClockface(this.calculateTimeRemaining());
    this.intervalId = setInterval(() => {
      const time = this.calculateTimeRemaining();
      this.updateClockface(time);
      if (time.total <= 0) {
        clearInterval(this.intervalId);
        this.updateClockface({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    }, 1000);
  }

  calculateTimeRemaining() {
    const now = new Date();
    const time = this.targetDate - now;
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { total: time, days, hours, mins, secs };
  }

  updateClockface({ days, hours, mins, secs }) {
    this.refs.days.textContent = String(days).padStart(2, "0");
    this.refs.hours.textContent = String(hours).padStart(2, "0");
    this.refs.mins.textContent = String(mins).padStart(2, "0");
    this.refs.secs.textContent = String(secs).padStart(2, "0");
  }
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2024 00:00:00"),
});
