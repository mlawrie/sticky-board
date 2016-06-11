import { expect, sinon } from 'testHelpers/testHelper'
import { shallow, mount, CommonWrapper } from 'enzyme'
import * as React from 'react'
import StickyView from 'sticky/stickyView'
import { dispatch, getState } from 'state/reduxStore'
import { createStickyAction } from 'state/actions'
import { CloseButton } from 'sticky/closeButton'

describe('StickyView', () => {
  let uuid:string
  let wrapper:CommonWrapper<any, {}>
  
  beforeEach(() => {
    dispatch(createStickyAction({x: 100, y: 100, body: 'foo', uuid: 'foo'}))
    uuid = getState().stickies.keySeq().first()
    wrapper = mount(<StickyView uuid={uuid}/>)
    
    expect(getState().stickies.count()).to.eql(1)
  })
  
  it('can be removed', () => {
    (wrapper.find('CloseButton').props() as any).onClosePressed()
    expect(getState().stickies.count()).to.eql(0)
  })
  
  it('turns on edit mode on click', () => {
    (wrapper.find('GestureRecognizerView').props() as any).onClicked()
    expect(getState().stickies.get(uuid).editing).to.eql(true)
  })
  
  it('turns off edit mode on drag', () => {
    (wrapper.find('GestureRecognizerView').props() as any).onClicked();
    (wrapper.find('GestureRecognizerView').props() as any).onDragged({x: 10, y: 10})
    expect(getState().stickies.get(uuid).editing).to.eql(false)
  })
  
  it('edits body', () => {
    (wrapper.find('GestureRecognizerView').props() as any).onClicked();
    expect(getState().stickies.get(uuid).editing).to.eql(true);
    (wrapper.find('textarea').props() as any).onChange({target: {value: 'bar'}});
    expect(getState().stickies.get(uuid).body).to.eql('bar')
  })
})
