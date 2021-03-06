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

export const createStickyAction = actionCreator<{x: number, y: number, body: string, uuid:string}>('CREATE_STICKY')
export const loadStickyFromServerAction = actionCreator<{x: number, y: number, body: string, uuid:string}>('LOAD_STICKY_FROM_SERVER')
export const moveCanvasPositionAction = actionCreator<{x: number, y: number}>('UPDATE_CANVAS_POSITION')
export const updateStickyAction = actionCreator<{x?: number, y?: number, uuid: string, editing?: boolean, body?: string}>('UPDATE_STICKY')
export const interactionFinishedStickyAction = actionCreator<{uuid: string}>('INTERACTION_FINISHED_STICKY')
export const moveStickyToTopAction = actionCreator<{uuid: string}>('MOVE_STICKY_TO_TOP')
export const removeStickyAction = actionCreator<{uuid: string}>('REMOVE_STICKY')

export const boardLoadedAction = actionCreator<{name: string}>('BOARD_LOADED')

export const boardNotFoundAction = actionCreator<{}>('BOARD_NOT_FOUND')

export const persistenceQueueSuccessAction = actionCreator<{queueUuid: string}>('PERSISTENCE_QUEUE_SUCCESS')
