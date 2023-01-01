import { ChangeEventHandler, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { CaseContext } from '../components/Case'
import Module from '../components/Module'
import PushButton from '../components/PushButton'
import Sawtooth from '../icons/Sawtooth'
import Sine from '../icons/Sine'
import Square from '../icons/Square'
import Triangle from '../icons/Triangle'

const SingleOscillator = () => {
  const [oscillatorType, setOscillatorType] = useState<OscillatorType>('sine')

  const oscillator = useRef<OscillatorNode>()

  const { audioCtx, inputs } = useContext(CaseContext)

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

  const inputsList = useMemo(() => {
    return Object.entries(inputs).reduce<Record<string, AudioNode>>((acc, [moduleName, moduleIns]) => {
      const moduleEntries = Object.entries(moduleIns).reduce<Record<string, AudioNode>>(
        (innerAcc, [inputName, inputNode]) => {
          const name = `${moduleName} > ${inputName}`
          return { ...innerAcc, [name]: inputNode }
        },
        {}
      )

      return { ...acc, ...moduleEntries }
    }, {})
  }, [inputs])

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
  const handleSelectOutput = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      const id = e.target.value
      const node = inputsList[id]

      oscillator.current?.disconnect()
      oscillator.current?.connect(node)
    },
    [inputsList]
  )

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
        <label>
          <select onChange={handleSelectOutput}>
            <option></option>
            {Object.entries(inputsList).map(([moduleName]) => (
              <option key={moduleName}>{moduleName}</option>
            ))}
          </select>
          {' ->'}
        </label>
      </div>
    </Module>
  )
}

export default SingleOscillator
