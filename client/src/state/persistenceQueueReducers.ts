import { isType, updateStickyAction, createStickyAction, removeStickyAction, persistenceQueueSuccessAction, Action } from 'state/actions'
import combine from 'utils/combine'
import Immutable = require('immutable')
import * as makeUuid from 'node-uuid'

type PersistenceQueue = Immutable.List<QueueItem>

export interface PersistenceQueueState {
  readonly persistenceQueue: PersistenceQueue 
}

export interface QueueItem {
  readonly action:Action<any>
  readonly queueUuid:string
}

const cloneAction = <T>(action: Action<T>): {} & Action<T> => 
  combine({}, {type: action.type, payload: combine({}, action.payload)})

const makeQueueItem = <T>(action: Action<T>) => ({queueUuid: makeUuid.v1(), action: cloneAction(action)})

export const persistenceQueueReducers = (state: PersistenceQueue = Immutable.List<QueueItem>(), action: Action<any>): PersistenceQueue => {
  if (isType(action, createStickyAction)) {
    return state.push(makeQueueItem(action))   
  }

  if(isType(action, persistenceQueueSuccessAction)) {
    const queueUuid = action.payload.queueUuid
    return state.filter((value) => typeof value !== 'undefined' && value.queueUuid != queueUuid).toList()
  }
  
  return state
}
