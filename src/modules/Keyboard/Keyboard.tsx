import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { CaseContext } from '../../components/Case'
import Module from '../../components/Module'
import ModuleFooter from '../../components/ModuleFooter'
import NodeOutputSelector from '../../components/NodeOutputSelector'
import PushButton from '../../components/PushButton'
import Key from './Key'

export interface Note {
  note: 'a' | 'a#' | 'b' | 'c' | 'c#' | 'd' | 'd#' | 'e' | 'f' | 'f#' | 'g' | 'g#'
  freq: number
  color: 'white' | 'black'
}

const notes: Note[] = [
  { note: 'a', freq: 220, color: 'white' },
  { note: 'a#', freq: 233.08, color: 'black' },
  { note: 'b', freq: 246.94, color: 'white' },
  { note: 'c', freq: 261.63, color: 'white' },
  { note: 'c#', freq: 277.18, color: 'black' },
  { note: 'd', freq: 293.66, color: 'white' },
  { note: 'd#', freq: 311.13, color: 'black' },
  { note: 'e', freq: 329.63, color: 'white' },
  { note: 'f', freq: 349.23, color: 'white' },
  { note: 'f#', freq: 369.99, color: 'black' },
  { note: 'g', freq: 392.0, color: 'white' },
  { note: 'g#', freq: 415.3, color: 'black' },
  // ----------------------------------------------
  { note: 'a', freq: 220 * 2, color: 'white' },
  { note: 'a#', freq: 233.08 * 2, color: 'black' },
  { note: 'b', freq: 246.94 * 2, color: 'white' },
  { note: 'c', freq: 261.63 * 2, color: 'white' },
  { note: 'c#', freq: 277.18 * 2, color: 'black' },
  { note: 'd', freq: 293.66 * 2, color: 'white' },
  { note: 'd#', freq: 311.13 * 2, color: 'black' },
  { note: 'e', freq: 329.63 * 2, color: 'white' },
]

const Keyboard: React.FC = () => {
  const audioNode = useRef<ConstantSourceNode>(null)

  const { audioCtx, registerModule } = useContext(CaseContext)

  const [octave, setOctave] = useState(0)

  useEffect(() => {
    // initialize the gain module
    if (!audioCtx) {
      return
    }

    audioNode.current = audioCtx.createConstantSource()
    audioNode.current.offset.setValueAtTime(0, audioCtx.currentTime)
    audioNode.current.start()
  }, [audioCtx, registerModule])

  const handleFreqChange = useCallback(
    (f: number) => {
      if (!audioCtx) {
        return
      }

      audioNode.current?.offset.setValueAtTime(f, audioCtx.currentTime)
    },
    [audioCtx]
  )

  const handleOctaveChange = useCallback((v: number) => setOctave(v), [])

  return (
    <Module title="Keyboard">
      <div>
        <PushButton $small onClick={() => handleOctaveChange(-2)} $active={octave === -2}>
          -2
        </PushButton>
        <PushButton $small onClick={() => handleOctaveChange(-1)} $active={octave === -1}>
          -1
        </PushButton>
        <PushButton $small onClick={() => handleOctaveChange(0)} $active={octave === 0}>
          0
        </PushButton>
        <PushButton $small onClick={() => handleOctaveChange(1)} $active={octave === 1}>
          +1
        </PushButton>
        <PushButton $small onClick={() => handleOctaveChange(2)} $active={octave === 2}>
          +2
        </PushButton>
      </div>

      <KeyboardWrapper>
        <KeysWrapper>
          {notes.map((note) => (
            <Key key={`${note.freq}${octave}`} onPlay={handleFreqChange} note={note} octave={octave} />
          ))}
        </KeysWrapper>
      </KeyboardWrapper>

      <ModuleFooter>
        <NodeOutputSelector moduleName="keyboard" audioNode={audioNode.current} type="frequency" />
      </ModuleFooter>
    </Module>
  )
}

const KeyboardWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
const KeysWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

export default Keyboard
