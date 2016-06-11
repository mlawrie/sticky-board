import { expect, sinon, waitForPromises } from 'testHelpers/testHelper'
import { getState, dispatch } from 'state/reduxStore'
import { createStickyAction } from 'state/actions'
import { injectMock } from 'utils/injector'
import { Timer } from 'utils/timer'
import { sendActionToServer } from 'api/sendActionToServer'
import * as Promise from 'bluebird'

describe('persistenceMiddleware', () => {
  beforeEach(() => {
    const mockTimer = new Timer()
    sinon.stub(mockTimer, 'setTimeout').yields()
    injectMock(() => new Timer(), () => mockTimer)
  })

  it('clears a createStickyAction from the queue', () => {
    injectMock(() => sendActionToServer, () => () => Promise.resolve())
    expect(getState().persistenceQueue.count()).to.eql(0)
    dispatch(createStickyAction({x: 1, y: 2, body: 'some sticky', uuid: 'some uuid'}))
    expect(getState().persistenceQueue.count()).to.eql(1)
    return waitForPromises().then(() => {
      expect(getState().persistenceQueue.count()).to.eql(0)
    })
  })

  it('calls service with createStickyAction', () => {
    const stub = sinon.stub().returns(Promise.resolve())
    injectMock(() => sendActionToServer, () => stub as any)
    dispatch(createStickyAction({x: 1, y: 2, body: 'some sticky', uuid: 'some uuid'}))
    expect(stub.firstCall.args[0].payload).to.eql({x: 1, y: 2, body: 'some sticky', uuid: 'some uuid'})
    expect(stub.firstCall.args[0].type).to.eql('CREATE_STICKY')
  })

  it('does not clear a createStickyAction from the queue when the request fails', () => {
    injectMock(() => sendActionToServer, () => () => Promise.reject(new Error()))
    expect(getState().persistenceQueue.count()).to.eql(0)
    dispatch(createStickyAction({x: 1, y: 2, body: 'some sticky', uuid: 'some uuid'}))
    expect(getState().persistenceQueue.count()).to.eql(1)

    return waitForPromises().then(() => {
      expect(getState().persistenceQueue.count()).to.eql(1)
    })
  })

  it('retries failures', () => {
    const stub = sinon.stub()
    stub.returns(Promise.reject(new Error('foo')))
    injectMock(() => sendActionToServer, () => stub as any)
    dispatch(createStickyAction({x: 1, y: 2, body: 'some sticky', uuid: 'some uuid'}))

    return waitForPromises()
      .then(() => {
        expect(getState().persistenceQueue.count()).to.eql(1)
        stub.returns(Promise.resolve())
        dispatch(createStickyAction({x: 1, y: 2, body: 'some other sticky', uuid: 'some uuid'}))
        expect(getState().persistenceQueue.count()).to.eql(2)
        stub.reset()
        stub.returns(Promise.resolve())
      })
      .then(waitForPromises)
      .then(() => {
        expect(getState().persistenceQueue.count()).to.eql(0)
        expect(stub).to.have.been.calledTwice
      })
  })
})
