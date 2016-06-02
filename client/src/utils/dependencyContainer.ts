let mockDependencies:{[id: string] : () => any} = {}

export const mock = <T>(factory: () => T, mock: () => T) => {
  mockDependencies[factory.toString()] = mock
}
  
export const clearMocks = () => {
  mockDependencies = {}
}

export const testable = <T>(factory: () => T): T => {
  if (typeof this.mockDependencies[factory.toString()] !== 'undefined') {
    return this.mockDependencies[factory.toString()]()
  }
  return factory()
} 
