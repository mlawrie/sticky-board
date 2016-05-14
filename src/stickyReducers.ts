import {isType, updateStickyAction, createStickyAction, moveStickyToTop, Action} from './actions'
import {Sticky, modifySticky} from './sticky'
import combine from './combine'
import uuid = require('node-uuid')
import Immutable = require('immutable')

type Stickies = Immutable.Map<string, Sticky>

const demoteZ = (sticky: Sticky) => modifySticky(sticky, {z: sticky.z - 1})
    
export interface StickiesState {
  readonly stickies: Stickies 
}

export const stickiesReducers = (state: Stickies = Immutable.Map<string, Sticky>(), action: Action<any>): Stickies => {
  
  if (isType(action, createStickyAction)) {
    const foregroundSticky = combine(action.payload, {z: state.size + 1}) 
    return state.set(uuid.v1(), foregroundSticky)
  }
   
  if (isType(action, updateStickyAction)) {
    const existingSticky = state.get(action.payload.uuid)
    const foregroundSticky = modifySticky(existingSticky, {x: action.payload.x, y: action.payload.y})
    return state.set(action.payload.uuid, foregroundSticky)
  }
  
  if (isType(action, moveStickyToTop)) {
    const existingSticky = state.get(action.payload.uuid)
    const foregroundSticky = modifySticky(existingSticky, {z: state.size + 1})
    return state.map(demoteZ).toMap().set(action.payload.uuid, foregroundSticky)
  }
  
  return state
}
