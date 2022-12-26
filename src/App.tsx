import './App.css'

import React, { ChangeEventHandler, useCallback, useRef } from 'react'

const useSynth = () => {
  const audioCtx = useRef<AudioContext>()
  const oscillator = useRef<OscillatorNode>()
  const filter = useRef<BiquadFilterNode>()
  const gain = useRef<GainNode>()

  return {
    start: () => {
      if (!audioCtx.current) {
        audioCtx.current = new AudioContext()
      }

      if (!gain.current) {
        gain.current = audioCtx.current.createGain()
        gain.current.connect(audioCtx.current.destination)
        gain.current.gain.setValueAtTime(0.8, audioCtx.current.currentTime)
      }

      if (!filter.current) {
        filter.current = audioCtx.current.createBiquadFilter()
        filter.current.connect(gain.current)
      }

      filter.current.type = 'lowpass'
      filter.current.frequency.setValueAtTime(1000, audioCtx.current.currentTime)
      filter.current.Q.setValueAtTime(2, audioCtx.current.currentTime)

      if (!oscillator.current) {
        oscillator.current = audioCtx.current.createOscillator()
        oscillator.current.connect(filter.current)
        oscillator.current.start()
      }

      oscillator.current.type = 'sine'
      oscillator.current.frequency.setValueAtTime(220, audioCtx.current.currentTime) // value in hertz
    },

    setOscillatorType: (newType: OscillatorType) => {
      if (!oscillator.current) {
        return
      }

      oscillator.current.type = newType
    },

    setOscillatorFrequency: (freq: number) => {
      if (!audioCtx.current) {
        return
      }

      oscillator.current?.frequency.setValueAtTime(freq, audioCtx.current.currentTime)
    },

    setFilterFrequency: (freq: number) => {
      if (!audioCtx.current) {
        return
      }

      filter.current?.frequency.setValueAtTime(freq, audioCtx.current.currentTime)
    },
  }
}

const App: React.FC = () => {
  const { start, setOscillatorType, setOscillatorFrequency, setFilterFrequency } = useSynth()

  const handleStart = useCallback(() => start(), [])

  const handleSetSine = useCallback(() => setOscillatorType('sine'), [])
  const handleSetSaw = useCallback(() => setOscillatorType('sawtooth'), [])
  const handleSetSquare = useCallback(() => setOscillatorType('square'), [])

  const handleOscillatorFrequency = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setOscillatorFrequency(+e.target.value),
    [setOscillatorFrequency]
  )

  const handleFilterFrequency = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setFilterFrequency(+e.target.value),
    [setFilterFrequency]
  )

  return (
    <div className="App">
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleSetSine}>Sine</button>
        <button onClick={handleSetSquare}>Square</button>
        <button onClick={handleSetSaw}>Saw</button>
      </div>

      <div>
        OSC Frequency:
        <input type="range" onChange={handleOscillatorFrequency} min="40" max="1000" />
      </div>

      <div>
        Filter Frequency:
        <input type="range" onChange={handleFilterFrequency} min="40" max="5000" />
      </div>
    </div>
  )
}

export default App
