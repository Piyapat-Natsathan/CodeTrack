import './DayItem.css'

function DayItem({ day, isActive, onClick }) {
  // คำนวณ progress
  const donEx = day.exercises?.filter(e => e.status === 'done').length ?? 0
  const totalEx = day.exercises?.length ?? 0
  const doneTopic = day.topics?.filter(t => t.done).length ?? 0
  const totalTopic = day.topics?.length ?? 0

  const allDone = totalEx > 0 && donEx === totalEx && doneTopic === totalTopic
  const partial = donEx > 0 || doneTopic > 0

  // แสดงเวลา
  const h = Math.floor(day.durationMinutes / 60)
  const m = day.durationMinutes % 60
  const timeStr = m > 0 ? `${h}h ${m}m` : `${h}h`

  return (
    <div
      className={`day-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="day-badge">
        Day{String(day.num).padStart(2, '0')}
      </div>

      <div className="day-info">
        <div className="day-name">
          {day.title || 'ไม่มีชื่อ'}
        </div>
        <div className="day-meta">
          {timeStr} · {donEx}/{totalEx} ex
        </div>
      </div>

      <div className={`day-dot ${allDone ? 'done' : partial ? 'partial' : ''}`} />
    </div>
  )
}

export default DayItem