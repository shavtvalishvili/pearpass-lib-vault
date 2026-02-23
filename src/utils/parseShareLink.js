/**
 * Parses a share link to extract vault ID and access information.
 *
 * Supported formats:
 * - Edit access: {vaultId}/{inviteCode}
 * - Read-only access: {vaultId}/ro/{inviteCode}
 *
 * @param {string} code - The share link/invite code
 * @returns {{
 *   vaultId: string,
 *   inviteCode: string,
 *   accessLevel: 'edit' | 'read-only',
 * }}
 */
export const parseShareLink = (code) => {
  if (!code || typeof code !== 'string') {
    throw new Error('Invalid share link: code is required')
  }

  const parts = code.split('/')

  // Edit access format: {vaultId}/{inviteCode}
  if (parts.length === 2) {
    const [vaultId, inviteCode] = parts

    if (!vaultId || !inviteCode) {
      throw new Error('Invalid share link format')
    }

    return {
      vaultId,
      inviteCode,
      accessLevel: 'edit'
    }
  }

  // Read-only access format: {vaultId}/ro/{inviteCode}
  if (parts.length === 3 && parts[1] === 'ro') {
    const [vaultId, , inviteCode] = parts

    if (!vaultId || !inviteCode) {
      throw new Error('Invalid read-only share link format')
    }

    return {
      vaultId,
      inviteCode,
      accessLevel: 'read-only'
    }
  }

  throw new Error('Invalid share link format')
}

/**
 * Checks if a share link is for read-only access.
 * @param {string} code - The share link/invite code
 * @returns {boolean}
 */
export const isReadOnlyShareLink = (code) => {
  try {
    const parsed = parseShareLink(code)
    return parsed.accessLevel === 'read-only'
  } catch {
    return false
  }
}
