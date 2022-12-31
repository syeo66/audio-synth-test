import React from 'react'

interface SquareProps {
  className?: string
}

const Square: React.FC<SquareProps> = ({ className }) => (
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
    className={className}
  >
    <path
      d="M64 736V288h448v448h448V288"
      style={{
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 60,
      }}
    />
  </svg>
)

export default Square
