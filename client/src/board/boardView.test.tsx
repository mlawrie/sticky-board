import { expect, sinon, inject, waitForPromises } from 'testHelpers/testHelper'
import { shallow, mount, CommonWrapper } from 'enzyme'
import * as React from 'react'
import BoardView from 'board/boardView'
import { dispatch, getState } from 'state/reduxStore'
import { boardLoadedAction } from 'state/actions'
import { jsonRequest, JSONRequestBody, NetworkResponse, NetworkError } from 'utils/jsonRequest'
import * as Promise from 'bluebird'

describe('BoardView', () => {
  let jsonRequestStub: Sinon.SinonStub
  beforeEach(() => {
    jsonRequestStub = sinon.stub().returns(Promise.resolve({json: {}}))
    inject<(r: JSONRequestBody) => any>(() => jsonRequest, () => jsonRequestStub)
    inject(() => location.pathname, () => '/')
  })
  
  it('does not show children initially', () => {
    const wrapper = mount(<BoardView><p>some text</p></BoardView>)
    let childView = wrapper.find('p')
    expect(childView.length).to.eql(0)
  })
  
  it('shows children and board name after load', () => {
    const wrapper = mount(<BoardView><p>some text</p></BoardView>)
    dispatch(boardLoadedAction({name: 'some board name'}))
    let childView = wrapper.find('p')
    expect(childView.length).to.eql(1)
    expect(wrapper.text()).to.contain('some board name')
  })
  
  it('makes request to load board', () => {
    inject(() => location.pathname, () => '/boards/name/token')
    const wrapper = mount(<BoardView><p></p></BoardView>)
    expect(jsonRequestStub.args[0][0].uri).to.eql('/api/boards/name/token')  
  })
  
  it('sets board name on load', (done) => {
    jsonRequestStub.returns(Promise.resolve({json: {name: 'fancy board'}}))
    const wrapper = mount(<BoardView><p></p></BoardView>)
    waitForPromises(() => {
      expect(wrapper.text()).to.contain('fancy board')  
      done()
    })
  })
  
  it('shows an error when board load fails', (done) => {
    jsonRequestStub.returns(Promise.reject(new NetworkError('foo', 404)))
    const wrapper = mount(<BoardView><p></p></BoardView>)
    waitForPromises(() => {
      expect(wrapper.text()).to.contain('board not found')  
      done()
    })
  })
})
