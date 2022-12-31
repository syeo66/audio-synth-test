import React from 'react'

interface SineProps {
  className?: string
}

const Sine: React.FC<SineProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      className={className}
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 1024 1024"
    >
      <path
        d="M64 512c35.314-74.667 105.942-224 224-224s329.942 448 448 448c118.058 0 188.686-149.333 224-224"
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 60,
        }}
      />
    </svg>
  )
}

export default Sine
