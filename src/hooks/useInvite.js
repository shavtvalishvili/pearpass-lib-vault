import { useDispatch, useSelector } from 'react-redux'

import { createInvite as createInviteAction } from '../actions/createInvite'
import { createReadOnlyInvite as createReadOnlyInviteAction } from '../actions/createReadOnlyInvite'
import { deleteInvite as deleteInviteAction } from '../actions/deleteInvite'
import { selectInvite } from '../selectors/selectInvite'
import { selectInviteSelectedAccessLevel } from '../selectors/selectVaultAccess'
import { setSelectedAccessLevel as setSelectedAccessLevelAction } from '../slices/inviteSlice'

/**
 * @returns {{
 *  isLoading: boolean
 *  data: any
 *  createInvite: () => Promise<void>
 *  createReadOnlyInvite: () => Promise<void>
 *  deleteInvite: () => Promise<void>
 *  selectedAccessLevel: 'edit' | 'read-only'
 *  setSelectedAccessLevel: (level: 'edit' | 'read-only') => void
 * }}
 */
export const useInvite = () => {
  const dispatch = useDispatch()
  const { isLoading, data } = useSelector(selectInvite)
  const selectedAccessLevel = useSelector(selectInviteSelectedAccessLevel)

  const handleAction = async (action) => dispatch(action())

  return {
    isLoading,
    data,
    createInvite: () => handleAction(createInviteAction),
    createReadOnlyInvite: () => handleAction(createReadOnlyInviteAction),
    deleteInvite: () => handleAction(deleteInviteAction),
    selectedAccessLevel,
    setSelectedAccessLevel: (level) =>
      dispatch(setSelectedAccessLevelAction(level))
  }
}
