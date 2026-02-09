import { pearpassVaultClient } from '../instances'

/**
 * Joins a vault in read-only mode.
 * @param {Object} params
 * @param {string} params.vaultId - The vault ID
 * @param {string} params.key - The z32-encoded Autopass key
 * @param {string} params.encryptionKey - The z32-encoded encryption key
 * @returns {Promise<{vaultId: string, encryptionKey: string, accessLevel: 'read-only'}>}
 */
export const joinReadOnlyVault = async ({ vaultId, key, encryptionKey }) => {
  // Join the vault in read-only mode (this initializes the active vault instance)
  const result = await pearpassVaultClient.joinReadOnlyVault({
    vaultId,
    key,
    encryptionKey
  })

  // Get vault data and store reference locally
  const vault = await pearpassVaultClient.activeVaultGet('vault')
  await pearpassVaultClient.vaultsAdd(`vault/${vaultId}`, vault)

  return {
    vaultId,
    encryptionKey: result.encryptionKey,
    accessLevel: 'read-only'
  }
}
