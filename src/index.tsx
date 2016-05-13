import * as React from 'react'
import * as ReactDOM from 'react-dom'

import StickyListView from './stickyListView'
import Canvas from './canvas'
import {getState, dispatch, subscribeToState} from './reduxStore'
import {createStickyAction} from './actions'

getState()
dispatch(createStickyAction({x: 300, y: 300}))
dispatch(createStickyAction({x: 500, y: 500}))
dispatch(createStickyAction({x: 100, y: 100}))
ReactDOM.render(
  <div>
    <Canvas/>
    <StickyListView/>
  </div>,
  document.getElementById('app')
  
);
