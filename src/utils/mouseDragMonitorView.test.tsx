import { expect, sinon } from 'testHelpers/testHelper'
import { MouseEvent } from 'react'
import { makeMouseEvent } from 'testHelpers/makeMouseEvent'
import MouseDragMonitorView from 'utils/mouseDragMonitorView'
import { shallow } from 'enzyme'
import * as React from 'react'

describe('mouseDragMonitor', () => {
  it('should call callback when dragged', () => {
    const callback = sinon.stub()
    const wrapper = shallow(<MouseDragMonitorView onDragged={callback}/>)
    wrapper.get(0).props.onMouseDown(makeMouseEvent())
    wrapper.get(0).props.onMouseMove(makeMouseEvent())
    expect(callback).to.have.been.called
  })
  
  it('should return mouse movement delta to callback', () => {
    const callback = sinon.stub()
    const wrapper = shallow(<MouseDragMonitorView onDragged={callback}/>)
    
    const firstEvent = makeMouseEvent()
    firstEvent.clientX = 5
    firstEvent.clientY = 5
    wrapper.get(0).props.onMouseDown(firstEvent)
    
    const secondEvent = makeMouseEvent()
    secondEvent.clientX = 20
    secondEvent.clientY = 6
    wrapper.get(0).props.onMouseMove(secondEvent)
    
    expect(callback).is.called
    expect(callback).is.calledWith({x: 15, y: 1})
  })
  
  it('should stop sending events when mouseup has been fired', () => {
    const callback = sinon.stub()
    const wrapper = shallow(<MouseDragMonitorView onDragged={callback}/>)
    wrapper.get(0).props.onMouseDown(makeMouseEvent())
    wrapper.get(0).props.onMouseMove(makeMouseEvent())
    wrapper.get(0).props.onMouseUp(makeMouseEvent())
    wrapper.get(0).props.onMouseMove(makeMouseEvent())
    expect(callback).is.calledOnce
  })
})