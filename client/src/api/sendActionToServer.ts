import * as Promise from 'bluebird'
import { Action, isType, createStickyAction, interactionFinishedStickyAction } from 'state/actions'
import { jsonRequest } from 'api/jsonRequest'
import { mockable } from 'utils/injector'
import { getState } from 'state/reduxStore'
import combine from 'utils/combine'

export const sendActionToServer = (action: Action<any>):Promise<any> => {
  const pathname = mockable(() => location.pathname)
  const requester = mockable(() => jsonRequest)
  const url_token = pathname.split('/')[3]

  if (isType(action, createStickyAction)) {
    return requester({uri: '/api/stickies', method: 'POST', body: combine(action.payload, {url_token})})
  }

  if (isType(action, interactionFinishedStickyAction)) {
    const sticky = getState().stickies.get(action.payload.uuid)
    const command = {
      x: sticky.x,
      y: sticky.y,
      uuid: action.payload.uuid,
      url_token,
      body: sticky.body
    }
    
    return requester({uri: '/api/stickies', method: 'PUT', body: command})
  }

  console.error('Warning: Unhandled persistence action: ', action.type)
  return Promise.resolve()
}