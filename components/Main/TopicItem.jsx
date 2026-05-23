function TopicItem({ topic, onToggle, onDelete }) {
  return (
    <div className="topic-item">
      <input
        type="checkbox"
        className="topic-checkbox"
        checked={topic.done}
        onChange={onToggle}
      />
      <span className={`topic-text ${topic.done ? 'done' : ''}`}>
        {topic.text}
      </span>
      {topic.tag && (
        <span className="topic-tag">{topic.tag}</span>
      )}
      <button className="topic-delete" onClick={onDelete}>×</button>
    </div>
  )
}

export default TopicItem