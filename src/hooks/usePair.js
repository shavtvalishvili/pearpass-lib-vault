import { useState } from 'react'

import { MS_PER_SECOND } from 'pearpass-lib-constants'
import { useDispatch } from 'react-redux'

import { getVaultById } from '../actions/getVaultById'
import { cancelPairActiveVault as cancelPairActiveVaultApi } from '../api/cancelPairActiveVault'
import { initListener } from '../api/initListener'
import { pairActiveVault as pairActiveVaultApi } from '../api/pairActiveVault'
import { setAccessLevel } from '../slices/vaultSlice'
import { parseShareLink } from '../utils/parseShareLink'

/**
 * @returns {{
 *  pairActiveVault: (inviteCode: string) => Promise<{vaultId: string, accessLevel: 'edit' | 'read-only'}>
 *  cancelPairActiveVault: () => Promise<void>,
 *  isLoading: boolean
 *  }}
 */
export const usePair = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const pairActiveVault = async (inviteCode) => {
    setIsLoading(true)

    try {
      const parsed = parseShareLink(inviteCode)

      // Normal pairing flow for both edit and read-only
      const pairCode =
        parsed.accessLevel === 'read-only'
          ? `${parsed.vaultId}/${parsed.inviteCode}`
          : inviteCode

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Request timed out')),
          MS_PER_SECOND * 30
        )
      )

      const vaultId = await Promise.race([
        pairActiveVaultApi(pairCode),
        timeoutPromise
      ])

      dispatch(setAccessLevel(parsed.accessLevel))

      await initListener({
        vaultId,
        onUpdate: () => {
          dispatch(getVaultById({ vaultId }))
        }
      })

      setIsLoading(false)
      return { vaultId, accessLevel: parsed.accessLevel }
    } catch (error) {
      setIsLoading(false)
      if (error.message === 'Request timed out') {
        await cancelPairActiveVaultApi()
      }
      throw error
    }
  }

  const cancelPairActiveVault = async () => {
    setIsLoading(false)
    await cancelPairActiveVaultApi()
  }

  return { pairActiveVault, cancelPairActiveVault, isLoading }
}
