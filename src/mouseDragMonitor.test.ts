import { expect } from 'chai'
import * as sinon from 'sinon'

import { MouseEvent } from 'react'
import { makeMouseEvent } from '../testHelpers/makeMouseEvent'
import MouseDragMonitor from './mouseDragMonitor'

describe('mouseDragMonitor', () => {
  it('should call callback when dragged', () => {
    const callback = sinon.stub()
    const monitor = new MouseDragMonitor(callback)
    monitor.mouseDown(makeMouseEvent())
    monitor.mouseMove(makeMouseEvent())
    expect(callback.called).is.true
  })
  
  it('should return mouse movement delta to callback', () => {
    const callback = sinon.stub()
    const monitor = new MouseDragMonitor(callback)
    
    const firstEvent = makeMouseEvent()
    firstEvent.clientX = 5
    firstEvent.clientY = 5
    monitor.mouseDown(firstEvent)
    
    const secondEvent = makeMouseEvent()
    secondEvent.clientX = 20
    secondEvent.clientY = 6
    monitor.mouseMove(secondEvent)
    
    expect(callback.called).is.true
    expect(callback.calledWith({x: 15, y: 1})).is.true
  })
})