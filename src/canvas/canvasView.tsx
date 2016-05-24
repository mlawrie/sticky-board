import * as React from 'react'
import { dispatch } from 'state/reduxStore'
import { moveCanvasPositionAction } from 'state/actions'
import { MouseDragMonitorView } from 'utils/mouseDragMonitorView'

class Canvas extends React.Component<{}, {}> {
  render() {
    return (
      <MouseDragMonitorView onDragged={(delta) => dispatch(moveCanvasPositionAction(delta))} threshold={0}>
        <div style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: '#333'}}/>
      </MouseDragMonitorView>
    );
  }
}

export default Canvas
