/// <reference path="../../typings/main/ambient/mocha/index.d.ts" />
import { request, Response, expect } from '../testHelper'
import { app } from '../app'
import * as express from 'express'
import { boardCollection } from './board'
import { stickyCollection } from '../stickies/sticky'

describe('boardRouter', () => {
  describe('POST /api/boards', () => {
    it('creates a board', (done) => {
      request(app).post('/api/boards')
        .send({name: 'board name'})
        .expect('Content-Type', /json/)
        .expect((res: Response) => {
          expect(res.body.name).to.eql('board name')
          expect(typeof res.body.url_token).to.eql('string')
        })
        .expect(200, done)
    })
    
    it('throws an error if name is not provided', (done) => {
      request(app).post('/api/boards').expect(422, done)
    })
    
    it('returns a unique url_token', (done) => {
      let firstToken:string
      const agent = request(app)
      agent.post('/api/boards').send({name: 'board name'})
        .expect(200)
        .expect((res: Response) => {
          firstToken = res.body.url_token
      }).end(() => {
        agent.post('/api/boards').send({name: 'board name'})
          .expect((res2: Response) => {
            const secondToken = res2.body.url_token
            expect(firstToken).to.not.eql(secondToken) 
          }).end(done)
      })
    })  
  })
  
  describe('GET /boards/:name/:urlToken', () => {
    const makeBoard = (name:string, callback: (urlToken:string) => void) => {
      let urlToken:string
      request(app).post('/api/boards').send({name})
        .expect(200)
        .expect((res: Response) => {
          urlToken = res.body.url_token
      }).end(() => callback(urlToken))
    }
    
    it('returns stickies associated with the board', (done) => {
      boardCollection.insert({name: 'foo', url_token: 'url_token'})
        .then((board) => stickyCollection.insert({body: 'some sticky', board_id: board.id, x: 10, y: 11, uuid: 'uuid1234'}))
        .then((sticky) => {
          request(app).get('/api/boards/foo/url_token')
            .expect((res: Response) => {
              expect(res.body.stickies.length).to.eql(1)
              expect(res.body.stickies[0].body).to.eql('some sticky')
              expect(res.body.stickies[0].uuid).to.eql('uuid1234')
              expect(res.body.stickies[0].x).to.eql(10)
              expect(res.body.stickies[0].y).to.eql(11)
              expect(Object.keys(res.body.stickies[0]).sort()).to.eql(['body', 'uuid', 'x', 'y'])
            })
            .expect(200, done)
        })
    })
    
    it('returns no stickies if none are associated with the board', (done) => {
      boardCollection.insert({name: 'foo', url_token: 'url_token'})
        .then((board) => {
          request(app).get('/api/boards/foo/url_token')
            .expect((res: Response) => {
              expect(res.body.stickies.length).to.eql(0)
            })
            .expect(200, done)
        })
    })
    
    it('returns only certain attributes', (done) => {
      makeBoard('cool', (urlToken: string) => {
        request(app).get('/api/boards/board_name/' + urlToken)
          .expect((res: Response) => {
            expect(Object.keys(res.body)).to.eql(['name', 'url_token', 'stickies'])
          })
          .expect(200, done)
      })
    })
    
    it('returns the board', (done) => {
      makeBoard('cool', (urlToken: string) => {
        request(app).get('/api/boards/board_name/' + urlToken)
          .expect((res: Response) => {
            expect(res.body.name).to.eql('cool')
            expect(res.body.url_token).to.eql(urlToken)
          })
          .expect(200, done)
      })
    })
    
    it('returns 400 if board does not exist', (done) => {
      request(app).get('/api/boards/board_name/foo')
        .expect((res: Response) => {
          expect(res.text).to.eql('record not found')
        })
        .expect(400, done)
    })
  })
})