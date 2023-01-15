export type FrequencyInput = (freq: number) => void

export interface ModuleInputs {
  nodeInputs?: Record<string, AudioNode>
  frequencyInputs?: Record<string, FrequencyInput>
}
export type InputsState = Record<string, ModuleInputs>

interface AddInputsAction {
  type: 'addInputs'
  payload: {
    moduleName: string
    inputs: ModuleInputs
  }
}

type Action = AddInputsAction

const inputsReducer = (state: InputsState, action: Action) => {
  switch (action.type) {
    case 'addInputs':
      return { ...state, [action.payload.moduleName]: action.payload.inputs }

    default:
      return state
  }
}

export default inputsReducer
