import { expect, sinon, waitForPromises, inject } from 'testHelpers/testHelper'
import { getState, dispatch } from 'state/reduxStore'
import { createStickyAction, interactionFinishedStickyAction } from 'state/actions'
import { jsonRequest, JSONRequestBody } from 'api/jsonRequest'
import { sendActionToServer } from 'api/sendActionToServer'
import * as Promise from 'bluebird'
import combine from 'utils/combine'

describe('persistenceMiddleware', () => {
  const url_token = 'some_url_token'

  let jsonRequestStub: Sinon.SinonStub
  beforeEach(() => {
    jsonRequestStub = sinon.stub().returns(Promise.resolve({json: {}}))
    inject<(r: JSONRequestBody) => any>(() => jsonRequest, () => jsonRequestStub)
    inject(() => location.pathname, () => '/boards/some_board_name/some_url_token')
  })

  describe('createStickyAction', () => {
    it('sends request to POST /api/stickies', () => {
      dispatch(createStickyAction({x: 999, y: 123, body: 'foo', uuid: 'uuid'}))
      return waitForPromises().then(() => {
        expect(jsonRequestStub.firstCall.args[0].uri).to.eql('/api/stickies')
        expect(jsonRequestStub.firstCall.args[0].method).to.eql('POST')
      })
    })

    it('sends params', () => {
      const sticky = {x: 999, y: 123, body: 'foo', uuid: 'uuid val'}
      dispatch(createStickyAction(sticky))

      return waitForPromises().then(() => {
        expect(jsonRequestStub.firstCall.args[0].body).to.eql(combine(sticky, {url_token}))
      })
    })
  })

  describe('interactionFinishedStickyAction', () => {
    it('sends request to PUT /api/stickies', () => {
      dispatch(createStickyAction({x: 999, y: 123, body: 'foo', uuid: 'uuid'}))
      
      dispatch(interactionFinishedStickyAction({uuid: 'uuid'}))
      
      return waitForPromises().then(() => {
        expect(jsonRequestStub.lastCall.args[0].uri).to.eql('/api/stickies')
        expect(jsonRequestStub.lastCall.args[0].method).to.eql('PUT')
      })
    })

    it('sends params', () => {
      const sticky = {x: 999, y: 123, body: 'foo', uuid: 'uuid val'}
      dispatch(createStickyAction(sticky))
      dispatch(interactionFinishedStickyAction({uuid: 'uuid val'}))
       
      return waitForPromises().then(() => {
        expect(jsonRequestStub.lastCall.args[0].body).to.eql(combine(sticky, {url_token}))
      })
    })
  })
})