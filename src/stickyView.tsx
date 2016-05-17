import * as React from 'react'
import MouseDragMonitor from './mouseDragMonitor'
import { Sticky, modifySticky } from './sticky'
import { Canvas } from './canvas'
import { subscribe } from './subscribe'
import { dispatch } from './reduxStore'
import { updateStickyAction, moveStickyToTopAction } from './actions'
import objectAssign = require('object-assign')
 
interface StickyViewState {
  sticky: Sticky
  canvas: Canvas
}

export default class StickyView extends React.Component<{uuid: string}, StickyViewState> {
  private mouseDragMonitor:MouseDragMonitor
  
  constructor(props: any) {
    super(props)
    this.mouseDragMonitor = new MouseDragMonitor((delta) => {
      const x = this.state.sticky.x + delta.x
      const y = this.state.sticky.y + delta.y
      dispatch(updateStickyAction({uuid: this.props.uuid, x, y}))
    })
    
    subscribe<StickyViewState>((state) => ({
      sticky: state.stickies.get(this.props.uuid),
      canvas: state.canvas
    }), this)
  }
  
  render() {
    
    const mouseDown = (event:React.MouseEvent) => {
      this.mouseDragMonitor.mouseDown(event)
      dispatch(moveStickyToTopAction({uuid: this.props.uuid}));
    }
    
    const style = objectAssign({}, styles.container,
      {
        top: this.state.canvas.y + this.state.sticky.y,
        left: this.state.canvas.x + this.state.sticky.x,
        zIndex: this.state.sticky.z
      })

    return (
      <div
        style={style}
        onMouseDown={mouseDown}
        onMouseUp={this.mouseDragMonitor.mouseUp}
        onMouseMove={this.mouseDragMonitor.mouseMove}
        onMouseLeave={this.mouseDragMonitor.mouseLeave}
        >
        <div style={styles.inside}>{this.state.sticky.body}</div>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    backgroundColor: '#ffff00',
    border: '1px solid #ee0',
    width: 200,
    height: 200,
    display: 'table'
  },
  inside: {
    display: 'table-cell',
    verticalAlign: 'middle',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Comic Sans MS'
  }
};