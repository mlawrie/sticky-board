import { createStore, combineReducers, Unsubscribe } from 'redux'
import { Action } from './actions'
import { stickiesReducers, StickiesState } from './stickyReducers'

const reducer = combineReducers({
  stickies: stickiesReducers
});

export interface State extends StickiesState {}

const store = createStore(reducer)

export const getState = () => store.getState() as State
export const dispatch = (a:Action<any>) => store.dispatch(a)
export const subscribeToState = (callback: () => void) => store.subscribe(callback)
