import { useSchedule } from '../src/context/ScheduleContext'
import './Header.css'

function Header() {
  // ✅ เรียกครั้งเดียว ข้างใน function รวมทุกอย่างไว้ที่นี่
  const { addDay, days, showToast } = useSchedule()

  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify(days, null, 2)],
      { type: 'application/json' }
    )
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'codetrack-backup.json'
    a.click()
    showToast('📤 Export สำเร็จ') // ✅ ย้ายเข้ามาใน handleExport ให้ถูกที่
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">{}</div>
        <div>
          <div className="title">
            Code<span>Track</span>
          </div>
          <div className="subtitle">ตารางฝึกเขียนโค้ด</div>
        </div>
      </div>

      <div className="header-actions">
        <button className="btn btn-ghost" onClick={handleExport}>
          📤 Export
        </button>
        <button className="btn btn-primary" onClick={addDay}>
          + เพิ่มวัน
        </button>
      </div>
    </header>
  )
}

export default Header