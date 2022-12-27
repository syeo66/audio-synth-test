import React, { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import Button from './Button'

interface ContextData {
  audioCtx: AudioContext | null
}

const initialCaseData = { audioCtx: null } satisfies ContextData
export const CaseContext = createContext<ContextData>(initialCaseData)

const Case: React.FC<PropsWithChildren> = ({ children }) => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)

  const caseData = useMemo(() => ({ audioCtx }), [audioCtx])

  const handleStart = useCallback(() => setAudioCtx(new AudioContext()), [])

  return (
    <CaseContext.Provider value={caseData}>
      <CaseWrapper>
        {!audioCtx && <Button onClick={handleStart}>Start Rack</Button>}
        {!!audioCtx && children}
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
