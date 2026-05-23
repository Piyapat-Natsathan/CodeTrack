import './App.css'
import { ScheduleProvider } from './context/ScheduleContext'
import Header from '../components/Header'
import StatsBar from '../components/Stats-bar'
import Main from '../components/Main/Main'
import TimerModal from '../components/TimerModal'

function App() {
  return (
    <ScheduleProvider>
      <Header />
      <StatsBar />
      <Main />
      <TimerModal />
    </ScheduleProvider>
  )
}

export default App