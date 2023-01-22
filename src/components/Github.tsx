import React from 'react'
import styled from 'styled-components'

const Github: React.FC = () => {
  return (
    <GithubLink href="https://github.com/syeo66/audio-synth-test">
      <img
        decoding="async"
        loading="lazy"
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_left_darkblue_121621.png?resize=149%2C149"
        className="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </GithubLink>
  )
}

const GithubLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
`

export default Github
