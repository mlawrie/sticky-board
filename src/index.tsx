import * as React from 'react'
import * as ReactDOM from 'react-dom'

import StickyListView from './stickyListView'
import CanvasView from './canvasView'
import {getState, dispatch, subscribeToState} from './reduxStore'
import {createStickyAction} from './actions'

getState()
dispatch(createStickyAction({x: 300, y: 300, body: "hi"}))
dispatch(createStickyAction({x: 500, y: 500, body: "i am a sticky"}))
dispatch(createStickyAction({x: 100, y: 100, body: "i am immutable"}))
ReactDOM.render(
  <div>
    <CanvasView/>
    <StickyListView/>
  </div>,
  document.getElementById('app')
  
);
