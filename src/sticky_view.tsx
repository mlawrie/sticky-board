import * as React from 'react'
import MouseDragMonitor from './mouse_drag_monitor'
import Immutable from './immutable'
import MutableSticky from './mutable_sticky'

new MouseDragMonitor(() => {})

class StickyView extends React.Component<{}, {sticky: Immutable<MutableSticky>}> {
  private mouseDragMonitor:MouseDragMonitor
  
  constructor(props: any) {
    super(props)
    
    this.mouseDragMonitor = new MouseDragMonitor((delta) => {
      let newSticky = this.state.sticky.modify((sticky) => {
        sticky.x += delta.x
        sticky.y += delta.y
      })
      
      this.setState({sticky: newSticky})
    }) 
    
    this.state = {sticky: new Immutable<MutableSticky>({x: 0, y: 0, z: 1})}
  }
  render() {
    const style = Object.assign({}, styles.container,
      {top: this.state.sticky.get().y, left: this.state.sticky.get().x, zIndex: this.state.sticky.get().z})

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