import { createSlice } from '@reduxjs/toolkit'

import { createInvite } from '../actions/createInvite'
import { createReadOnlyInvite } from '../actions/createReadOnlyInvite'
import { deleteInvite } from '../actions/deleteInvite'
import { resetState } from '../actions/resetState'
import { logger } from '../utils/logger'

const initialState = {
  isLoading: false,
  error: null,
  data: null,
  selectedAccessLevel: 'edit' // 'edit' | 'read-only' - for share modal selection
}

const setPending = (state) => {
  state.isLoading = true
  state.error = null
}

const setFulfilled = (state, { payload }) => {
  state.isLoading = false
  state.data = payload
}

const setRejected = (state, action) => {
  logger.error(action.error)
  state.isLoading = false
  state.error = action.error
}

export const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    setSelectedAccessLevel: (state, action) => {
      state.selectedAccessLevel = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvite.pending, setPending)
      .addCase(createInvite.fulfilled, setFulfilled)
      .addCase(createInvite.rejected, setRejected)
      .addCase(createReadOnlyInvite.pending, setPending)
      .addCase(createReadOnlyInvite.fulfilled, setFulfilled)
      .addCase(createReadOnlyInvite.rejected, setRejected)
      .addCase(deleteInvite.pending, setPending)
      .addCase(deleteInvite.fulfilled, setFulfilled)
      .addCase(deleteInvite.rejected, setRejected)
      .addCase(resetState.fulfilled, (state) => {
        Object.assign(state, initialState)
      })
  }
})

export const { setSelectedAccessLevel } = inviteSlice.actions

export default inviteSlice.reducer
