import { createStore, combineReducers, Unsubscribe, applyMiddleware } from 'redux'
import { Action } from 'state/actions'
import { persistenceMiddleware } from 'state/persistenceMiddleware'
import { stickiesReducers, StickiesState } from 'sticky/stickyReducers'
import { canvasReducers, CanvasState } from 'canvas/canvasReducers'
import { boardReducers, BoardState } from 'board/boardReducers'
import { persistenceQueueReducers, PersistenceQueueState } from 'state/persistenceQueueReducers'

const reducer = combineReducers({
  stickies: stickiesReducers,
  canvas: canvasReducers,
  board: boardReducers,
  persistenceQueue: persistenceQueueReducers
})

export interface State extends StickiesState, CanvasState, BoardState, PersistenceQueueState {}

const buildStore = () => createStore(reducer, applyMiddleware(persistenceMiddleware)) 

let store = buildStore()

export const getState = () => store.getState() as State
export const dispatch = (a:Action<any>) => store.dispatch(a)
export const subscribeToState = (callback: () => void) => store.subscribe(callback)
export const resetReduxForTests = () => store = buildStore() 
