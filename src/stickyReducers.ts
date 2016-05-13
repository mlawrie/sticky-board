import {isType, updateStickyAction, createStickyAction, Action} from './actions'
import {Sticky, modifySticky} from './sticky'
import combine from './combine'
import uuid = require('node-uuid')
import Immutable = require('immutable')

type Stickies = Immutable.Map<string, Sticky>

let lastZ = 0
const nextZ = () => { lastZ += 1; return lastZ}    

export interface StickiesState {
  readonly stickies: Stickies 
}

export const stickiesReducers = (state: Stickies = Immutable.Map<string, Sticky>(), action: Action<any>): Stickies => {
  
  if (isType(action, createStickyAction)) {
    const foregroundSticky = combine(action.payload, {z: nextZ()})  
    return state.set(uuid.v1(), foregroundSticky)
  }
   
  if (isType(action, updateStickyAction)) {
    const existingSticky = state.get(action.payload.uuid)
    const foregroundSticky = modifySticky(existingSticky, {x: action.payload.x, y: action.payload.y, z: nextZ()})
    return state.toMap().set(action.payload.uuid, foregroundSticky)
  }
   
  return state
}
