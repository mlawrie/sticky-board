import { expect, sinon, waitForPromises, inject } from 'testHelpers/testHelper'
import { getState, dispatch } from 'state/reduxStore'
import { createStickyAction } from 'state/actions'
import { jsonRequest, JSONRequestBody } from 'api/jsonRequest'
import { sendActionToServer } from 'api/sendActionToServer'
import * as Promise from 'bluebird'
import combine from 'utils/combine'

describe('persistenceMiddleware', () => {
  let jsonRequestStub: Sinon.SinonStub
  beforeEach(() => {
    jsonRequestStub = sinon.stub().returns(Promise.resolve({json: {}}))
    inject<(r: JSONRequestBody) => any>(() => jsonRequest, () => jsonRequestStub)
    inject(() => location.pathname, () => '/boards/some_board_name/some_url_token')
  })

  it('sends createStickyAction to POST /api/stickies', () => {
    const action = createStickyAction({x: 999, y: 123, body: 'foo'})
    dispatch(action)
    return waitForPromises().then(() => {
      expect(jsonRequestStub.firstCall.args[0].uri).to.eql('/api/stickies')
      expect(jsonRequestStub.firstCall.args[0].method).to.eql('POST')
    })
  })

  it('sends params for createStickyAction', () => {
    const sticky = {x: 999, y: 123, body: 'foo'}
    const action = createStickyAction(sticky)
    dispatch(action)
    const uuid = getState().stickies.keySeq().first()
    const url_token = 'some_url_token' 
    return waitForPromises().then(() => {
      expect(jsonRequestStub.firstCall.args[0].body).to.eql(combine(sticky, {uuid, url_token}))
    })
  })
})