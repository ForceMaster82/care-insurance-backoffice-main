import {NextPage} from 'next'
import React from 'react'
import {TOTAL_PAGE_SIZE} from '~constants/pagination'
import useExternalManagerRegister from '~hooks/external-manager/use-external-manager-register'
import useExternalOrganizationList from '~hooks/external-organization/use-external-organization-list'
import Layout from '~templates/layouts/Layout'
import ExternalManagerRegisterView from '~views/external-manager-register'

const ExternalManagerRegisterPage: NextPage = () => {
  const {formData, onSubmit, onCancel} = useExternalManagerRegister()
  const externalOrganizationListResource = useExternalOrganizationList({
    externalOrganizationType: 'AFFILIATED',
    pageSize: TOTAL_PAGE_SIZE,
  })

  const externalOrganizationListOptions =
    externalOrganizationListResource?.options || []

  return (
    <Layout pageCategory="ACCOUNT_MANAGEMENT" pageKey="EXTERNAL_MANAGER">
      <ExternalManagerRegisterView
        externalOrganizationListOptions={externalOrganizationListOptions}
        formData={formData}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Layout>
  )
}

export default ExternalManagerRegisterPage
