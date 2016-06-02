import {isType, updateStickyAction, createStickyAction, moveStickyToTopAction, removeStickyAction, Action} from 'state/actions'
import {Sticky, modifySticky} from 'sticky/sticky'
import combine from 'utils/combine'
import makeUuid = require('node-uuid')
import Immutable = require('immutable')
import lodash = require('lodash')

type Stickies = Immutable.Map<string, Sticky>

export interface StickiesState {
  readonly stickies: Stickies 
}

const markNotEdited = (sticky:Sticky) => modifySticky(sticky, {editing: false})

export const stickiesReducers = (state: Stickies = Immutable.Map<string, Sticky>(), action: Action<any>): Stickies => {
  const getUuuid = (sticky:Sticky) => state.keyOf(sticky)
  
  if (isType(action, createStickyAction)) {
    const sticky = combine(action.payload, {z: state.size + 1, editing: false})
    return state.set(makeUuid.v1(), sticky)
  }
   
  if (isType(action, updateStickyAction)) {
    const sticky = modifySticky(state.get(action.payload.uuid), {
      x: action.payload.x,
      y: action.payload.y,
      editing: action.payload.editing,
      body: action.payload.body
    })
    return state.map(markNotEdited).toMap().set(action.payload.uuid, sticky)
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
  
  if (isType(action, removeStickyAction)) {
    return state.filter((value, key) => key != action.payload.uuid).toMap()
  }
  
  return state
}
