import { expect, sinon, inject, waitForPromises } from 'testHelpers/testHelper'
import { shallow, mount, CommonWrapper } from 'enzyme'
import * as React from 'react'
import BoardView from 'board/boardView'
import { dispatch, getState } from 'state/reduxStore'
import { boardLoadedAction } from 'state/actions'
import { jsonRequest, JSONRequestBody, NetworkResponse, NetworkError } from 'api/jsonRequest'
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
    waitForPromises().then(() => {
      expect(wrapper.text()).to.contain('fancy board')  
      done()
    })
  })

  it('initializes stickies on load', () => {
    jsonRequestStub.returns(Promise.resolve({json: {name: 'fancy board', stickies: [{"body":"Test!","uuid":"someUuid","x":300,"y":400}]}}))
    const wrapper = mount(<BoardView><p></p></BoardView>)
    return waitForPromises().then(() => {
      expect(getState().stickies.count()).to.eql(1)
      expect(getState().stickies.first().body).to.eql('Test!')
      expect(getState().stickies.first().x).to.eql(300)
      expect(getState().stickies.first().y).to.eql(400)
      expect(getState().stickies.keySeq().first()).to.eql('someUuid')
    })
  })
  
  it('shows an error when board load fails', (done) => {
    jsonRequestStub.returns(Promise.reject(new NetworkError('foo', 404)))
    const wrapper = mount(<BoardView><p></p></BoardView>)
    waitForPromises().then(() => {
      expect(wrapper.text()).to.contain('board not found')  
      done()
    })
  })
})
