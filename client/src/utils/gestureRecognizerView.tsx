import * as React from 'react'
import { BodyEventListener } from 'utils/bodyEventListener'
import { mockable } from 'utils/injector'

interface Vector {
  readonly x: number
  readonly y: number
}

export interface DragEvent {
    readonly clientX: number
    readonly clientY: number
}

const subtract = (v1:Vector, v2: Vector) => ({x: v1.x - v2.x, y: v1.y - v2.y})
const makeVector = (ev: DragEvent) => ({x: ev.clientX, y: ev.clientY})
const distance = (v1:Vector, v2:Vector) => Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2))

interface GestureRecognizerViewProps {
    readonly onDragged: (v:Vector) => void
    readonly onDragFinished: () => void
    readonly onClicked: () => void
    readonly threshold: number
    readonly children?: Element[]
}

export class GestureRecognizerView extends React.Component<GestureRecognizerViewProps, {}> {
    mouseDown(ev: DragEvent) {
        const eventListener = mockable(() => new BodyEventListener()) 
        let lastPosition = makeVector(ev)
        const initialPosition = makeVector(ev)
        
        const mouseMove = (ev: MouseEvent) => {
            const newPosition = makeVector(ev)
            if (distance(newPosition, initialPosition) >= this.props.threshold) {
                this.props.onDragged(subtract(newPosition, lastPosition))
                lastPosition = newPosition    
            }
        }
        
        const cleanup = () => {
            eventListener.remove('mouseup', mouseUp)
            eventListener.remove('mouseleave', cleanup)
            eventListener.remove('mousemove', mouseMove)
        }
        
        const mouseUp = (ev:MouseEvent) => {
            if (distance(makeVector(ev), initialPosition) < this.props.threshold) {
                this.props.onClicked()    
            } else {
                this.props.onDragFinished()
            }
            cleanup()
        } 
        
        eventListener.add('mousemove', mouseMove)
        eventListener.add('mouseup', mouseUp)
        eventListener.add('mouseleave', cleanup)
    }
    
    render() {
        return <div onMouseDown={(e) => this.mouseDown(e)}>
            {this.props.children}
            </div>
    }   
}
