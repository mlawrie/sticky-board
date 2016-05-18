import { createStore, combineReducers, Unsubscribe } from 'redux'
import { Action } from 'state/actions'
import { stickiesReducers, StickiesState } from 'sticky/stickyReducers'
import { canvasReducers, CanvasState } from 'canvas/canvasReducers'

const reducer = combineReducers({
  stickies: stickiesReducers,
  canvas: canvasReducers
})
export interface State extends StickiesState, CanvasState {}

const store = createStore(reducer)

export const getState = () => store.getState() as State
export const dispatch = (a:Action<any>) => store.dispatch(a)
export const subscribeToState = (callback: () => void) => store.subscribe(callback)
