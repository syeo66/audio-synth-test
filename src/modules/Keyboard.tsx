import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'

import type { FrequencyInput } from '../components/Case'
import FrequencyOutputSelector from '../components/FrequencyOutputSelector'
import Module from '../components/Module'
import ModuleFooter from '../components/ModuleFooter'

const Keyboard: React.FC = () => {
  const frequencyOutput = useRef<FrequencyInput>()

  const handleChange = useCallback((e: FrequencyInput) => {
    frequencyOutput.current = e
  }, [])

  const handleFreqChange = useCallback((f: number) => frequencyOutput.current?.(f), [])

  return (
    <Module title="Keyboard">
      <KeyboardWrapper>
        <KeysWrapper>
          <WhiteKey onClick={() => handleFreqChange(329.63 * 2)}>e</WhiteKey>
          <BlackKey onClick={() => handleFreqChange(311.13 * 2)} />
          <WhiteKey onClick={() => handleFreqChange(293.66 * 2)}>d</WhiteKey>
          <BlackKey onClick={() => handleFreqChange(277.18 * 2)} />
          <WhiteKey onClick={() => handleFreqChange(261.63 * 2)}>c</WhiteKey>
          <WhiteKey onClick={() => handleFreqChange(246.94 * 2)}>b</WhiteKey>
          <BlackKey onClick={() => handleFreqChange(233.08 * 2)} />
          <WhiteKey onClick={() => handleFreqChange(440)}>a</WhiteKey>
          <BlackKey onClick={() => handleFreqChange(415.3)} />
          <WhiteKey onClick={() => handleFreqChange(392.0)}>g</WhiteKey>
          <BlackKey onClick={() => handleFreqChange(369.99)} />
          <WhiteKey onClick={() => handleFreqChange(349.23)}>f</WhiteKey>
          <WhiteKey onClick={() => handleFreqChange(329.63)}>e</WhiteKey>
          <BlackKey onClick={() => handleFreqChange(311.13)} />
          <WhiteKey onClick={() => handleFreqChange(293.66)}>d</WhiteKey>
          <BlackKey onClick={() => handleFreqChange(277.18)} />
          <WhiteKey onClick={() => handleFreqChange(261.63)}>c</WhiteKey>
          <WhiteKey onClick={() => handleFreqChange(246.94)}>b</WhiteKey>
          <BlackKey onClick={() => handleFreqChange(233.08)} />
          <WhiteKey onClick={() => handleFreqChange(220)}>a</WhiteKey>
        </KeysWrapper>
      </KeyboardWrapper>
      <ModuleFooter>
        <FrequencyOutputSelector moduleName="keyboard" onChange={handleChange} />
      </ModuleFooter>
    </Module>
  )
}

const KeyboardWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
const KeysWrapper = styled.div``

const BlackKey = styled.div`
  cursor: pointer;
  background-color: black;
  height: 1.25rem;
  width: 4.5rem;
  margin-top: calc(-1.25rem / 2);
  margin-bottom: calc(-1.25rem / 2);
  z-index: 3px;
  position: relative;
`

const WhiteKey = styled.div`
  cursor: pointer;
  background-color: white;
  height: 1.25rem;
  width: 6rem;
  border: 1px solid black;
  color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  &:not(:last-child) {
    border-bottom: none transparent 0;
  }
`

export default Keyboard
