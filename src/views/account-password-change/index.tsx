import {Box, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import PasswordChangeForm from './components/PasswordChangeForm'
import {IPasswordUpdateData} from '~types/form'

const PASSWORD_FORM_WIDTH = 360

interface IAccountPasswordChangeViewProps {
  onCancel?: () => void
  onSubmit: SubmitHandler<IPasswordUpdateData>
  passwordUpdateInput: IPasswordUpdateData
}

const AccountPasswordChangeView = ({
  onCancel,
  onSubmit,
  passwordUpdateInput,
}: IAccountPasswordChangeViewProps): ReactElement => {
  return (
    <Box
      alignItems="center"
      backgroundColor="bgPrimary"
      height="100vh"
      justifyContent="center"
    >
      <Box gap="xl" width={PASSWORD_FORM_WIDTH}>
        <Typography variant="heading6">
          변경할 비밀번호를 설정해 주세요.
        </Typography>
        <PasswordChangeForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          passwordUpdateInput={passwordUpdateInput}
        />
      </Box>
    </Box>
  )
}

export default AccountPasswordChangeView
