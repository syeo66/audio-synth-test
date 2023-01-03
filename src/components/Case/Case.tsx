import React, { createContext, PropsWithChildren, useCallback, useMemo, useReducer, useState } from 'react'
import styled from 'styled-components'

import Button from '../Button'
import inputsReducer, { InputsState, ModuleInputs } from '../reducers/inputsReducer'
import Output from './Output'

interface RegisterModuleData {
  moduleName: string
  inputs: ModuleInputs
}
interface ContextData {
  audioCtx: AudioContext | null
  inputs: InputsState
  registerModule: (input: RegisterModuleData) => void
}

const initialCaseData = { audioCtx: null, inputs: {}, registerModule: () => void 0 } satisfies ContextData
export const CaseContext = createContext<ContextData>(initialCaseData)

const Case: React.FC<PropsWithChildren> = ({ children }) => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)

  const [inputs, dispatchInputs] = useReducer(inputsReducer, {})

  const registerModule = useCallback(({ moduleName, inputs: ins }: RegisterModuleData) => {
    dispatchInputs({ type: 'addInputs', payload: { moduleName, inputs: ins } })
  }, [])

  const caseData = useMemo(() => ({ audioCtx, inputs, registerModule }), [audioCtx, inputs, registerModule])

  const handleStart = useCallback(() => {
    const ctx = new AudioContext()
    setAudioCtx(ctx)
    registerModule({ moduleName: 'case', inputs: { output: ctx.destination } })
  }, [registerModule])

  return (
    <CaseContext.Provider value={caseData}>
      <CaseWrapper>
        {!audioCtx && <Button onClick={handleStart}>Start Rack</Button>}
        {!!audioCtx && (
          <>
            <Output />
            {children}
          </>
        )}
      </CaseWrapper>
    </CaseContext.Provider>
  )
}

const CaseWrapper = styled.div`
  min-width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`

export default Case
