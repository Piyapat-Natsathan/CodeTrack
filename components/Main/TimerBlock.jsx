// src/components/Main/TimerBlock.jsx
import { useTimer } from '../../src/hooks/useTimer'
import './TimerBlock.css'

function TimerBlock({ day }) {
  const totalSeconds = day.durationMinutes * 60
  const { remaining, running, toggle, reset } = useTimer(totalSeconds)

  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60

  const pct = remaining / totalSeconds
  const circumference = 2 * Math.PI * 26

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="timer-block">
      {/* Progress Ring */}
      <div className="progress-ring">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle className="ring-bg" cx="30" cy="30" r="26" />
          <circle
            className="ring-fg"
            cx="30" cy="30" r="26"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct)}
          />
        </svg>
        <div className="ring-time">{pad(h)}:{pad(m)}</div>
      </div>

      {/* Display */}
      <div className="timer-info">
        <div className="timer-label">เวลาที่กำหนด</div>
        <div className="timer-value">
          {pad(h)}:{pad(m)}:{pad(s)}
        </div>
        <div className="timer-progress">
          <div
            className="timer-progress-bar"
            style={{ width: `${pct * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="timer-controls">
        <button
          className={`timer-btn ${running ? 'active' : ''}`}
          onClick={toggle}
        >
          {running ? '⏸' : '▶'}
        </button>
        <button className="timer-btn" onClick={reset}>↺</button>
      </div>
    </div>
  )
}

export default TimerBlock