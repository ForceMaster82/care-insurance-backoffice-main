import React from 'react'
import {NextPage} from 'next'
import Layout from '~templates/layouts/Layout'
import ExternalManagerModifyView from '~views/external-manager-modify'
import useExternalOrganizationList from '~hooks/external-organization/use-external-organization-list'
import {TOTAL_PAGE_SIZE} from '~constants/pagination'
import useExternalManagerDetail from '~hooks/external-manager/use-external-manager-detail'
import useExternalManagerModify from '~hooks/external-manager/use-external-manager-modify'

const ExternalManagerModifyPage: NextPage = () => {
  const detailResource = useExternalManagerDetail()

  const {formData, onSubmit, onCancel, isLoaded} =
    useExternalManagerModify(detailResource)

  const externalOrganizationListResource = useExternalOrganizationList({
    externalOrganizationType: 'AFFILIATED',
    pageSize: TOTAL_PAGE_SIZE,
  })

  const externalOrganizationListOptions =
    externalOrganizationListResource?.options || []

  return (
    <Layout pageCategory="ACCOUNT_MANAGEMENT" pageKey="EXTERNAL_MANAGER">
      <ExternalManagerModifyView
        externalOrganizationListOptions={externalOrganizationListOptions}
        formData={formData}
        isLoaded={isLoaded}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Layout>
  )
}

export default ExternalManagerModifyPage
