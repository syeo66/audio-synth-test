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

const SingleOscillator: React.FC = () => {
  const [oscillatorType, setOscillatorType] = useState<OscillatorType>('sine')

  const [currentFrequency, setCurrentFrequency] = useState(440)
  const [detune, setDetune] = useState(0)

  const oscillator = useRef<OscillatorNode>()

  const { audioCtx, registerModule } = useContext(CaseContext)

  // TODO Add default connections
  useEffect(() => {
    // initialize audio node
    if (!audioCtx) {
      return
    }

    oscillator.current = audioCtx.createOscillator()
    oscillator.current.start()
    oscillator.current.frequency.setValueAtTime(Math.random() * 100 + 100, audioCtx.currentTime)

    registerModule({
      moduleName: 'oscillator',
      inputs: {
        frequencyInputs: {
          frequency: (val) => setCurrentFrequency(val),
        },
      },
    })

    return () => {
      oscillator.current?.stop()
      oscillator.current?.disconnect()
    }
  }, [audioCtx, registerModule])

  useEffect(() => {
    if (!audioCtx) {
      return
    }
    oscillator.current?.frequency.setValueAtTime(applyDetune(currentFrequency, detune), audioCtx.currentTime)
  }, [audioCtx, currentFrequency, detune])

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

  const handleFrequencyChange = useCallback((v: number) => {
    const freq = valueToFrequency(v)
    setCurrentFrequency(freq)
  }, [])

  const handleDetuneChange = useCallback((v: number) => setDetune(v), [])

  const frequencyKnobValue = frequencyToValue(currentFrequency)

  return (
    <Module title="SingleOscillator">
      <ModuleSection>
        <PushButton onClick={handleSelectSine} active={oscillatorType === 'sine'}>
          <Sine />
        </PushButton>

        <PushButton onClick={handleSelectTriangle} active={oscillatorType === 'triangle'}>
          <Triangle />
        </PushButton>
      </ModuleSection>

      <ModuleSection>
        <PushButton onClick={handleSelectSquare} active={oscillatorType === 'square'}>
          <Square />
        </PushButton>

        <PushButton onClick={handleSelectSawtooth} active={oscillatorType === 'sawtooth'}>
          <Sawtooth />
        </PushButton>
      </ModuleSection>

      <ModuleSection>
        <Knob label="Freq" min={0} max={10} step={0.05} value={frequencyKnobValue} onChange={handleFrequencyChange} />
      </ModuleSection>

      <ModuleSection>
        <Knob label="Detune" min={-100} max={100} step={0.05} value={detune} onChange={handleDetuneChange} />
      </ModuleSection>

      <ModuleFooter>
        <NodeOutputSelector audioNode={oscillator.current} moduleName="singleOscillator" />
      </ModuleFooter>
    </Module>
  )
}

const applyDetune = (freq: number, detune: number) => freq * Math.pow(2, detune / 1200)
const frequencyToValue = (freq: number) => Math.log(freq / 5) / Math.log(2) - 2
const valueToFrequency = (v: number) => 20 * Math.pow(2, v)

export default SingleOscillator
