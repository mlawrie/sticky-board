import { Action, persistenceQueueSuccessAction } from 'state/actions'
import { State, getState, dispatch } from 'state/reduxStore'
import * as Immutable from 'immutable'
import { Timer } from 'utils/timer'
import { mockable } from 'utils/injector'
import { QueueItem } from 'state/persistenceQueueReducers'
import { sendActionToServer } from 'api/sendActionToServer'

export const persistenceMiddleware = (store:any) => (next:any) => (action:Action<any>) => {
  const result = next(action)
  mockable(() => new Timer()).setTimeout(persist, 0) 
  return result
}

const persist = () => {
  const queue = getState().persistenceQueue
  if (queue.count() == 0) {
    return
  }

  const item = queue.first()
  
  mockable(() => sendActionToServer)(item.action)
  .then(() => {
    dispatch(persistenceQueueSuccessAction({queueUuid: item.queueUuid}))
    persist()
  })
  .catch(() => {})
}