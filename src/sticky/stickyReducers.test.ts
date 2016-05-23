import { expect, sinon } from 'testHelpers/testHelper'
import { stickiesReducers } from 'sticky/stickyReducers'
import { createStickyAction, updateStickyAction, moveStickyToTopAction, removeStickyAction } from 'state/actions'

describe('stickyReducers', () => {
  describe('createStickyAction', () => {
    it('inserts a sticky', () => {
      const state = stickiesReducers(undefined, createStickyAction({x: 10, y: 20, body: 'i am sticky'}))
      expect(state.count()).to.eql(1)
      expect(state.toArray()[0].x).to.eql(10)
      expect(state.toArray()[0].y).to.eql(20)
      expect(state.toArray()[0].body).to.eql('i am sticky')
    })
  
    it('increments z index', () => {
      const state1 = stickiesReducers(undefined, createStickyAction({x: 10, y: 20, body: 'i am sticky'}))
      const state2 = stickiesReducers(state1, createStickyAction({x: 10, y: 20, body: 'i am sticky 2'}))
      expect(state2.toArray()[0].z).to.eql(1)
      expect(state2.toArray()[1].z).to.eql(2)
    })
  })
  
  describe('updateStickyAction', () => {
    it("modifies a sticky's position", () => {
      const state1 = stickiesReducers(undefined, createStickyAction({x: 10, y: 20, body: 'i am sticky'}))
      const uuid = state1.keySeq().first()
      const state2 = stickiesReducers(state1, updateStickyAction({ x: 1, y: 0, uuid}))
      expect(state2.get(uuid).x).to.eql(1)
      expect(state2.get(uuid).y).to.eql(0)
      expect(state2.get(uuid).body).to.eql('i am sticky')
    })
    
    it("modifies a sticky's hover state", () => {
      const state1 = stickiesReducers(undefined, createStickyAction({x: 10, y: 20, body: 'i am sticky'}))
      const uuid = state1.keySeq().first()
      const state2 = stickiesReducers(state1, updateStickyAction({hovered: true, uuid}))
      expect(state2.get(uuid).hovered).to.eql(true)
    })
  })
  
  describe('removeStickyAction', () => {
    it('removes only the target sticky', () => {
      let state = stickiesReducers(undefined, createStickyAction({x: 10, y: 20, body: 'i am sticky'}))
      const uuid = state.keySeq().first()
      state = stickiesReducers(state, createStickyAction({x: 10, y: 20, body: 'i am sticky 2'}))
      state = stickiesReducers(state, removeStickyAction({uuid}))
      expect(state.count()).to.eql(1)
    })
  })
  
  describe('moveStickyToTopAction', () => {
    it ('moves a sticky to the top', () => {
      let state = stickiesReducers(undefined, createStickyAction({x: 10, y: 20, body: 'i am sticky'}))
      const uuid = state.keySeq().first()
      state = stickiesReducers(state, createStickyAction({x: 10, y: 20, body: 'i am sticky 2'}))
      state = stickiesReducers(state, moveStickyToTopAction({uuid}))
      expect(state.get(uuid).z).to.eql(2)
    })
    
    it('demotes other stickies by z index of 1', () => {
      let state = stickiesReducers(undefined, createStickyAction({x: 10, y: 20, body: 'first'}))
      const uuid = state.keySeq().first()
      
      state = stickiesReducers(state, createStickyAction({x: 10, y: 20, body: 'second'}))
      state = stickiesReducers(state, createStickyAction({x: 10, y: 20, body: 'third'}))
      
      state = stickiesReducers(state, moveStickyToTopAction({uuid}))
      
      expect(state.toArray()[0].body).to.eql('first')
      expect(state.toArray()[0].z).to.eql(3)
      expect(state.toArray()[1].body).to.eql('second')
      expect(state.toArray()[1].z).to.eql(1)
      expect(state.toArray()[2].body).to.eql('third')
      expect(state.toArray()[2].z).to.eql(2)
    })
  })
})