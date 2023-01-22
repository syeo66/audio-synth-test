import React, { ChangeEventHandler, useCallback, useContext, useMemo } from 'react'
import styled from 'styled-components'

import ArrowRight from '../icons/ArrowRight'
import { CaseContext, FrequencyInput } from './Case'

interface FrequencyOutputSelectorProps {
  moduleName: string
  onChange?: (input: FrequencyInput) => void
}

const FrequencyOutputSelector: React.FC<FrequencyOutputSelectorProps> = ({ moduleName: inputModuleName, onChange }) => {
  const { inputs } = useContext(CaseContext)

  const inputsList = useMemo(() => {
    return Object.entries(inputs).reduce<Record<string, FrequencyInput>>((acc, [moduleName, moduleIns]) => {
      if (inputModuleName === moduleName) {
        return acc
      }

      const moduleEntries = Object.entries(moduleIns.frequencyInputs || {}).reduce<Record<string, FrequencyInput>>(
        (innerAcc, [inputName, inputNode]) => {
          const name = `${moduleName} > ${inputName}`
          return { ...innerAcc, [name]: inputNode }
        },
        {}
      )

      return { ...acc, ...moduleEntries }
    }, {})
  }, [inputModuleName, inputs])

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => onChange?.(inputsList[e.target.value]),
    [onChange, inputsList]
  )

  return (
    <Label>
      <select onChange={handleChange}>
        <option></option>
        {Object.entries(inputsList).map(([moduleName]) => (
          <option key={moduleName}>{moduleName}</option>
        ))}
      </select>
      <ArrowRight />
    </Label>
  )
}

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  & > select {
    margin-right: 0.25em;
  }
`

export default FrequencyOutputSelector
