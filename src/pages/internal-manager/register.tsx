import {NextPage} from 'next'
import React from 'react'
import useInternalManagerRegister from '~hooks/internal-manager/use-internal-manager-register'
import Layout from '~templates/layouts/Layout'
import InternalManagerRegisterView from '~views/internal-manager-register'

const InternalManagerRegisterPage: NextPage = () => {
  const {formData, onSubmit, onCancel} = useInternalManagerRegister()

  return (
    <Layout pageCategory="ACCOUNT_MANAGEMENT" pageKey="INTERNAL_MANAGER">
      <InternalManagerRegisterView
        formData={formData}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Layout>
  )
}

export default InternalManagerRegisterPage
