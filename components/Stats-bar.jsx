import { useSchedule } from '../src/context/ScheduleContext'
import './Stats-bar.css'

function StatsBar() {
  const { days } = useSchedule()

  // คำนวณจาก days จริงๆ
  const totalDays = days.length
  const totalTopics = days.reduce((sum, d) => sum + (d.topics?.length ?? 0), 0)
  const totalExercises = days.reduce((sum, d) => sum + (d.exercises?.length ?? 0), 0)
  const totalHours = (days.reduce((sum, d) => sum + (d.durationMinutes ?? 0), 0) / 60).toFixed(1)

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <div className="stat-label">Total Days</div>
        <div className="stat-value green">{totalDays}</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Topics</div>
        <div className="stat-value purple">{totalTopics}</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Exercises</div>
        <div className="stat-value yellow">{totalExercises}</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Total Hours</div>
        <div className="stat-value red">{totalHours}h</div>
      </div>
    </div>
  )
}

export default StatsBar