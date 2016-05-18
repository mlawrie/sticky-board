import * as React from 'react'
import { dispatch } from 'state/reduxStore'
import { moveCanvasPositionAction } from 'state/actions'
import MouseDragMonitor from 'utils/mouseDragMonitor'

class Canvas extends React.Component<{}, {}> {
  private mouseDragMonitor: MouseDragMonitor
  constructor(props: {}) {
    super(props)
    this.mouseDragMonitor = new MouseDragMonitor((delta) => {dispatch(moveCanvasPositionAction(delta))}) 
  }
  render() {
    return (
      <div
        onMouseDown={this.mouseDragMonitor.mouseDown}
        onMouseUp={this.mouseDragMonitor.mouseUp}
        onMouseMove={this.mouseDragMonitor.mouseMove}
        onMouseLeave={this.mouseDragMonitor.mouseLeave}
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: '#333'}}>
      </div>
    );
  }
}

export default Canvas;
