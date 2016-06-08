import * as React from 'react'
import * as ReactDOM from 'react-dom'

import BoardView from 'board/boardView'
import StickyListView from 'sticky/stickyListView'
import CanvasView from 'canvas/canvasView'
import {getState, dispatch, subscribeToState} from 'state/reduxStore'
import { NewStickyView } from 'sticky/newStickyView'
import {createStickyAction} from 'state/actions'

getState()
ReactDOM.render(
  <BoardView>
    <CanvasView/>
    <StickyListView/>
    <NewStickyView/>
  </BoardView>,
  document.getElementById('app')
  
);
