/// <reference path="../../typings/main/ambient/mocha/index.d.ts" />
import { stickyCollection } from '../stickies/sticky'
import { expect } from '../testHelper'

describe('stickyCollection', () => {
  describe('insert()', () => {
    it('requires uuids are globally unique', (done) => {
      stickyCollection.insert({x: 1, y: 1, uuid: 'foo', body: 'bar', board_id: 1}).then(() => {
        stickyCollection.insert({x: 1, y: 1, uuid: 'foo', body: 'bar', board_id: 1}).catch((error) => {
          expect(error.toString()).to.contain('violates unique constraint')
          done()        
        })
      })
    })
    
    it('requires x attribute', (done) => {
      stickyCollection.insert(<any>{y: 1, uuid: 'foo', body: 'bar', board_id: 1}).catch((error) => {
        expect(error.toString()).to.contain('violates not-null constraint')
        done()        
      })
    })
    
    it('rejects wrong schema', (done) => {
      stickyCollection.insert(<any>{x: 1, y: 'foo', uuid: 'foo', body: 'bar', board_id: 1}).catch((error) => {
        expect(error.toString()).to.contain('nvalid input syntax for integer')
        done()        
      })
    })
  })
})