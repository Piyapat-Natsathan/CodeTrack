import { useState } from 'react'
import { useSchedule } from '../src/context/ScheduleContext'
import './TimerModal.css'

const PRESETS = [
  { label: '30 นาที', minutes: 30 },
  { label: '1 ชั่วโมง', minutes: 60 },
  { label: '2 ชั่วโมง', minutes: 120 },
  { label: '3 ชั่วโมง', minutes: 180 },
  { label: '4 ชั่วโมง', minutes: 240 },
]

function TimerModal() {
  // ✅ เรียกครั้งเดียว รวม showToast เข้ามาด้วยเลย
  const {
    showTimerModal,
    setShowTimerModal,
    currentDay,
    updateDay,
    showToast,
  } = useSchedule()

  const [hours, setHours] = useState(2)
  const [mins, setMins] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState(120)

  if (!showTimerModal) return null

  const handlePreset = (minutes) => {
    setSelectedPreset(minutes)
    setHours(Math.floor(minutes / 60))
    setMins(minutes % 60)
  }

  const handleConfirm = () => {
    const total = hours * 60 + mins
    if (total <= 0) return
    updateDay(currentDay.id, { durationMinutes: total })
    setShowTimerModal(false)
    showToast(`⏱ ตั้งเวลา ${hours}h ${mins > 0 ? ` ${mins}m` : ''} แล้ว`)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setShowTimerModal(false)
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-title">
          ⏱ กำหนด<span>เวลา</span>
        </div>

        <div className="time-presets">
          {PRESETS.map(p => (
            <button
              key={p.minutes}
              className={`time-preset ${selectedPreset === p.minutes ? 'selected' : ''}`}
              onClick={() => handlePreset(p.minutes)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="custom-time-label">หรือกำหนดเอง:</div>
        <div className="custom-time">
          <input
            type="number"
            className="time-input"
            value={hours}
            min={0}
            max={24}
            onChange={e => {
              setHours(Number(e.target.value))
              setSelectedPreset(null)
            }}
          />
          <span className="time-sep">:</span>
          <input
            type="number"
            className="time-input"
            value={mins}
            min={0}
            max={59}
            onChange={e => {
              setMins(Number(e.target.value))
              setSelectedPreset(null)
            }}
          />
          <span className="custom-time-unit">ชม. : นาที</span>
        </div>

        <div className="modal-actions">
          <button
            className="btn btn-ghost"
            onClick={() => setShowTimerModal(false)}
          >
            ยกเลิก
          </button>
          <button className="btn btn-primary" onClick={handleConfirm}>
            ✓ ตั้งเวลา
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimerModal