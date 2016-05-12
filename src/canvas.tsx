import * as React from 'react'

class Canvas extends React.Component<{}, {}> {
  render() {
    return (
      <div
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: '#333'}}>
      </div>
    );
  }
}

export default Canvas;
