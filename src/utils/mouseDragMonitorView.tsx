import * as React from 'react'

interface Vector {
  readonly x: number
  readonly y: number
}

const subtract = (v1:Vector, v2: Vector) => ({x: v1.x - v2.x, y: v1.y - v2.y})
const makeVector = (ev:React.MouseEvent) => ({x: ev.clientX, y: ev.clientY})

interface MouseDragMonitorViewProps {
    readonly onDragged: (v:Vector) => void
    readonly children?:Element
} 

export default class MouseDragMonitorView extends React.Component<MouseDragMonitorViewProps, {}> {
    private lastPosition: Vector
    private dragging = false
    
    constructor(props:MouseDragMonitorViewProps) {
        super(props)
    }
    
    render() {
        const mouseMove = (ev:React.MouseEvent) => {
            if (!this.dragging) {
                return
            }
            let newPosition = makeVector(ev)
            this.props.onDragged(subtract(newPosition, this.lastPosition))
            this.lastPosition = newPosition
        }
        
        const mouseLeave = (ev:React.MouseEvent) => {
            this.dragging = false
            this.lastPosition = makeVector(ev)
        }
        
        const mouseDown = (ev:React.MouseEvent) => {
            this.dragging = true
            this.lastPosition = makeVector(ev)
        }
        
        const mouseUp = (ev:React.MouseEvent) => {
            this.dragging = false
        }
        
        return <div
            onMouseMove={mouseMove}
            onMouseDown={mouseDown}
            onMouseLeave={mouseLeave}
            onMouseUp={mouseUp}
            >
            {this.props.children}
            </div>
    }   
}
