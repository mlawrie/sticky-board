import * as Promise from 'bluebird'
import { Action, isType, createStickyAction } from 'state/actions'
import { jsonRequest } from 'api/jsonRequest'
import { mockable } from 'utils/injector'
import { getState } from 'state/reduxStore'
import combine from 'utils/combine'

export const sendActionToServer = (action: Action<any>):Promise<any> => {
  const pathname = mockable(() => location.pathname)
  const requester = mockable(() => jsonRequest)
  const url_token = pathname.split('/')[3]
  
  if (isType(action, createStickyAction)) {
    const uuid = getState().stickies.keySeq().first()
    return requester({uri: '/api/stickies', method: 'POST', body: combine(action.payload, {uuid, url_token})})
  }

  console.error('Warning: Unhandled persistence action: ', action.type)
  return Promise.resolve()
}