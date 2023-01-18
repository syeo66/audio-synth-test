import React, { useContext, useMemo } from 'react'

import { CaseContext, FrequencyInput } from './Case'

interface FrequencyOutputSelectorProps {
  moduleName: string
}

const FrequencyOutputSelector: React.FC<FrequencyOutputSelectorProps> = ({ moduleName: inputModuleName }) => {
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

  return (
    <label>
      <select>
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
