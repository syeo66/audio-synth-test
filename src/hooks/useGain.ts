import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { CaseContext } from '../components/Case'

interface UseGainInput {
  moduleName: string
  inputName?: string
}

const useGain = ({ moduleName, inputName = 'main' }: UseGainInput) => {
  const gainNode = useRef<GainNode>()

  const [currentGain, setCurrentGain] = useState(0.5)

  const { audioCtx, registerModule } = useContext(CaseContext)

  useEffect(() => {
    // initialize the gain module
    if (!audioCtx) {
      return
    }

    gainNode.current = audioCtx.createGain()
    gainNode.current.gain.setValueAtTime(0, audioCtx.currentTime)

    registerModule({ moduleName, inputs: { nodeInputs: { [inputName]: gainNode.current } } })
  }, [audioCtx, inputName, moduleName, registerModule])

  useEffect(() => {
    // set the current gain
    if (!audioCtx || !gainNode.current) {
      return
    }

    gainNode.current.gain.setValueAtTime(currentGain, audioCtx.currentTime)
  }, [audioCtx, currentGain])

  const handleGainChange = useCallback((v: number) => setCurrentGain(v), [])

  return { handleGainChange, currentGain, gainNode }
}

export default useGain
