import * as React from 'react'
import {Sticky} from './sticky'
import { subscribe } from './subscribe'
import StickyView from './sticky_view'
import Immutable = require('immutable')

interface StickyListViewState {
  uuids: string[]
}

export default class StickyListView extends React.Component<{}, StickyListViewState> {
  
  constructor(props: any) {
    super(props)
    
    subscribe<StickyListViewState>((state) => ({uuids: state.stickies.keySeq().toArray()}), this)
  }
  
  render() {
    const stickyViews = this.state.uuids.map((uuid:string) => <StickyView key={uuid} uuid={uuid} />)

    return (
      <div>
      {stickyViews}
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