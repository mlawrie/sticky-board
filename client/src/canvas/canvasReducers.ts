import {Canvas} from 'canvas/canvas'
import {isType, moveCanvasPositionAction, Action} from 'state/actions'

export interface CanvasState {
  readonly canvas: Canvas 
}

export const canvasReducers = (state: Canvas = {x: 0, y: 0}, action: Action<any>): Canvas => {
  if (isType(action, moveCanvasPositionAction)) {
    return {x: state.x + action.payload.x, y: state.y + action.payload.y}
  }
  return state
}
