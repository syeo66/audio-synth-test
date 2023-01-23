import styled from 'styled-components'

interface PushButtonProps {
  active?: boolean
  small?: boolean
}

const PushButton = styled.button<PushButtonProps>`
  color: var(--background-color);
  background-color: var(${({ active }) => (active ? '--active' : '--inactive')});
  border-color: var(--border-color);
  color: var(--font-color);
  border-radius: 50%;
  width: ${({ small }) => (small ? 1.5 : 2)}rem;
  height: ${({ small }) => (small ? 1.5 : 2)}rem;
  font-size: ${({ small }) => (small ? 75 : 100)}%;
  transitions: background-color 250ms;
  padding: 0;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0.3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.25rem;
  }
  &:not(:last-child) {
    margin-right: 0.25rem;
  }
`

export default PushButton
