import * as React from 'react'
import { Timer } from 'utils/timer'
import { mockable } from 'utils/injector'

interface HoverMonitorViewProps {
  readonly onHoverChange: (b:Boolean) => void
  readonly children?: Element[]
  readonly entryLatency: number
  readonly exitLatency: number
}

export class HoverMonitorView extends React.Component<HoverMonitorViewProps, {}> {
  private timerId: NodeJS.Timer 
  
  render() {
    const mouseChange = (hovered: boolean) => {
      const timer = mockable(() => new Timer())
      timer.clearTimeout(this.timerId)
      this.timerId = timer.setTimeout(() => this.props.onHoverChange(hovered), hovered ? this.props.entryLatency : this.props.exitLatency)  
    }
    
    return (
      <div onMouseOver={() => mouseChange(true)} onMouseOut={() => mouseChange(false)}>
        {this.props.children}
      </div>
    )
  }
}

