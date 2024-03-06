import {NextPage} from 'next'
import React from 'react'
import AccountPasswordChangeView from '~views/account-password-change'
import usePasswordChange from '~hooks/password-change/use-paswword-change'

const PasswordChangePage: NextPage = () => {
  const {formData, onSubmit, onCancel} = usePasswordChange()

  return (
    <AccountPasswordChangeView
      onCancel={onCancel}
      onSubmit={onSubmit}
      passwordUpdateInput={formData}
    />
  )
}
export default PasswordChangePage
