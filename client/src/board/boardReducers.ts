import { Board } from 'board/board'
import {isType, boardLoadedAction, boardNotFoundAction, Action} from 'state/actions'

export interface BoardState {
  readonly board: Board 
}

export const boardReducers = (state: Board = {initialLoadPending: true, name: '', notFound: false}, action: Action<any>): Board => {
  if (isType(action, boardLoadedAction)) {
    return {initialLoadPending: false, name: action.payload.name, notFound: false}
  }
  
  if (isType(action, boardNotFoundAction)) {
    return {initialLoadPending: false, name: '', notFound: true}
  }
  
  return state
}
