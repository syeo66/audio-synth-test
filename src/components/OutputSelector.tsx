import React, { ChangeEventHandler, memo, useCallback, useContext, useMemo } from 'react'

import { CaseContext } from './Case'

interface OutputSelectorProps {
  audioNode: AudioNode | undefined
  moduleName: string
}

const OutputSelector: React.FC<OutputSelectorProps> = ({ audioNode, moduleName: inputModuleName }) => {
  const { inputs } = useContext(CaseContext)

  const inputsList = useMemo(() => {
    return Object.entries(inputs).reduce<Record<string, AudioNode>>((acc, [moduleName, moduleIns]) => {
      if (inputModuleName === moduleName) {
        return acc
      }

      const moduleEntries = Object.entries(moduleIns.nodeInputs || {}).reduce<Record<string, AudioNode>>(
        (innerAcc, [inputName, inputNode]) => {
          const name = `${moduleName} > ${inputName}`
          return { ...innerAcc, [name]: inputNode }
        },
        {}
      )

      return { ...acc, ...moduleEntries }
    }, {})
  }, [inputModuleName, inputs])

  const handleSelectOutput = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      const id = e.target.value
      const node = inputsList[id]

      audioNode?.disconnect()
      audioNode?.connect(node)
    },
    [audioNode, inputsList]
  )

  return (
    <label>
      <select onChange={handleSelectOutput}>
        <option></option>
        {Object.entries(inputsList).map(([moduleName]) => (
          <option key={moduleName}>{moduleName}</option>
        ))}
      </select>
      {' ->'}
    </label>
  )
}

export default memo(OutputSelector)
