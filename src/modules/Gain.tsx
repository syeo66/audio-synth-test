import Knob from '../components/Knob'
import Module from '../components/Module'
import ModuleFooter from '../components/ModuleFooter'
import ModuleSection from '../components/ModuleSection'
import NodeOutputSelector from '../components/NodeOutputSelector'
import useGain from '../hooks/useGain'

const Gain = () => {
  const { currentGain, handleGainChange, gainNode } = useGain({ moduleName: 'gain' })

  return (
    <Module title="Gain">
      <ModuleSection>
        <Knob label="Gain" min={0} max={1} step={0.05} value={currentGain} onChange={handleGainChange} />
      </ModuleSection>

      <ModuleFooter>
        <NodeOutputSelector audioNode={gainNode.current} moduleName="gain" />
      </ModuleFooter>
    </Module>
  )
}

export default Gain
