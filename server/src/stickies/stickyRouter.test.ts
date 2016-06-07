/// <reference path="../../typings/main/ambient/mocha/index.d.ts" />
import { request, Response, expect } from '../testHelper'
import { app } from '../app'
import * as express from 'express'
import { boardCollection, Board } from '../boards/board'
import { stickyCollection } from '../stickies/sticky'

describe('stickyRouter', () => {
  describe('POST /api/stickies', () => {
    let board:Board
    
    beforeEach((done) => {
      boardCollection.insert({name: 'foo board', url_token: 'some_url_token'}).then((createdBoard) => {
        board = createdBoard
        done()
      })
    })
    
    it('creates a sticky', (done) => {
      request(app).post('/api/stickies')
        .send({body: 'some body', uuid: 'uuid', x: 123, y: 234, url_token: 'some_url_token'})
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
        .send({body: 'some body', x: 123, y: 234, url_token: 'some_url_token'})
        .expect((res: Response) => {
          expect(res.text).to.contain('violates not-null constraint')
        })
        .expect(422, done)
    })
    
    it('associates sticky with board', (done) => {
      request(app).post('/api/stickies')
        .send({body: 'some body', uuid: 'uuid', x: 123, y: 234, url_token: 'some_url_token'})
        .expect(200, () => {
          stickyCollection.getByBoardId(board.id).then((sticky) => {
            expect(sticky.length).to.eql(1)
            expect(sticky[0].body).to.eql('some body')
            done()
          })
        })  
    })
    
    it('returns error board does not exist', (done) => {
      request(app).post('/api/stickies')
        .send({body: 'some body', uuid: 'uuid', x: 123, y: 234, url_token: 'foo'})
        .expect((res: Response) => {
          expect(res.text).to.contain('record not found')
        })
        .expect(422, done)
    })
  })
})