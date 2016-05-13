import {MouseEventHandler, MouseEvent} from 'react'

interface Vector {
  readonly x: number
  readonly y: number
}

const subtract = (v1:Vector, v2: Vector) => ({x: v1.x - v2.x, y: v1.y - v2.y})
const makeVector = (ev:MouseEvent) => ({x: ev.clientX, y: ev.clientY}) 

export default class MouseDragMonitor {
    private lastPosition: Vector
    private dragging = false

    constructor(private mouseDragged: (v: Vector) => void) {}
    
    readonly mouseMove: MouseEventHandler = (ev) => {
        if (!this.dragging) {
            return
        }
        let newPosition = makeVector(ev)
        this.mouseDragged(subtract(newPosition, this.lastPosition))
        this.lastPosition = newPosition
    }
    
    readonly mouseLeave: MouseEventHandler = (ev) => {
        this.dragging = false
        this.lastPosition = makeVector(ev)
    }
    
    readonly mouseDown: MouseEventHandler = (ev) => {
        this.dragging = true
        this.lastPosition = makeVector(ev)
    }
    
    readonly mouseUp: MouseEventHandler = (ev) => {
        this.dragging = false
    }   
}
