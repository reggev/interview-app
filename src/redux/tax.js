import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const taxAPI = {
  async fetchTaxTable() {
    try {
      return await axios.get(process.env.REACT_APP_TAX_ENDPOINT)
    } catch (error) {
      // Of course returning a resolved promise with a RejectWithValue argument would be better
      return console.error(error)
    }
  },
}

export const fetchTax = createAsyncThunk('tax/fetch', async () => {
  const response = await taxAPI.fetchTaxTable()
  // Here too, error would have to be handled
  return response.data
})

const taxSlice = createSlice({
  name: 'tax',
  initialState: { table: [], loading: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchTax.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },

    [fetchTax.fulfilled]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        action.payload.forEach(step => state.table.push(step))
        state.currentRequestId = undefined
      }
    },

    [fetchTax.rejected]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
  },
})

const { reducer } = taxSlice
export default reducer
