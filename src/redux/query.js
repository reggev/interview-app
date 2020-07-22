import { createSlice } from '@reduxjs/toolkit'

const querySlice = createSlice({
  name: 'query',
  initialState: { salary: null, tax: null },
  reducers: {
    calculate: (state, { payload }) => {
      state.salary = payload
    },
    show: (state, { payload }) => {
      state.tax = payload
    },
  },
})

const { actions, reducer } = querySlice

export default reducer
export const { calculate, show } = actions
