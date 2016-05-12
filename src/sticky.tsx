import * as React from 'react'

class Sticky extends React.Component<{}, any> {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
      x: 0,
      y: 0,
      z: 1,
      mouseX: 0,
      mouseY: 0,
    };
  }
  render() {

    const mouseDown = (e) => {
      this.setState({
        dragging: true,
        z: this.state.z + 1,
        mouseX: e.nativeEvent.clientX,
        mouseY: e.nativeEvent.clientY
      })
    };
    const mouseUp = (e) => {
      this.setState({dragging: false})
    };
    const mouseMove = (e) => {
      if (this.state.dragging) {
        const mouseX = e.nativeEvent.clientX
        const mouseY = e.nativeEvent.clientY
        const dX = mouseX - this.state.mouseX
        const dY = mouseY - this.state.mouseY

        this.setState({
          mouseX: mouseX,
          mouseY: mouseY,
          x: this.state.x + dX,
          y: this.state.y + dY
        })
      }
    };
    
    const style = Object.assign({}, styles.container,
      {top: this.state.y, left: this.state.x, zIndex: this.state.z})

    return (
      <div
        style={style}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}>
      </div>
    );
  }
}

export default Sticky;

const styles = {
  container: {
    position: 'absolute',
    backgroundColor: '#ffff00',
    border: '1px solid #ee0',
    width: 200,
    height: 200
  }
};