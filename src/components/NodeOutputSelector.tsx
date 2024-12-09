import React, { ChangeEventHandler, memo, useCallback, useContext, useMemo } from 'react'
import styled from 'styled-components'

import ArrowRight from '../icons/ArrowRight'
import { CaseContext } from './Case'
import { ModuleInputs } from './reducers/inputsReducer'

type Type = 'audio' | 'frequency'

const typeMapper: Record<Type, keyof ModuleInputs> = {
  audio: 'nodeInputs',
  frequency: 'frequencyInputs',
}

interface OutputSelectorProps {
  audioNode: AudioNode | undefined | null
  moduleName: string
  type?: Type
}

const NodeOutputSelector: React.FC<OutputSelectorProps> = ({
  audioNode,
  moduleName: inputModuleName,
  type = 'audio',
}) => {
  const { audioCtx, inputs } = useContext(CaseContext)

  const inputsList = useMemo(() => {
    return Object.entries(inputs).reduce<Record<string, AudioNode>>((acc, [moduleName, moduleIns]) => {
      if (inputModuleName === moduleName) {
        return acc
      }

      const moduleType = typeMapper[type]

      const moduleEntries = Object.entries(moduleIns[moduleType] || {}).reduce<Record<string, AudioNode>>(
        (innerAcc, [inputName, inputNode]) => {
          const name = `${moduleName} > ${inputName}`
          return { ...innerAcc, [name]: inputNode }
        },
        {}
      )

      return { ...acc, ...moduleEntries }
    }, {})
  }, [inputModuleName, inputs, type])

  const handleSelectOutput = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      const id = e.target.value
      const node = inputsList[id]

      audioNode?.disconnect()

      if (type === 'frequency' && 'frequency' in node && node.frequency instanceof AudioParam && audioCtx) {
        node.frequency.setValueAtTime(0, audioCtx?.currentTime)
        audioNode?.connect(node.frequency)
        return
      }

      audioNode?.connect(node)
    },
    [audioCtx, audioNode, inputsList, type]
  )

  return (
    <Label>
      <select onChange={handleSelectOutput}>
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

export default memo(NodeOutputSelector)
