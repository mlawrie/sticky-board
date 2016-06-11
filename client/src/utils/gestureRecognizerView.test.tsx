import { expect, sinon, inject } from 'testHelpers/testHelper'
import * as React from 'react'
import { GestureRecognizerView, DragEvent } from 'utils/gestureRecognizerView'
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
  
  describe('dragging', () => {
    it('should call callback when dragged', () => {
      const callback = sinon.stub()
      const clickCallback = sinon.stub()
      const wrapper = shallow(<GestureRecognizerView onDragged={callback} onDragFinished={() => {}} onClicked={clickCallback} threshold={0}/>)
      wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
      eventListeners['mousemove']({clientX: 5, clientY: 5})
      eventListeners['mouseup']({clientX: 5, clientY: 5})
      expect(callback).to.have.been.called
      expect(clickCallback).to.not.have.been.called
    })
    
    it('should return mouse movement delta to callback', () => {
      const callback = sinon.stub()
      const wrapper = shallow(<GestureRecognizerView onDragged={callback} onDragFinished={() => {}} onClicked={() => {}} threshold={0}/>)
      
      wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
      eventListeners['mousemove']({clientX: 20, clientY: 6})
      expect(callback).is.called
      expect(callback).is.calledWith({x: 15, y: 1})
    })
    
    it('should unregister from events when mouseup has been fired', () => {
      const stub = sinon.stub(mockBodyEventListener, 'remove')
      const wrapper = shallow(<GestureRecognizerView onDragged={() => {}} onDragFinished={() => {}} onClicked={() => {}} threshold={0}/>)
      wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
      eventListeners['mouseup']({clientX: 5, clientY: 5})
      expect(stub).to.have.been.calledWith('mouseup')
      expect(stub).to.have.been.calledWith('mousemove')
      expect(stub).to.have.been.calledWith('mouseleave')
    })
    
    it('does not trigger callback if treshold is not exceeded', () => {
      const callback = sinon.stub()
      const wrapper = shallow(<GestureRecognizerView onDragged={callback} onDragFinished={() => {}} onClicked={() => {}} threshold={5}/>)
      wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
      eventListeners['mousemove']({clientX: 6, clientY: 6})
      eventListeners['mouseup']({clientX: 6, clientY: 6})
      expect(callback).to.not.have.been.called
    })

    it('should trigger onDragFinished when drag is finished', () => {
      const callback = sinon.stub()
      const wrapper = shallow(<GestureRecognizerView onDragged={() => {}} onDragFinished={callback} onClicked={() => {}} threshold={0}/>)
      
      wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
      eventListeners['mousemove']({clientX: 20, clientY: 6})
      eventListeners['mouseup']({clientX: 20, clientY: 6})
      expect(callback).is.called
    })

    it('should not trigger onDragFinished when no dragging took place', () => {
      const callback = sinon.stub()
      const wrapper = shallow(<GestureRecognizerView onDragged={() => {}} onDragFinished={callback} onClicked={() => {}} threshold={5}/>)
      
      wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
      eventListeners['mousemove']({clientX: 6, clientY: 6})
      eventListeners['mouseup']({clientX: 6, clientY: 6})
      expect(callback).is.not.called
    })
  })
  
  describe('clicking', () => {
    it('triggers callback if treshold is not exceeded', () => {
      const dragCallback = sinon.stub()
      const clickCallback = sinon.stub()
      const wrapper = shallow(<GestureRecognizerView onDragged={dragCallback} onDragFinished={() => {}} onClicked={clickCallback} threshold={5}/>)
      wrapper.get(0).props.onMouseDown({clientX: 5, clientY: 5})
      eventListeners['mousemove']({clientX: 6, clientY: 6})
      eventListeners['mouseup']({clientX: 6, clientY: 6})
      expect(dragCallback).to.not.have.been.called
      expect(clickCallback).to.have.been.called
    })
  })
  
})