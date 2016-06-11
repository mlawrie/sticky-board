import * as React from 'react'
import { subscribe } from 'state/subscribe'
import { Board } from 'board/board'
import { jsonRequest, NetworkError } from 'api/jsonRequest'
import { dispatch } from 'state/reduxStore'
import { boardLoadedAction, boardNotFoundAction } from 'state/actions'
import { mockable } from 'utils/injector'

interface Props {
  readonly children?: Element[]
}

interface State {
  board: Board
}

const loadBoard = () => {
  const pathname = mockable(() => location.pathname)
  const requester = mockable(() => jsonRequest)
  
  const uri = pathname.replace(/^\/boards\//, '/api/boards/')
  requester({uri, body: {}})
    .then((response) => dispatch(boardLoadedAction({name: response.json.name})))
    .catch(NetworkError, (error: NetworkError) => {
      if (error.status < 500) {
        dispatch(boardNotFoundAction({}))
      }
    })
}

class BoardView extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props)
    subscribe((state) => ({board: state.board}), this)
    loadBoard()
  }
  
  render() {
    if (this.state.board.initialLoadPending) {
      return <div>Loading...</div>
    }
    
    if (this.state.board.notFound) {
      return <div>board not found</div>
    }
    
    return (
      <div>
        <h1 style={styles.name}>{this.state.board.name}</h1>
      {this.props.children}
      </div>
    );
  }
}

const styles = {
  name: {
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: '20px',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    margin: 0,
    padding: '5px 10px',
    backgroundColor: '#999'
  }
}

export default BoardView
