import { useSelector } from 'react-redux'

import {
  selectIsVaultReadOnly,
  selectVaultAccessLevel
} from '../selectors/selectVaultAccess'

/**
 * Hook to check vault access permissions.
 * @returns {{
 *  accessLevel: 'edit' | 'read-only'
 *  isReadOnly: boolean
 *  canEdit: boolean
 *  canCreate: boolean
 *  canDelete: boolean
 * }}
 */
export const useVaultAccess = () => {
  const accessLevel = useSelector(selectVaultAccessLevel)
  const isReadOnly = useSelector(selectIsVaultReadOnly)

  return {
    accessLevel,
    isReadOnly,
    canEdit: !isReadOnly,
    canCreate: !isReadOnly,
    canDelete: !isReadOnly
  }
}
