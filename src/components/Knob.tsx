import React, { useCallback, useState, WheelEventHandler } from 'react'
import styled from 'styled-components'

interface KnobProps {
  label?: string
}

const Knob: React.FC<KnobProps> = ({ label }) => {
  const [position, setPosition] = useState(0)

  const handleMouseWheel = useCallback<WheelEventHandler<HTMLDivElement>>((e) => {
    setPosition((prev) => {
      if (e.deltaY < 0) {
        return Math.max(0, prev - 0.05)
      }
      return Math.min(1, prev + 0.05)
    })
  }, [])

  return (
    <KnobWrapper onWheel={handleMouseWheel}>
      <KnobMain position={position} />
      <KnobLabel>{label}</KnobLabel>
      <KnobInput />
    </KnobWrapper>
  )
}

const KnobWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
`

const KnobLabel = styled.div`
  text-align: center;
  margin: 0;
  margin-top: -0.5rem;
  font-size: 0.8rem;
  line-height: 1rem;
`

const KnobInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  cursor: pointer;
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
