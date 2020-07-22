import { configureStore } from '@reduxjs/toolkit'

import taxReducer from './tax'
import queryReducer from './query'

const store = configureStore({
  reducer: {
    tax: taxReducer,
    query: queryReducer,
  },
})

export default store
