import React from 'react'

import Case from './components/Case'
import Github from './components/Github'
import Filter12db from './modules/Filter12db'
import Gain from './modules/Gain'
import Keyboard from './modules/Keyboard'
import LFO from './modules/LFO'
import SingleOscillator from './modules/SingleOscillator'

const App: React.FC = () => {
  // TODO add module visibility selector
  return (
    <>
      <Github />
      <Case>
        <Keyboard />
        <LFO />
        <SingleOscillator />
        <Filter12db />
        <Gain />
      </Case>
    </>
  )
}

export default App
