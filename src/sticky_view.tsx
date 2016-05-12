import * as React from 'react'
import MouseDragMonitor from './mouse_drag_monitor'
import {Sticky, StickyClone} from './sticky'

new MouseDragMonitor(() => {})

class StickyView extends React.Component<{}, Sticky> {
  private mouseDragMonitor:MouseDragMonitor
  
  constructor(props: any) {
    super(props)
    
    this.mouseDragMonitor = new MouseDragMonitor((delta) => {
      const newSticky = new StickyClone(this.state, {
        x: this.state.x + delta.x,
        y: this.state.y + delta.y
      }).get()
      
      this.setState(newSticky)
    }) 
    
    this.state = {x: 0, y: 0, z: 1}
  }
  render() {
    const style = Object.assign({}, styles.container,
      {top: this.state.y, left: this.state.x, zIndex: this.state.z})

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

export default StickyView

const styles = {
  container: {
    position: 'absolute',
    backgroundColor: '#ffff00',
    border: '1px solid #ee0',
    width: 200,
    height: 200
  }
};