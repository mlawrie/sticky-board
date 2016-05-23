import { expect, sinon } from 'testHelpers/testHelper'
import { shallow } from 'enzyme'
import * as React from 'react'
import { makeMouseEvent } from 'testHelpers/makeMouseEvent'
import { HoverMonitorView } from 'utils/hoverMonitorView'
import { injectMock } from 'utils/injector'
import { Timer } from 'utils/timer'

describe('HoverMonitorView', () => {
  it('should call callback when hovered', () => {
    const timer = new Timer();
    sinon.stub(timer, 'setTimeout').yields()
    injectMock(() => new Timer(), () => timer)
    
    const stub = sinon.stub()
    const wrapper = shallow(<HoverMonitorView entryLatency={0} exitLatency={0} onHoverChange={stub}/>)
    wrapper.get(0).props.onMouseOver()
    expect(stub).to.be.calledWith(true)
  })
  
  it('should call callback with false when unhovered', () => {
    const timer = new Timer();
    sinon.stub(timer, 'setTimeout').yields()
    injectMock(() => new Timer(), () => timer)
    
    const stub = sinon.stub()
    const wrapper = shallow(<HoverMonitorView entryLatency={0} exitLatency={0} onHoverChange={stub}/>)
    wrapper.get(0).props.onMouseOver()
    wrapper.get(0).props.onMouseOut()
    expect(stub).to.be.calledWith(false)
  })
})