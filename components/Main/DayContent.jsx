import { useSchedule } from '../../src/context/ScheduleContext'
import TimerBlock from './TimerBlock'
import TopicsSection from './TopicsSection'
import ExercisesSection from './ExercisesSection'
import './DayContent.css'

function DayContent() {
  const { currentDay, updateDay, deleteDay, setShowTimerModal } = useSchedule()

  // ยังไม่ได้เลือกวัน
  if (!currentDay) {
    return (
      <div className="content content--empty">
        <div className="empty-icon">📅</div>
        <div className="empty-title">เลือกวัน หรือเพิ่มวันใหม่</div>
        <div className="empty-sub">กด "+ เพิ่มวัน" เพื่อเริ่มวางแผนการเรียน</div>
      </div>
    )
  }

  const handleTitleChange = (e) => {
    updateDay(currentDay.id, { title: e.target.value })
  }

  const handleDelete = () => {
    if (confirm('ลบวันนี้?')) deleteDay(currentDay.id)
  }

  const h = Math.floor(currentDay.durationMinutes / 60)
  const m = currentDay.durationMinutes % 60

  return (
    <div className="content">
      {/* Day Header */}
      <div className="day-header">
        <div className="day-title-area">
          <div className="day-number">
            DAY {String(currentDay.num).padStart(2, '0')}
          </div>
          <div className="day-title-scroll">
            <input
              className="day-title-input"
              value={currentDay.title}
              placeholder="ชื่อหัวข้อวันนี้..."
              onChange={handleTitleChange}
            />
          </div>
        </div>

        <div className="day-controls">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowTimerModal(true)}
          >
            ⏱ {h}h{m > 0 ? ` ${m}m` : ''}
          </button>
          <button
            className="btn btn-ghost btn-sm btn-danger"
            onClick={handleDelete}
          >
            🗑
          </button>
        </div>
      </div>

      {/* Timer */}
      <TimerBlock day={currentDay} />

      {/* Topics */}
      <TopicsSection day={currentDay} />

      {/* Exercises */}
      <ExercisesSection day={currentDay} />
    </div>
  )
}

export default DayContent