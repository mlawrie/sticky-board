import objectAssign = require('object-assign')

export interface Action<T> {
  readonly type: string
  readonly payload: T
}

interface ActionCreator<T> {
  readonly type: string
  (payload: T): Action<T>
}

const actionCreator = <T>(type: string): ActionCreator<T> =>
  objectAssign((payload: T):any => ({type, payload}), {type})

export const isType = <T>(action: Action<any>, actionCreator: ActionCreator<T>): action is Action<T> =>
   action.type === actionCreator.type

export const createStickyAction = actionCreator<{x: number, y: number, body: string}>('CREATE_STICKY')
export const moveCanvasPositionAction = actionCreator<{x: number, y: number}>('UPDATE_CANVAS_POSITION')
export const updateStickyAction = actionCreator<{x: number, y: number, uuid: string}>('UPDATE_STICKY')
export const moveStickyToTopAction = actionCreator<{uuid: string}>('MOVE_STICKY_TO_TOP')