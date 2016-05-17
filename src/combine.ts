import objectAssign = require('object-assign')

export default <T, U>(first: T, second: U) => objectAssign({}, first, second) as T & U