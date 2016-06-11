import * as Promise from 'bluebird'
import { Action, createStickyAction } from 'state/actions'

export const sendActionToServer = (action: Action<any>) => {
  console.error('Warning: Unhandled persistence action: ', action.type)
  return Promise.resolve()
}