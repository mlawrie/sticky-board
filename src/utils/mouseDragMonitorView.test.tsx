import { expect, sinon, inject } from 'testHelpers/testHelper'
import * as React from 'react'
import { MouseDragMonitorView, DragEvent } from 'utils/mouseDragMonitorView'
import { BodyEventListener } from 'utils/bodyEventListener'
import { shallow } from 'enzyme'

describe('mouseDragMonitor', () => {
  let mockBodyEventListener: BodyEventListener
  let eventListeners:{[id: string] : (ev: DragEvent) => any} = {}
  
  beforeEach(() => {  
    mockBodyEventListener = {
      add: (type: string, f: (ev: MouseEvent) => any) => {eventListeners[type] = f},
      remove: () => {}
    }
    
    inject(() => new BodyEventListener(), () => mockBodyEventListener)
  })
  
  it('should call callback when dragged', () => {
    const callback = sinon.stub()
    const wrapper = shallow(<MouseDragMonitorView onDragged={callback}/>)
    wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
    eventListeners['mousemove']({clientX: 5, clientY: 5})
    expect(callback).to.have.been.called
  })
  
  it('should return mouse movement delta to callback', () => {
    const callback = sinon.stub()
    const wrapper = shallow(<MouseDragMonitorView onDragged={callback}/>)
    
    wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
    eventListeners['mousemove']({clientX: 20, clientY: 6})
    expect(callback).is.called
    expect(callback).is.calledWith({x: 15, y: 1})
  })
  
  it('should unregister from events when mouseup has been fired', () => {
    const stub = sinon.stub(mockBodyEventListener, 'remove')
    const wrapper = shallow(<MouseDragMonitorView onDragged={() => {}}/>)
    wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
    eventListeners['mouseup']({clientX: 5, clientY: 5})
    expect(stub).to.have.been.calledWith('mouseup')
    expect(stub).to.have.been.calledWith('mousemove')
    expect(stub).to.have.been.calledWith('mouseleave')
    
  })
})