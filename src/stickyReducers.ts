import {isType, updateStickyAction, createStickyAction, moveStickyToTopAction, Action} from 'state/actions'
import {Sticky, modifySticky} from './sticky'
import combine from './combine'
import makeUuid = require('node-uuid')
import Immutable = require('immutable')
import lodash = require('lodash')

type Stickies = Immutable.Map<string, Sticky>

export interface StickiesState {
  readonly stickies: Stickies 
}

export const stickiesReducers = (state: Stickies = Immutable.Map<string, Sticky>(), action: Action<any>): Stickies => {
  const getUuuid = (sticky:Sticky) => state.keyOf(sticky)
  
  if (isType(action, createStickyAction)) {
    const foregroundSticky = combine(action.payload, {z: state.size + 1})
    return state.set(makeUuid.v1(), foregroundSticky)
  }
   
  if (isType(action, updateStickyAction)) {
    const existingSticky = state.get(action.payload.uuid)
    const foregroundSticky = modifySticky(existingSticky, {x: action.payload.x, y: action.payload.y})
    return state.set(action.payload.uuid, foregroundSticky)
  }
  
  if (isType(action, moveStickyToTopAction)) {
    const existingSticky = state.get(action.payload.uuid)
    const foregroundSticky = modifySticky(existingSticky, {z: state.size})
   
    const otherUuids = state.keySeq().toArray().filter((uuid) => uuid !== action.payload.uuid)
    const sorted = otherUuids.map((uuid) => ({uuid, sticky: state.get(uuid)}))
        .sort((a, b) => a.sticky.z - b.sticky.z)
   
    
    const assignZ = (sticky:Sticky) => modifySticky(sticky, {z: 1 + lodash.findIndex(sorted, (el) => el.uuid === getUuuid(sticky))})
    
    return state.map(assignZ).toMap().set(action.payload.uuid, foregroundSticky)
  }
  
  return state
}
