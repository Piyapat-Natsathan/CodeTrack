import { useSchedule } from '../../src/context/ScheduleContext'
import DayItem from './DayItem'
import './Sidebar.css'

function Sidebar() {
  const { days, currentDayId, setCurrentDayId, addDay } = useSchedule()

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Days</span>
        <button className="btn btn-ghost btn-sm" onClick={addDay}>+</button>
      </div>

      <div className="day-list">
        {days.length === 0 && (
          <div className="sidebar-empty">ยังไม่มีวัน กด + เพิ่มเลย</div>
        )}

        {days.map(day => (
          <DayItem
            key={day.id}
            day={day}
            isActive={day.id === currentDayId}
            onClick={() => setCurrentDayId(day.id)}
          />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar