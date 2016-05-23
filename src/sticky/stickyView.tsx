import * as React from 'react'
import MouseDragMonitorView from 'utils/mouseDragMonitorView'
import { Sticky, modifySticky } from 'sticky/sticky'
import { Canvas } from 'canvas/canvas'
import { subscribe } from 'state/subscribe'
import { dispatch } from 'state/reduxStore'
import { updateStickyAction, moveStickyToTopAction } from 'state/actions'
import objectAssign = require('object-assign')
import { CloseButton } from 'sticky/closeButton'
import { HoverMonitorView } from 'utils/hoverMonitorView'
 
interface StickyViewState {
  sticky: Sticky
  canvas: Canvas
}

export default class StickyView extends React.Component<{uuid: string}, StickyViewState> {
  
  constructor(props: any) {
    super(props)
    
    subscribe<StickyViewState>((state) => ({
      sticky: state.stickies.get(this.props.uuid),
      canvas: state.canvas
    }), this)
  }
  
  render() {
    const onDrag = (delta: {x: number, y: number}) => {
      const x = this.state.sticky.x + delta.x
      const y = this.state.sticky.y + delta.y
      dispatch(updateStickyAction({uuid: this.props.uuid, x, y}))
    }
    
    const hover = (hovered:boolean) => dispatch(updateStickyAction({uuid: this.props.uuid, hovered}))
    
    const mouseDown = (event:React.MouseEvent) => {
      dispatch(moveStickyToTopAction({uuid: this.props.uuid}));
    }
    
    const style = objectAssign({}, styles.container,
      {
        top: this.state.canvas.y + this.state.sticky.y,
        left: this.state.canvas.x + this.state.sticky.x,
        zIndex: this.state.sticky.z
      })

    return (
      <HoverMonitorView entryLatency={300} exitLatency={300} onHoverChange={hover}>
        <MouseDragMonitorView onDragged={onDrag}>
          <div style={style} onMouseDown={mouseDown}>
            <div style={styles.inside}>{this.state.sticky.body}</div>
            <CloseButton visible={this.state.sticky.hovered} onClosePressed={() => {}}/>
          </div>
        </MouseDragMonitorView>
      </HoverMonitorView>
    )
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