import { generateUniqueId } from 'pear-apps-utils-generate-unique-id'

import { validateAndPrepareDevice } from './validateAndPrepareDevice'

/**
 * @param {{
 *  data: object,
 * }} payload
 * @param {string} vaultId
 * @param {'edit' | 'read-only'} accessLevel - Access level for the device, defaults to 'edit'
 * @returns {Object}
 */
export const addDeviceFactory = (payload, vaultId, accessLevel = 'edit') => {
  if (!payload || !vaultId) {
    throw new Error('Payload and vaultId are required')
  }

  const device = {
    id: generateUniqueId(),
    vaultId: vaultId,
    name: payload,
    createdAt: Date.now(),
    accessLevel: accessLevel
  }

  return validateAndPrepareDevice(device)
}
