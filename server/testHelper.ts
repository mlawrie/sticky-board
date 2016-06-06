import * as chai from 'chai'
import * as sinonLib from 'sinon'
import * as sinonChai from 'sinon-chai'
import { db } from './database'
import * as knexCleaner from 'knex-cleaner'
import * as supertest from 'supertest'

chai.use(sinonChai)
beforeEach((done) => knexCleaner.clean(db).then(() => done()))

export const request = supertest
export const expect = chai.expect
export const sinon = sinonLib
export interface Response extends supertest.Response {}


