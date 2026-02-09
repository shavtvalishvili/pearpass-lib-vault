/**
 * Selects the access level of the current vault.
 * @param {Object} state - Redux state
 * @returns {'edit' | 'read-only'}
 */
export const selectVaultAccessLevel = (state) =>
  state.vault.accessLevel || 'edit'

/**
 * Selects whether the current vault is read-only.
 * @param {Object} state - Redux state
 * @returns {boolean}
 */
export const selectIsVaultReadOnly = (state) =>
  state.vault.accessLevel === 'read-only'

/**
 * Selects the selected access level for sharing (in invite slice).
 * @param {Object} state - Redux state
 * @returns {'edit' | 'read-only'}
 */
export const selectInviteSelectedAccessLevel = (state) =>
  state.invite.selectedAccessLevel || 'edit'
