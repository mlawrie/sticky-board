import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Sticky from './sticky'
import Canvas from './canvas'


ReactDOM.render(
  <div>
    <Canvas/>
        <Sticky/>
        <Sticky/>
        <Sticky/>
  </div>,
  document.getElementById('app')
);
