import * as React from 'react'
import { createStickyAction } from 'state/actions'
import { dispatch } from 'state/reduxStore'
export class NewStickyView extends React.Component<{}, {}> {
  render() {
    return (
      <div style={style} onClick={() => {
        const body = prompt("Enter sticky text")
        dispatch(createStickyAction({x: 300, y: 300, body: body || ""}))
      }}>+</div>
    )
  }
}

const size = 40
const style = {
  cursor: 'pointer',
  position: 'absolute',
  bottom: 10,
  right: 10,
  backgroundColor: '#555',
  width: size,
  height: size,
  fontSize: 20,
  lineHeight: size + 'px',
  textAlign: 'center',
  borderRadius: size,
  color: '#fff',
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontWeight: 'bold'
}