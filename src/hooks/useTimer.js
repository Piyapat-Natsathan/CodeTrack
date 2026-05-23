import { useState, useEffect } from 'react'

export function useTimer(totalSeconds) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    setRemaining(totalSeconds)
    setRunning(false)
  }, [totalSeconds])

  useEffect(() => {
    if (!running) return
    if (remaining <= 0) {
      setRunning(false)
      return
    }

    const id = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          setRunning(false)
          return 0
        }
        return r - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [running, remaining])

  const toggle = () => setRunning(r => !r)
  const reset = () => {
    setRunning(false)
    setRemaining(totalSeconds)
  }

  return { remaining, running, toggle, reset }
}
