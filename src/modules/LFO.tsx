import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { CaseContext } from '../components/Case'
import Knob from '../components/Knob'
import Module from '../components/Module'
import ModuleFooter from '../components/ModuleFooter'
import ModuleSection from '../components/ModuleSection'
import NodeOutputSelector from '../components/NodeOutputSelector'
import PushButton from '../components/PushButton'
import Sawtooth from '../icons/Sawtooth'
import Sine from '../icons/Sine'
import Square from '../icons/Square'
import Triangle from '../icons/Triangle'

const LFO: React.FC = () => {
  const [oscillatorType, setOscillatorType] = useState<OscillatorType>('sine')
  const [currentFrequency, setCurrentFrequency] = useState(1)
  const [currentGain, setCurrentGain] = useState(1)

  const oscillator = useRef<OscillatorNode>(null)
  const gainNode = useRef<GainNode>(null)

  const { audioCtx, registerModule } = useContext(CaseContext)

  useEffect(() => {
    if (!audioCtx) {
      return
    }

    oscillator.current = audioCtx.createOscillator()
    gainNode.current = audioCtx.createGain()
    oscillator.current.connect(gainNode.current)
    oscillator.current.start()
    oscillator.current.frequency.setValueAtTime(1, audioCtx.currentTime)
    gainNode.current.gain.setValueAtTime(1, audioCtx.currentTime)

    registerModule({
      moduleName: 'lfo',
      inputs: {},
    })

    return () => {
      oscillator.current?.stop()
      oscillator.current?.disconnect()
      gainNode.current?.disconnect()
    }
  }, [audioCtx, registerModule])

  useEffect(() => {
    if (!audioCtx) {
      return
    }
    oscillator.current?.frequency.setValueAtTime(currentFrequency, audioCtx.currentTime)
  }, [audioCtx, currentFrequency])

  useEffect(() => {
    if (!audioCtx) {
      return
    }
    gainNode.current?.gain.setValueAtTime(currentGain, audioCtx.currentTime)
  }, [audioCtx, currentGain])

  const handleFrequencyChange = useCallback((v: number) => setCurrentFrequency(v), [])
  const handleGainChange = useCallback((v: number) => setCurrentGain(v), [])
  const handleSelect = useCallback((oscType: OscillatorType) => {
    if (!oscillator.current) {
      return
    }
    oscillator.current.type = oscType
    setOscillatorType(oscType)
  }, [])

  const handleSelectSine = useCallback(() => handleSelect('sine'), [handleSelect])
  const handleSelectTriangle = useCallback(() => handleSelect('triangle'), [handleSelect])
  const handleSelectSquare = useCallback(() => handleSelect('square'), [handleSelect])
  const handleSelectSawtooth = useCallback(() => handleSelect('sawtooth'), [handleSelect])

  return (
    <Module title="LFO">
      <ModuleSection>
        <PushButton onClick={handleSelectSine} $active={oscillatorType === 'sine'}>
          <Sine />
        </PushButton>

        <PushButton onClick={handleSelectTriangle} $active={oscillatorType === 'triangle'}>
          <Triangle />
        </PushButton>
      </ModuleSection>

      <ModuleSection>
        <PushButton onClick={handleSelectSquare} $active={oscillatorType === 'square'}>
          <Square />
        </PushButton>

        <PushButton onClick={handleSelectSawtooth} $active={oscillatorType === 'sawtooth'}>
          <Sawtooth />
        </PushButton>
      </ModuleSection>

      <ModuleSection>
        <Knob label="Freq." min={0.1} max={20} step={0.1} value={currentFrequency} onChange={handleFrequencyChange} />
      </ModuleSection>

      <ModuleSection>
        <Knob label="Gain" min={0} max={10000} step={0.01} value={currentGain} onChange={handleGainChange} />
      </ModuleSection>

      <ModuleFooter>
        {/* eslint-disable-next-line react-compiler/react-compiler */}
        <NodeOutputSelector audioNode={gainNode.current} moduleName="lfo" type="frequency" />
      </ModuleFooter>
    </Module>
  )
}

export default LFO
