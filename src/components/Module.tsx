import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ModuleProps {
  title: string
}

const Module: React.FC<PropsWithChildren<ModuleProps>> = ({ children, title }) => {
  return (
    <ModuleWrapper>
      <ModuleTitle>{title}</ModuleTitle>
      {children}
    </ModuleWrapper>
  )
}

const ModuleTitle = styled.h3`
  line-height: 0.8rem;
  font-size: 0.8rem;
  margin: 0 -1rem;
  padding: 0.5rem 0.5rem 0.5rem;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  background: var(--border-color);
  color: var(--background-color);
`

const ModuleWrapper = styled.div`
  padding: 0 1rem 1rem;
  margin: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  height: var(--module-height);
`

export default Module
