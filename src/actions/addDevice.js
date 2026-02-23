import { createAsyncThunk } from '@reduxjs/toolkit'

import { addDevice as addDeviceApi } from '../api/addDevice'
import { addDeviceFactory } from '../utils/addDeviceFactory'
import { logger } from '../utils/logger'

export const addDevice = createAsyncThunk(
  'vault/addDevice',
  async (payload, { getState }) => {
    const name = typeof payload === 'string' ? payload : payload.name
    const accessLevel =
      typeof payload === 'string' ? undefined : payload.accessLevel

    const state = getState()
    const vaultState = state.vault
    const vaultId = vaultState.data.id
    const existingDevices = vaultState.data?.devices ?? []

    const existingDevice = existingDevices.find(
      (device) => device.name === name
    )

    if (existingDevice) {
      logger.log('Device already added to vault')
      return existingDevice
    }

    const newDevice = addDeviceFactory(name, vaultId, accessLevel)

    await addDeviceApi(newDevice)

    return newDevice
  }
)
