// src/components/Main/ExercisesSection.jsx
import { useState } from 'react'
import { useSchedule } from '../../src/context/ScheduleContext'
import ExerciseItem from './ExerciseItem'
import './Exercises.css'

function ExercisesSection({ day }) {
  const { updateDay } = useSchedule()
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('')
  const [desc, setDesc]   = useState('')
  const [diff, setDiff]   = useState('medium')

  const addExercise = () => {
    if (!title.trim()) return
    const newEx = {
      id: 'e-' + Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      difficulty: diff,
      status: 'todo',
    }
    updateDay(day.id, { exercises: [...day.exercises, newEx] })
    setTitle('')
    setDesc('')
    setDiff('medium')
  }

  const setStatus = (exId, status) => {
    const updated = day.exercises.map(e =>
      e.id === exId ? { ...e, status } : e
    )
    updateDay(day.id, { exercises: updated })
  }

  const deleteExercise = (exId) => {
    updateDay(day.id, {
      exercises: day.exercises.filter(e => e.id !== exId)
    })
  }

  return (
    <div className="section">
      {/* Header */}
      <div className="section-header" onClick={() => setOpen(o => !o)}>
        <div className="section-title">
          <div className="section-icon icon-green">💻</div>
          แบบฝึกหัด
          <span className="section-count">{day.exercises.length} ข้อ</span>
        </div>
        <span className={`section-toggle ${open ? 'open' : ''}`}>▾</span>
      </div>

      {/* Body */}
      {open && (
        <div className="section-body">
          {day.exercises.length === 0 && (
            <div className="empty-state">
              <div>🎯</div>ยังไม่มีแบบฝึกหัด เพิ่มด้านล่างได้เลย
            </div>
          )}

          {day.exercises.map((ex, i) => (
            <ExerciseItem
              key={ex.id}
              exercise={ex}
              index={i}
              onStatusChange={(status) => setStatus(ex.id, status)}
              onDelete={() => deleteExercise(ex.id)}
            />
          ))}

          {/* Add form */}
          <div className="add-form">
            <div className="form-row">
              <input
                className="form-input"
                placeholder="ชื่อแบบฝึกหัด..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addExercise()}
              />
              <select
                className="form-select"
                value={diff}
                onChange={e => setDiff(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="form-row">
              <input
                className="form-input"
                placeholder="รายละเอียด / โจทย์..."
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
              <button className="add-btn" onClick={addExercise}>
                + เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExercisesSection