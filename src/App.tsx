import React from 'react'

import Case from './components/Case'
import Filter12db from './modules/Filter12db'
import Gain from './modules/Gain'
import SingleOscillator from './modules/SingleOscillator'

const App: React.FC = () => {
  return (
    <Case>
      <SingleOscillator />
      <SingleOscillator />
      <Filter12db />
      <Gain />
    </Case>
  )
}

export default App
