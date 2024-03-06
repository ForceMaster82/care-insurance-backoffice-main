import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React from 'react'
import {EXTERNAL_ORGANIZATION_PATH} from '../../constants/route-paths'
import useLogin from '~hooks/login/use-login'
import AccountLoginView from '~views/account-login'

const LoginPage: NextPage = () => {
  const router = useRouter()

  const {formData, onSubmit, serverError} = useLogin({
    onSuccess: () => {
      router.push(EXTERNAL_ORGANIZATION_PATH)
    },
  })

  return (
    <AccountLoginView
      formData={formData}
      onSubmit={onSubmit}
      serverError={serverError}
    />
  )
}

export default LoginPage
