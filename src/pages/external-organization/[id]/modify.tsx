import React from 'react'
import {NextPage} from 'next'
import Layout from '~templates/layouts/Layout'
import ExternalOrganizationModifyView from '~views/external-organization-modify'
import useExternalOrganizationDetail from '~hooks/external-organization/use-external-organization-detail'
import useBusinessLicenseFile from '~hooks/external-organization/use-business-license-file'
import useExternalOrganizationModify from '~hooks/external-organization/use-external-organization-modify'

const ExternalOrganizationModifyPage: NextPage = () => {
  const {onUploadFile, uploadFileMutation, uploadedFile} =
    useBusinessLicenseFile()

  const detailResource = useExternalOrganizationDetail()
  const {formData, onSubmit, onCancel, isLoaded} =
    useExternalOrganizationModify(
      detailResource,
      uploadedFile,
      uploadFileMutation,
    )

  return (
    <Layout pageCategory="MASTER_DATA" pageKey="EXTERNAL_ORGANIZATION">
      <ExternalOrganizationModifyView
        formData={formData}
        isLoaded={isLoaded}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onUploadFile={onUploadFile}
      />
    </Layout>
  )
}

export default ExternalOrganizationModifyPage
