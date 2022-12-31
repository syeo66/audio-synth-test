import { useContext, useEffect, useRef } from 'react'

import { CaseContext } from '../components/Case'
import Module from '../components/Module'

const Gain = () => {
  const gain = useRef<GainNode>()

  const { audioCtx, registerModule } = useContext(CaseContext)

  useEffect(() => {
    if (!audioCtx) {
      return
    }

    gain.current = audioCtx.createGain()
    gain.current.connect(audioCtx.destination)
    gain.current.gain.setValueAtTime(0.1, audioCtx.currentTime)

    registerModule({ moduleName: 'gain', inputs: { main: gain.current } })
  }, [audioCtx, registerModule])

  return <Module title="Gain"></Module>
}

export default Gain
