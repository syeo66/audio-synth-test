import React from 'react'

import Case from './components/Case'
import Filter12db from './modules/Filter12db'
import Gain from './modules/Gain'
import Keyboard from './modules/Keyboard'
import SingleOscillator from './modules/SingleOscillator'

const App: React.FC = () => {
  // TODO add module visibility selector
  return (
    <Case>
      <Keyboard />
      <SingleOscillator />
      <Filter12db />
      <Gain />
    </Case>
  )
}

export default App
