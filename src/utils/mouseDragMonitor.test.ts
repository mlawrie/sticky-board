import { expect, sinon } from 'testHelpers/testHelper'
import { MouseEvent } from 'react'
import { makeMouseEvent } from 'testHelpers/makeMouseEvent'
import MouseDragMonitor from 'utils/mouseDragMonitor'

describe('mouseDragMonitor', () => {
  it('should call callback when dragged', () => {
    const callback = sinon.stub()
    const monitor = new MouseDragMonitor(callback)
    monitor.mouseDown(makeMouseEvent())
    monitor.mouseMove(makeMouseEvent())
    expect(callback).to.have.been.called
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
    
    expect(callback).is.called
    expect(callback).is.calledWith({x: 15, y: 1})
  })
  
  it('should stop sending events when mouseup has been fired', () => {
    const callback = sinon.stub()
    const monitor = new MouseDragMonitor(callback)
    monitor.mouseDown(makeMouseEvent())
    monitor.mouseMove(makeMouseEvent())
    monitor.mouseUp(makeMouseEvent())
    monitor.mouseMove(makeMouseEvent())
    expect(callback).is.calledOnce
  })
})