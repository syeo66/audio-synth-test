import Knob from '../components/Knob'
import Module from '../components/Module'
import OutputSelector from '../components/OutputSelector'
import useGain from '../hooks/useGain'

const Gain = () => {
  const { currentGain, handleGainChange, gainNode } = useGain({ moduleName: 'gain' })

  return (
    <Module title="Gain">
      <div>
        <Knob label="Gain" min={0} max={1} step={0.05} value={currentGain} onChange={handleGainChange} />
      </div>
      <div>
        <OutputSelector audioNode={gainNode.current} moduleName="gain" />
      </div>
    </Module>
  )
}

export default Gain
