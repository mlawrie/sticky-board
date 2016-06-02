let mocks:{[id: string] : () => any} = {}

export const injectMock = <T>(factory: () => T, mock: () => T) => {
  mocks[factory.toString()] = mock
}
  
export const clearMocks = () => {
  mocks = {}
}

export const mockable = <T>(factory: () => T): T => {
  if (typeof mocks[factory.toString()] !== 'undefined') {
    return mocks[factory.toString()]()
  }
  return factory()
}