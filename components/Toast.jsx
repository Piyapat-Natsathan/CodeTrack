let state = {
  days: [],
  currentDay: null,
  nextDayNum: 1,
  timer: {
    running: false,
    totalSeconds: 7200,
    remainingSeconds: 7200,
    interval: null,
    startTime: null
  }
};