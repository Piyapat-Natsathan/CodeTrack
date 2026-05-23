import { useState } from 'react'
import { useSchedule } from '../../src/context/ScheduleContext'
import TopicItem from './TopicItem'
import './Topics.css'

function TopicsSection({ day }) {
  const { updateDay, showToast } = useSchedule()
  const [open, setOpen] = useState(true)
  const [text, setText] = useState('')
  const [tag, setTag] = useState('')

  const addTopic = () => {
    if (!text.trim()) return
    const newTopic = {
      id: 't-' + Date.now(),
      text: text.trim(),
      tag: tag.trim(),
      done: false,
    }
    updateDay(day.id, { topics: [...day.topics, newTopic] })
    setText('')
    setTag('')
    showToast('📚 เพิ่มเนื้อหาแล้ว')
  }

  const toggleTopic = (topicId) => {
    const updated = day.topics.map(t =>
      t.id === topicId ? { ...t, done: !t.done } : t
    )
    updateDay(day.id, { topics: updated })
  }

  const deleteTopic = (topicId) => {
    updateDay(day.id, {
      topics: day.topics.filter(t => t.id !== topicId)
    })
  }

  return (
    <div className="section">
      {/* Header */}
      <div className="section-header" onClick={() => setOpen(o => !o)}>
        <div className="section-title">
          <div className="section-icon icon-blue">📚</div>
          เนื้อหาที่เรียน
          <span className="section-count">{day.topics.length} หัวข้อ</span>
        </div>
        <span className={`section-toggle ${open ? 'open' : ''}`}>▾</span>
      </div>

      {/* Body */}
      {open && (
        <div className="section-body">
          {day.topics.length === 0 && (
            <div className="empty-state">
              <div>📝</div>ยังไม่มีเนื้อหา เพิ่มด้านล่างได้เลย
            </div>
          )}

          {day.topics.map(topic => (
            <TopicItem
              key={topic.id}
              topic={topic}
              onToggle={() => toggleTopic(topic.id)}
              onDelete={() => deleteTopic(topic.id)}
            />
          ))}

          {/* Add form */}
          <div className="add-form">
            <div className="form-row">
              <input
                className="form-input"
                placeholder="เพิ่มหัวข้อที่เรียน..."
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTopic()}
              />
              <input
                className="form-input input-tag"
                placeholder="Tag"
                value={tag}
                onChange={e => setTag(e.target.value)}
              />
              <button className="add-btn green" onClick={addTopic}>
                + เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopicsSection