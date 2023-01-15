import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { CaseContext } from '../components/Case'
import Knob from '../components/Knob'
import Module from '../components/Module'
import ModuleFooter from '../components/ModuleFooter'
import ModuleSection from '../components/ModuleSection'
import NodeOutputSelector from '../components/NodeOutputSelector'

const Filter12db: React.FC = () => {
  const filterNode = useRef<BiquadFilterNode>()

  const [currentFrequency, setCurrentFrequency] = useState(2000)
  const [currentQ, setCurrentQ] = useState(0)

  const { audioCtx, registerModule } = useContext(CaseContext)

  useEffect(() => {
    // initialize the gain module
    if (!audioCtx) {
      return
    }

    filterNode.current = audioCtx.createBiquadFilter()
    filterNode.current.frequency.setValueAtTime(0, audioCtx.currentTime)

    registerModule({ moduleName: 'filter 12dB', inputs: { nodeInputs: { main: filterNode.current } } })
  }, [audioCtx, registerModule])

  useEffect(() => {
    // set the current frequency
    if (!audioCtx || !filterNode.current) {
      return
    }

    filterNode.current.frequency.setValueAtTime(currentFrequency, audioCtx.currentTime)
  }, [audioCtx, currentFrequency])

  useEffect(() => {
    // set the current Q
    if (!audioCtx || !filterNode.current) {
      return
    }

    filterNode.current.Q.setValueAtTime(currentQ, audioCtx.currentTime)
  }, [audioCtx, currentQ])

  const handleFilterChange = useCallback((v: number) => setCurrentFrequency(v), [])
  const handleQChange = useCallback((v: number) => setCurrentQ(v), [])

  return (
    <Module title="12dB Filter">
      <ModuleSection>
        <Knob label="Freq." min={20} max={10000} step={20} value={currentFrequency} onChange={handleFilterChange} />
      </ModuleSection>
      <ModuleSection>
        <Knob label="Q" min={0} max={30} step={0.5} value={currentQ} onChange={handleQChange} />
      </ModuleSection>
      <ModuleFooter>
        <NodeOutputSelector audioNode={filterNode.current} moduleName="filter 12dB" />
      </ModuleFooter>
    </Module>
  )
}

export default Filter12db
