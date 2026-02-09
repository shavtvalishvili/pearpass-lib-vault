import { createAsyncThunk } from '@reduxjs/toolkit'
import { Validator } from 'pear-apps-utils-validator'

import { createReadOnlyInvite as createReadOnlyInviteApi } from '../api/createReadOnlyInvite'

const inviteSchema = Validator.object({
  publicKey: Validator.string().required(),
  accessLevel: Validator.string().required()
})

export const createReadOnlyInvite = createAsyncThunk(
  'vault/createReadOnlyInvite',
  async () => {
    // Create read-only share link
    const publicKey = await createReadOnlyInviteApi()

    const invite = {
      publicKey,
      accessLevel: 'read-only'
    }

    const errors = inviteSchema.validate(invite)

    if (errors) {
      throw new Error(`Invalid invite data: ${JSON.stringify(errors, null, 2)}`)
    }

    return invite
  }
)
