/// <reference path="../../typings/main/ambient/mocha/index.d.ts" />
import { request, Response, expect } from '../testHelper'
import { app } from '../app'
import * as express from 'express'
import { boardCollection } from './board'
import { stickyCollection } from '../stickies/sticky'

describe('stickyRouter', () => {
  describe('POST /api/stickies', () => {
    it('creates a sticky', (done) => {
      request(app).post('/api/stickies')
        .send({body: 'some body', uuid: 'uuid', x: 123, y: 234})
        .expect('Content-Type', /json/)
        .expect((res: Response) => {
          expect(res.body.body).to.eql('some body')
          expect(res.body.x).to.eql(123)
          expect(res.body.y).to.eql(234)
          expect(res.body.uuid).to.eql('uuid')
        })
        .expect(200, done)
    })
    
    it('returns error if sticky is invalid ', (done) => {
      request(app).post('/api/stickies')
        .send({body: 'some body', x: 123, y: 234})
        .expect((res: Response) => {
          expect(res.text).to.contain('violates not-null constraint')
        })
        .expect(422, done)
    })
  })
})