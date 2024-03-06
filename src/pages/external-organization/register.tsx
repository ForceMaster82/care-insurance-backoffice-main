import {NextPage} from 'next'
import React from 'react'
import useBusinessLicenseFile from '~hooks/external-organization/use-business-license-file'
import useExternalOrganizationRegister from '~hooks/external-organization/use-external-organization-register'
import Layout from '~templates/layouts/Layout'
import OrganizationRegisterView from '~views/external-organization-register'

const ExternalOrganizationRegisterPage: NextPage = () => {
  const {onUploadFile, uploadFileMutation, uploadedFile} =
    useBusinessLicenseFile()
  const {formData, onSubmit, onCancel} = useExternalOrganizationRegister(
    uploadedFile,
    uploadFileMutation,
  )

  return (
    <Layout pageCategory="MASTER_DATA" pageKey="EXTERNAL_ORGANIZATION">
      <OrganizationRegisterView
        formData={formData}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onUploadFile={onUploadFile}
        uploadedFile={uploadedFile}
      />
    </Layout>
  )
}

export default ExternalOrganizationRegisterPage
