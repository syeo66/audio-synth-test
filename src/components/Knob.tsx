import React, { TouchEventHandler, useCallback, useEffect, useRef, useState, WheelEventHandler } from 'react'
import styled from 'styled-components'

interface KnobProps {
  label?: string
  max: number
  min: number
  onChange?: (value: number) => void
  step: number
  value: number
}

const VALUE_TIMEOUT = 3000
const DRAGGING_DENOMINATOR = 200

interface Coords {
  x: number
  y: number
}

// TODO Directly change values using double click
const Knob: React.FC<KnobProps> = ({ label, onChange, value: inputValue, step, min, max }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const touchCoords = useRef<Coords | null>(null)

  const [displayValue, setDisplayValue] = useState<number | null>(null)
  const [value, setValue] = useState(inputValue)

  const handleChange = useCallback(
    (v: number) => {
      onChange?.(v)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      setDisplayValue(Math.round(v * 100) / 100)

      timeoutRef.current = setTimeout(() => setDisplayValue(null), VALUE_TIMEOUT)
    },
    [onChange]
  )

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      setValue((prev) => Math.max(min, Math.min(max, prev + -e.movementY * ((max - min) / DRAGGING_DENOMINATOR))))
    },
    [max, min]
  )

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [handleDrag])

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleMouseUp)
  }, [handleDrag, handleMouseUp])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!touchCoords.current) {
        return
      }
      const delta = touchCoords.current.y - e.touches[0].screenY
      touchCoords.current = { x: e.touches[0].screenX, y: e.touches[0].screenY }
      setValue((prev) => Math.max(min, Math.min(max, prev + delta * ((max - min) / DRAGGING_DENOMINATOR))))
    },
    [max, min]
  )

  const handleTouchEnd = useCallback(() => {
    touchCoords.current = null
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }, [handleTouchMove])

  const handleTouchStart = useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      touchCoords.current = { x: e.touches[0].screenX, y: e.touches[0].screenY }
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)
    },
    [handleTouchEnd, handleTouchMove]
  )

  const handleMouseWheel = useCallback<WheelEventHandler<HTMLDivElement>>(
    (e) => setValue(e.deltaY < 0 ? Math.max(min, value - step) : Math.min(max, value + step)),
    [max, min, step, value]
  )

  useEffect(() => {
    // clear timeout on unmount
    const timeout = timeoutRef.current

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  useEffect(() => {
    handleChange(value)
  }, [handleChange, value])

  const position = (value - min) / (max - min)

  return (
    <KnobWrapper onWheel={handleMouseWheel} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
      {displayValue !== null && <KnobValue>{displayValue}</KnobValue>}
      <KnobMain position={position} />
      <KnobLabel>{label}</KnobLabel>
    </KnobWrapper>
  )
}

const KnobWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.8rem;
  position: relative;
  touch-action: none;
`

const KnobValue = styled.div`
  position: absolute;
  left: 2.2rem;
  min-width: 2rem;
  top: 1.5rem;
  background: var(--background-color);
  text-align: center;
  margin: 0;
  padding: 0.1rem;
  border: 1px solid var(--border-color);
  font-size: 0.7rem;
  line-height: 0.7rem;
`

const KnobLabel = styled.div`
  text-align: center;
  margin: 0;
  margin-top: -0.5rem;
  font-size: 0.8rem;
  line-height: 1rem;
`

interface KnobMainProps {
  position: number
}
const KnobMain: React.FC<KnobMainProps> = ({ position }) => {
  const angle = Math.min(Math.max(0, position * 270), 270)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 1024 1024"
    >
      <g>
        <path
          fill="none"
          d="M202.085 686.883C135.815 633.107 94.786 558.75 94.786 476.659c0-163.901 163.552-296.967 365.003-296.967 201.45 0 365.002 133.066 365.002 296.967 0 81.743-40.682 155.817-106.457 209.539"
          style={{
            fill: '#ebebeb',
            fillOpacity: 0,
            stroke: 'currentColor',
            strokeWidth: '13.2px',
          }}
          transform="matrix(1.35193 0 0 1.66166 -109.602 -280.045)"
        />
        <path
          d="m960 960-97.415-97.415"
          style={{
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 20,
          }}
        />
        <path
          d="M164.09 859.91 64 960"
          style={{
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 20,
          }}
          transform="matrix(.98664 .01336 .01336 .98664 -11.974 11.974)"
        />
      </g>
      <g style={{ cursor: 'pointer', rotate: `${angle}deg`, transformOrigin: '50%', transition: 'rotate 100ms' }}>
        <ellipse
          cx={459.789}
          cy={476.659}
          fill="none"
          rx={365.003}
          ry={296.967}
          style={{
            fill: '#ebebeb',
            fillOpacity: 0,
            stroke: 'currentColor',
            strokeWidth: '15.88px',
          }}
          transform="matrix(1.12427 0 0 1.38185 -4.929 -146.67)"
        />
        <path
          d="M512 512 223.86 800.14"
          style={{
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 20,
          }}
        />
      </g>
    </svg>
  )
}

export default Knob
