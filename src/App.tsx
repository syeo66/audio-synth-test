import React from 'react'

import Case from './components/Case'
import Gain from './modules/Gain'
import SingleOscillator from './modules/SingleOscillator'

const App: React.FC = () => {
  return (
    <Case>
      <SingleOscillator />
      <Gain />
    </Case>
  )
}

export default App
