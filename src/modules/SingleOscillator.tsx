import { useContext, useEffect, useRef } from 'react'

import { CaseContext } from '../components/Case'
import Module from '../components/Module'

const SingleOscillator = () => {
  const oscillator = useRef<OscillatorNode>()
  const { audioCtx } = useContext(CaseContext)

  useEffect(() => {
    if (!audioCtx) {
      return
    }

    oscillator.current = audioCtx.createOscillator()
    oscillator.current.connect(audioCtx.destination)
    oscillator.current.start()
    oscillator.current.frequency.setValueAtTime(Math.random() * 100 + 100, audioCtx.currentTime)

    return () => {
      oscillator.current?.stop()
      oscillator.current?.disconnect()
    }
  }, [audioCtx])

  return <Module>SingleOscillator</Module>
}

export default SingleOscillator
