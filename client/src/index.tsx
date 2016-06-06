import * as React from 'react'
import * as ReactDOM from 'react-dom'

import BoardView from 'board/boardView'
import StickyListView from 'sticky/stickyListView'
import CanvasView from 'canvas/canvasView'
import {getState, dispatch, subscribeToState} from 'state/reduxStore'
import {createStickyAction} from 'state/actions'

getState()
dispatch(createStickyAction({x: 300, y: 300, body: "hi"}))
dispatch(createStickyAction({x: 500, y: 500, body: "i am a sticky"}))
dispatch(createStickyAction({x: 100, y: 100, body: "i am immutable"}))
ReactDOM.render(
  <BoardView>
    <CanvasView/>
    <StickyListView/>
  </BoardView>,
  document.getElementById('app')
  
);
