import * as React from 'react'
import * as ReactDOM from 'react-dom'

import StickyView from './sticky_view'
import Canvas from './canvas'

ReactDOM.render(
  <div>
    <Canvas/>
        <StickyView/>
        <StickyView/>
        <StickyView/>
  </div>,
  document.getElementById('app')
);
