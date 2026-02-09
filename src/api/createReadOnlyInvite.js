import { pearpassVaultClient } from '../instances'

/**
 * Creates a read-only share link for the active vault.
 * @returns {Promise<string>} The share link
 */
export const createReadOnlyInvite = async () =>
  pearpassVaultClient.activeVaultCreateReadOnlyShare()
