/// <reference path="../typings/main/ambient/mocha/index.d.ts" />
import { request, Response, expect } from '../testHelper'
import { app } from '../app'
import * as express from 'express'

describe('boardRouter', () => {
  it('creates a board', (done) => {
    request(app).post('/boards')
      .send({name: 'board name'})
      .expect('Content-Type', /json/)
      .expect((res: Response) => {
        expect(res.body.name).to.eql('board name')
        expect(typeof res.body.url_token).to.eql('string')
      })
      .expect(200, done)
  })
  
  it('throws an error if name is not provided', (done) => {
    request(app).post('/boards').expect(422, done)
  })
  
  it('returns a unique url_token', (done) => {
    let firstToken:string
    const agent = request(app)
    agent.post('/boards').send({name: 'board name'})
      .expect(200)
      .expect((res: Response) => {
        firstToken = res.body.url_token
    }).end(() => {
      request(app).post('/boards').send({name: 'board name'})
        .expect((res2: Response) => {
          const secondToken = res2.body.url_token
          expect(firstToken).to.not.eql(secondToken) 
        }).end(done)
    })
  })
})