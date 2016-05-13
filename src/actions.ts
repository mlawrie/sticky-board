export interface Action<T> {
  readonly type: string
  readonly payload: T
}

interface ActionCreator<T> {
  readonly type: string
  (payload: T): Action<T>
}

const actionCreator = <T>(type: string): ActionCreator<T> =>
  Object.assign((payload: T):any => ({type, payload}), {type})

export const isType = <T>(action: Action<any>, actionCreator: ActionCreator<T>): action is Action<T> =>
   action.type === actionCreator.type


import {Sticky} from './sticky'

export const createStickyAction = actionCreator<{x: number, y: number}>('CREATE_STICKY')
export const updateStickyAction = actionCreator<{x: number, y: number, uuid: string}>('UPDATE_STICKY')