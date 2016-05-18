import { getState, State, subscribeToState } from 'state/reduxStore'
import { Component } from 'react'
const lodash = require('lodash')

const hijackComponentWillUnmount = (component: any, callback: () => void) => {
  const componentWillUnmount = component.componentWillUnmount
  component.componentWillUnmount = () => {
    callback()
    if (componentWillUnmount) {
      componentWillUnmount.apply(component);
    }
  }
}

export const subscribe = <T>(mapState: (s:State) => T, component: Component<any, T>) => {
  let oldState = mapState(getState())
  let wasUnsubscribed = false
  
  const unsubscribe = subscribeToState(() => {
    if (wasUnsubscribed) {
      return;
    }
    const newState = mapState(getState())
    if (!lodash.eq(oldState, newState)) {
      component.setState(newState)
    }

    oldState = newState
  });
  
  hijackComponentWillUnmount(component, () => {
    wasUnsubscribed = true
    unsubscribe()
  }) 
  
  component.state = oldState
}