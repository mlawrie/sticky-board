import { expect, sinon } from 'testHelpers/testHelper'
import { shallow } from 'enzyme'
import * as React from 'react'
import StickyView from 'sticky/stickyView'
import { dispatch, getState } from 'state/reduxStore'
import { createStickyAction } from 'state/actions'
import { CloseButton } from 'sticky/closeButton'

describe('StickyView', () => {
  it('can be removed', () => {
    dispatch(createStickyAction({x: 100, y: 100, body: 'foo'}))
    const uuid = getState().stickies.keySeq().first()
    const wrapper = shallow(<StickyView uuid={uuid}/>);
    (wrapper.find('CloseButton').props() as any).onClosePressed()
    expect(getState().stickies.count()).to.eql(0)
  })
})
