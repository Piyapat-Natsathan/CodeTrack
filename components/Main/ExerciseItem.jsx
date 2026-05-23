// src/components/Main/ExerciseItem.jsx

function ExerciseItem({ exercise, index, onStatusChange, onDelete }) {
  const diffClass = {
    easy:   'diff-easy',
    medium: 'diff-medium',
    hard:   'diff-hard',
  }[exercise.difficulty] ?? 'diff-medium'

  return (
    <div className="exercise-item">
      <div className="exercise-header">
        <span className="exercise-num">
          #{String(index + 1).padStart(2, '0')}
        </span>
        <span className="exercise-title-text">{exercise.title}</span>
        <span className={`exercise-difficulty ${diffClass}`}>
          {exercise.difficulty.toUpperCase()}
        </span>
        <button className="topic-delete" onClick={onDelete}>×</button>
      </div>

      {exercise.desc && (
        <div className="exercise-desc">{exercise.desc}</div>
      )}

      <div className="exercise-status">
        {['todo', 'active', 'done'].map(s => (
          <button
            key={s}
            className={`status-btn ${exercise.status === s ? 
              s === 'done' ? 'done-status' : 'active-status' : ''
            }`}
            onClick={() => onStatusChange(s)}
          >
            {{ todo: '📋 TODO', active: '⚡ กำลังทำ', done: '✅ เสร็จแล้ว' }[s]}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ExerciseItem