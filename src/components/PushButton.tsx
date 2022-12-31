import styled from 'styled-components'

interface PushButtonProps {
  active?: boolean
}

const PushButton = styled.button<PushButtonProps>`
  color: var(--background-color);
  background-color: var(${({ active }) => (active ? '--active' : '--inactive')});
  border-color: var(--border-color);
  color: var(--font-color);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  transitions: background-color 250ms;
  padding: 0;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0.3rem;

  &:not(:first-child) {
    margin-left: 0.25rem;
  }
  &:not(:last-child) {
    margin-right: 0.25rem;
  }
`

export default PushButton
