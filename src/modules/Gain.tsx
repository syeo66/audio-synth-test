import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { CaseContext } from '../components/Case'
import Knob from '../components/Knob'
import Module from '../components/Module'
import OutputSelector from '../components/OutputSelector'

const Gain = () => {
  const gain = useRef<GainNode>()

  const [currentGain, setCurrentGain] = useState(0.5)

  const { audioCtx, registerModule } = useContext(CaseContext)

  useEffect(() => {
    // initialize the gain module
    if (!audioCtx) {
      return
    }

    gain.current = audioCtx.createGain()
    gain.current.gain.setValueAtTime(0, audioCtx.currentTime)

    registerModule({ moduleName: 'gain', inputs: { main: gain.current } })
  }, [audioCtx, registerModule])

  useEffect(() => {
    // set the current gain
    if (!audioCtx || !gain.current) {
      return
    }

    gain.current.gain.setValueAtTime(currentGain, audioCtx.currentTime)
  }, [audioCtx, currentGain])

  const handleGainChange = useCallback((v: number) => setCurrentGain(v), [])

  return (
    <Module title="Gain">
      <div>
        <Knob label="Gain" min={0} max={1} step={0.05} value={currentGain} onChange={handleGainChange} />
      </div>
      <div>
        <OutputSelector audioNode={gain.current} moduleName="gain" />
      </div>
    </Module>
  )
}

export default Gain
