import React from 'react'
import styled from 'styled-components'

import FrequencyOutputSelector from '../components/FrequencyOutputSelector'
import Module from '../components/Module'
import ModuleFooter from '../components/ModuleFooter'

const Keyboard: React.FC = () => {
  return (
    <Module title="Keyboard">
      (does nothing yet)
      <KeyboardWrapper>
        <KeysWrapper>
          <WhiteKey>e</WhiteKey>
          <BlackKey />
          <WhiteKey>d</WhiteKey>
          <BlackKey />
          <WhiteKey>c</WhiteKey>
          <WhiteKey>b</WhiteKey>
          <BlackKey />
          <WhiteKey>a</WhiteKey>
          <BlackKey />
          <WhiteKey>g</WhiteKey>
          <BlackKey />
          <WhiteKey>f</WhiteKey>
          <WhiteKey>e</WhiteKey>
          <BlackKey />
          <WhiteKey>d</WhiteKey>
          <BlackKey />
          <WhiteKey>c</WhiteKey>
          <WhiteKey>b</WhiteKey>
          <BlackKey />
          <WhiteKey>a</WhiteKey>
        </KeysWrapper>
      </KeyboardWrapper>
      <ModuleFooter>
        <FrequencyOutputSelector moduleName="keyboard" />
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
