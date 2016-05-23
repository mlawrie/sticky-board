import * as React from 'react'

interface CloseButtonProps {
  readonly onClosePressed: () => void
  readonly visible: boolean
}

export class CloseButton extends React.Component<CloseButtonProps, {}> {
  render() {
    if (!this.props.visible) {
      return <div/>
    }
    return (
      <div style={style} onClick={() => this.props.onClosePressed()}>
        X
      </div>
    )
  }
}

const size = 40
const style = {
  cursor: 'pointer',
  position: 'absolute',
  top: -size/2,
  right: -size/2,
  backgroundColor: '#999',
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