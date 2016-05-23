import * as chai from 'chai'
import * as sinonLib from 'sinon'
import * as sinonChai from 'sinon-chai'
import { clearMocks, injectMock } from 'utils/injector'

chai.use(sinonChai)
beforeEach(clearMocks)

export const expect = chai.expect
export const sinon = sinonLib
export const inject = injectMock
