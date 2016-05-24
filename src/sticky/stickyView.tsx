import * as React from 'react'
import { GestureRecognizerView } from 'utils/gestureRecognizerView'
import { Sticky, modifySticky } from 'sticky/sticky'
import combine from 'utils/combine'
import { Canvas } from 'canvas/canvas'
import { subscribe } from 'state/subscribe'
import { dispatch } from 'state/reduxStore'
import { updateStickyAction, moveStickyToTopAction, removeStickyAction } from 'state/actions'
import { CloseButton } from 'sticky/closeButton'
 
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
  
  renderStickyLabel() {
    if (this.state.sticky.editing) {
      const onChange = (e:React.SyntheticEvent) => dispatch(updateStickyAction({uuid: this.props.uuid, body: (e.target as any).value}))
      return <span>
        <textarea onChange={(onChange)} rows={3} autoFocus style={styles.inside} type="text" value={this.state.sticky.body}/>
      </span>  
    }
    return <div style={styles.inside}>{this.state.sticky.body}</div>
  }

  render() {
    if (!this.state.sticky) {
      return <div/>
    }
    
    const onDrag = (delta: {x: number, y: number}) => {
      const x = this.state.sticky.x + delta.x
      const y = this.state.sticky.y + delta.y
      dispatch(updateStickyAction({uuid: this.props.uuid, x, y, editing: false}))
    }
    const onMouseDown = (event:React.MouseEvent) => dispatch(moveStickyToTopAction({uuid: this.props.uuid}))
    
    const style = combine(styles.container,
      {
        top: this.state.canvas.y + this.state.sticky.y,
        left: this.state.canvas.x + this.state.sticky.x,
        zIndex: this.state.sticky.z,
        backgroundColor: this.state.sticky.editing ? '#ffa' : '#ff0'
      })

    return (
      <GestureRecognizerView
        onDragged={onDrag}
        onClicked={() => dispatch(updateStickyAction({uuid: this.props.uuid, editing: true}))}
        threshold={10}>
        <div style={style} onMouseDown={onMouseDown}>
          {this.renderStickyLabel()}
          <CloseButton visible={this.state.sticky.editing}
            onClosePressed={() => dispatch(removeStickyAction({uuid: this.props.uuid}))}/>
        </div>
      </GestureRecognizerView>
    )
  }
}

const styles = {
  container: {
    boxSizing: 'border-box',
    position: 'absolute',
    border: '1px solid #ee0',
    width: 182,
    height: 120,
    padding: 10
  },
  inside: {
    fontSize: 20,
    margin: 0,
    padding: 0,
    resize: 'none',
    width: '100%',
    height: '100%',
    border: 'none',
    background: 'transparent',
    textAlign: 'left',
    fontFamily: 'Comic Sans MS',
    overflow: 'hidden',
    outline: 'none',
    WebkitBoxShadow: 'none',
    MozBoxShadow: 'none',
    boxShadow: 'none'
  }
}
