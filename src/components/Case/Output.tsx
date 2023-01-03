import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import useGain from '../../hooks/useGain'
import Knob from '../Knob'
import { CaseContext } from './Case'

const Output: React.FC = () => {
  const { audioCtx } = useContext(CaseContext)

  const { currentGain, handleGainChange, gainNode } = useGain({ moduleName: 'case', inputName: 'output' })

  useEffect(() => {
    if (!audioCtx) {
      return
    }

    // connect to audioCtx
    gainNode.current?.connect(audioCtx.destination)
  }, [audioCtx, gainNode])

  return (
    <OutputWrapper>
      <Knob label="Output" min={0} max={1} step={0.05} value={currentGain} onChange={handleGainChange} />
    </OutputWrapper>
  )
}

const OutputWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem 3rem 0 0;
  margin: 0;
`

export default Output
