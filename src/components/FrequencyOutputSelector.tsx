import React, { ChangeEventHandler, useCallback, useContext, useMemo } from 'react'

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
    <label>
      <select onChange={handleChange}>
        <option></option>
        {Object.entries(inputsList).map(([moduleName]) => (
          <option key={moduleName}>{moduleName}</option>
        ))}
      </select>
      {' ->'}
    </label>
  )
}

export default FrequencyOutputSelector
