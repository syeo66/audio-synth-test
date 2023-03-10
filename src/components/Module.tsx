import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ModuleProps {
  title: string
}

const Module: React.FC<PropsWithChildren<ModuleProps>> = ({ children, title }) => {
  return (
    <ModuleWrapper>
      <ModuleTitle>{title}</ModuleTitle>
      <ModuleContent>{children}</ModuleContent>
    </ModuleWrapper>
  )
}

const ModuleTitle = styled.h3`
  line-height: 0.8rem;
  font-size: 0.8rem;
  margin: 0 -1rem 1rem;
  padding: 0.5rem 0.5rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  background: var(--border-color);
  color: var(--background-color);
`

const ModuleContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

const ModuleWrapper = styled.div`
  padding: 0 1rem 1rem;
  margin: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  position: relative;
  display: grid;
  grid-template-rows: 2.75rem 1fr;
  height: var(--module-height);
`

export default Module
