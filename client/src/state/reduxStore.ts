import { createStore, combineReducers, Unsubscribe } from 'redux'
import { Action } from 'state/actions'
import { stickiesReducers, StickiesState } from 'sticky/stickyReducers'
import { canvasReducers, CanvasState } from 'canvas/canvasReducers'
import { boardReducers, BoardState } from 'board/boardReducers'

const reducer = combineReducers({
  stickies: stickiesReducers,
  canvas: canvasReducers,
  board: boardReducers
})
export interface State extends StickiesState, CanvasState, BoardState {}

let store = createStore(reducer)

export const getState = () => store.getState() as State
export const dispatch = (a:Action<any>) => store.dispatch(a)
export const subscribeToState = (callback: () => void) => store.subscribe(callback)
export const resetReduxForTests = () => store = createStore(reducer) 
