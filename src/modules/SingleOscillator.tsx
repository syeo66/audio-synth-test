import { useCallback, useContext, useEffect, useRef, useState } from 'react'

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

const SingleOscillator = () => {
  const [oscillatorType, setOscillatorType] = useState<OscillatorType>('sine')
  const [currentFrequencyValue, setCurrentFrequencyValue] = useState(4)

  const oscillator = useRef<OscillatorNode>()

  const { audioCtx } = useContext(CaseContext)

  // TODO Add default connections
  useEffect(() => {
    // initialize audio node
    if (!audioCtx) {
      return
    }

    oscillator.current = audioCtx.createOscillator()
    oscillator.current.start()
    oscillator.current.frequency.setValueAtTime(Math.random() * 100 + 100, audioCtx.currentTime)

    return () => {
      oscillator.current?.stop()
      oscillator.current?.disconnect()
    }
  }, [audioCtx])

  useEffect(() => {
    if (!audioCtx) {
      return
    }
    oscillator.current?.frequency.setValueAtTime(20 * Math.pow(2, currentFrequencyValue), audioCtx.currentTime)
  }, [audioCtx, currentFrequencyValue])

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

  const handleFrequencyChange = useCallback((v: number) => setCurrentFrequencyValue(v), [])

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
        <Knob
          label="Freq"
          min={0}
          max={10}
          step={0.05}
          value={currentFrequencyValue}
          onChange={handleFrequencyChange}
        />
      </ModuleSection>

      <ModuleFooter>
        <NodeOutputSelector audioNode={oscillator.current} moduleName="singleOscillator" />
      </ModuleFooter>
    </Module>
  )
}

export default SingleOscillator
