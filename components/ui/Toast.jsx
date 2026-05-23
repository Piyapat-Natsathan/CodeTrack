import { useSchedule } from '../../src/context/ScheduleContext'
import './Toast.css'

function Toast() {
  const { toast } = useSchedule()

  return (
    <div className={`toast ${toast.visible ? 'show' : ''}`}>
      {toast.message}
    </div>
  )
}

export default Toast