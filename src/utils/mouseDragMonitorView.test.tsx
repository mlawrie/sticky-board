import { expect, sinon, inject } from 'testHelpers/testHelper'
import * as React from 'react'
import { makeMouseEvent } from 'testHelpers/makeMouseEvent'
import MouseDragMonitorView from 'utils/mouseDragMonitorView'
import { BodyEventListener } from 'utils/bodyEventListener'
import { shallow } from 'enzyme'

describe('mouseDragMonitor', () => {
  let mockBodyEventListener: BodyEventListener
  let eventListeners:{[id: string] : (ev: UIEvent) => any} = {}
  
  beforeEach(() => {
    mockBodyEventListener = {
      add: (type: string, f: (ev: UIEvent) => any) => {eventListeners[type] = f},
      remove: () => {}
    }
    
    inject(() => new BodyEventListener(), () => mockBodyEventListener)
  })
  
  it('should call callback when dragged', () => {
    const callback = sinon.stub()
    const wrapper = shallow(<MouseDragMonitorView onDragged={callback}/>)
    wrapper.get(0).props.onMouseDown(makeMouseEvent())
    eventListeners['mousemove']({} as MouseEvent)
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
    eventListeners['mousemove'](secondEvent as any as MouseEvent)
    
    expect(callback).is.called
    expect(callback).is.calledWith({x: 15, y: 1})
  })
  
  it('should unregister from events when mouseup has been fired', () => {
    const stub = sinon.stub(mockBodyEventListener, 'remove')
    const wrapper = shallow(<MouseDragMonitorView onDragged={() => {}}/>)
    wrapper.get(0).props.onMouseDown(makeMouseEvent())
    eventListeners['mouseup']({} as MouseEvent)
    expect(stub).to.have.been.calledWith('mouseup')
    expect(stub).to.have.been.calledWith('mousemove')
    expect(stub).to.have.been.calledWith('mouseleave')
    
  })
})