import * as React from 'react'
import MouseDragMonitor from './mouse_drag_monitor'
import {Sticky, modifySticky} from './sticky'
import { subscribe } from './subscribe'
import { dispatch } from './reduxStore'
import { updateStickyAction } from './actions'
 


interface StickyViewState {sticky: Sticky}

export default class StickyView extends React.Component<{uuid: string}, StickyViewState> {
  private mouseDragMonitor:MouseDragMonitor
  
  constructor(props: any) {
    super(props)
    this.mouseDragMonitor = new MouseDragMonitor((delta) => {
      let x = this.state.sticky.x + delta.x
      let y = this.state.sticky.y + delta.y
      dispatch(updateStickyAction({uuid: this.props.uuid, x, y}))
    })
    subscribe<StickyViewState>((state) => ({sticky: state.stickies.get(this.props.uuid)}), this)
  }
  
  render() {
    
    const style = Object.assign({}, styles.container,
      {top: this.state.sticky.y, left: this.state.sticky.x, zIndex: this.state.sticky.z})

    return (
      <div
        style={style}
        onMouseDown={this.mouseDragMonitor.mouseDown}
        onMouseUp={this.mouseDragMonitor.mouseUp}
        onMouseMove={this.mouseDragMonitor.mouseMove}>
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
    height: 200
  }
};