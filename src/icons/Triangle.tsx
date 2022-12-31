import React from 'react'

interface TriangleProps {
  className?: string
}

const Triangle: React.FC<TriangleProps> = ({ className }) => (
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
      d="m64 736 224-448 224 448 224-448 224 448"
      style={{
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 60,
      }}
    />
  </svg>
)

export default Triangle
