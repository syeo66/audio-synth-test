import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { CaseContext } from '../components/Case'
import Module from '../components/Module'
import OutputSelector from '../components/OutputSelector'
import PushButton from '../components/PushButton'
import Sawtooth from '../icons/Sawtooth'
import Sine from '../icons/Sine'
import Square from '../icons/Square'
import Triangle from '../icons/Triangle'

const SingleOscillator = () => {
  const [oscillatorType, setOscillatorType] = useState<OscillatorType>('sine')

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

  // TODO: Generalize inputs / outputs selection

  return (
    <Module title="SingleOscillator">
      <div>
        <PushButton onClick={handleSelectSine} active={oscillatorType === 'sine'}>
          <Sine />
        </PushButton>

        <PushButton onClick={handleSelectTriangle} active={oscillatorType === 'triangle'}>
          <Triangle />
        </PushButton>
      </div>
      <div>
        <PushButton onClick={handleSelectSquare} active={oscillatorType === 'square'}>
          <Square />
        </PushButton>

        <PushButton onClick={handleSelectSawtooth} active={oscillatorType === 'sawtooth'}>
          <Sawtooth />
        </PushButton>
      </div>
      <div>
        <OutputSelector audioNode={oscillator.current} moduleName="singleOscillator" />
      </div>
    </Module>
  )
}

export default SingleOscillator
