import {Box, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import LoginForm from './components/LoginForm'
import {LoginData} from '~types/form'
import {ServerErrorFormat} from '~types/dto'

const LOGIN_FORM_WIDTH = 360

interface IAccountLoginViewProps {
  formData: LoginData
  onSubmit: SubmitHandler<LoginData>
  serverError?: ServerErrorFormat
}

const AccountLoginView = ({
  onSubmit,
  formData,
  serverError,
}: IAccountLoginViewProps): ReactElement => {
  return (
    <Box
      alignItems="center"
      backgroundColor="bgPrimary"
      height="100vh"
      justifyContent="center"
    >
      <Box gap="xl" width={LOGIN_FORM_WIDTH}>
        <Box alignItems="center">
          <Typography variant="heading1">CAREDOC</Typography>
          <Typography variant="subtitle2">Care-Insurance 백오피스</Typography>
        </Box>
        <LoginForm
          formData={formData}
          onSubmit={onSubmit}
          serverError={serverError}
        />
      </Box>
    </Box>
  )
}

export default AccountLoginView
