import Sidebar from './Sidebar'
import DayContent from './DayContent'
import './Main.css'

function Main() {
  return (
    <div className="main">
      <Sidebar />
      <DayContent />
    </div>
  )
}

export default Main