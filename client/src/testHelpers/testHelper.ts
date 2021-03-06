import * as chai from 'chai'
import * as sinonLib from 'sinon'
import * as sinonChai from 'sinon-chai'
import { resetReduxForTests } from 'state/reduxStore'
import { clearMocks, injectMock } from 'utils/injector'
import * as Promise from 'bluebird'

chai.use(sinonChai)

beforeEach(clearMocks)
beforeEach(resetReduxForTests)

export const expect = chai.expect
export const sinon = sinonLib
export const inject = injectMock
export const waitForPromises = () => new Promise((resolve, reject) => setTimeout(resolve, 0))
