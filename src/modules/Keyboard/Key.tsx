import React, { memo } from 'react'
import styled from 'styled-components'

import type { Note } from './Keyboard'

interface KeyProps {
  onPlay?: (freq: number) => void
  note: Note
}

const Key: React.FC<KeyProps> = ({ note: { note, freq, color }, onPlay }) => {
  if (color === 'black') {
    return <BlackKey onMouseDown={() => onPlay?.(freq)} />
  }

  return <WhiteKey onMouseDown={() => onPlay?.(freq)}>{note}</WhiteKey>
}

const BlackKey = styled.div`
  cursor: pointer;
  background-color: black;
  height: 1.25rem;
  width: 4.5rem;
  margin-top: calc(-1.25rem / 2);
  margin-bottom: calc(-1.25rem / 2);
  z-index: 3px;
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
`

const WhiteKey = styled.div`
  cursor: pointer;
  background-color: white;
  height: 1.25rem;
  width: 6rem;
  border: 1px solid black;
  color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  flex-shrink: 0;
  flex-grow: 0;
  border-bottom: none transparent 0;
`

export default memo(Key)
