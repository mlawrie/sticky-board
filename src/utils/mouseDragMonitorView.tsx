import * as React from 'react'
import { BodyEventListener } from 'utils/bodyEventListener'
import { mockable } from 'utils/injector'

interface Vector {
  readonly x: number
  readonly y: number
}

const subtract = (v1:Vector, v2: Vector) => ({x: v1.x - v2.x, y: v1.y - v2.y})
const makeVector = (ev: {clientX: number, clientY: number}) => ({x: ev.clientX, y: ev.clientY})

interface MouseDragMonitorViewProps {
    readonly onDragged: (v:Vector) => void
    readonly children?: Element[]
}

export default class MouseDragMonitorView extends React.Component<MouseDragMonitorViewProps, {}> {
    private lastPosition: Vector
    
    mouseDown(ev: React.MouseEvent) {
        const eventListener = mockable(() => new BodyEventListener()) 
        this.lastPosition = makeVector(ev)
        
        const mouseMove = (ev: MouseEvent) => {
            let newPosition = makeVector(ev)
            this.props.onDragged(subtract(newPosition, this.lastPosition))
            this.lastPosition = newPosition
        }
        
        const cleanup = () => {
            eventListener.remove('mouseup', cleanup)
            eventListener.remove('mouseleave', cleanup)
            eventListener.remove('mousemove', mouseMove)
        }
        
        eventListener.add('mousemove', mouseMove)
        eventListener.add('mouseup', cleanup)
        eventListener.add('mouseleave', cleanup)
    }
    
    render() {
        return <div onMouseDown={(e) => this.mouseDown(e)}>
            {this.props.children}
            </div>
    }   
}
