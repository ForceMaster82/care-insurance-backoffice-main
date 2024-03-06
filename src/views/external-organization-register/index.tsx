import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import OrganizationRegisterForm from './components/OrganizationRegisterForm'
import SubtitleBox from '~components/SubtitleBox'
import {ExternalOrganizationData} from '~types/form'

interface IExternalOrganizationRegisterViewProps {
  formData: ExternalOrganizationData
  onCancel?: () => void
  onSubmit: SubmitHandler<ExternalOrganizationData>
  onUploadFile: (file: File | null) => void
  uploadedFile: File | null
}

const ExternalOrganizationRegisterView = ({
  onCancel,
  onSubmit,
  formData,
  onUploadFile,
  uploadedFile,
}: IExternalOrganizationRegisterViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox required title="제휴사(협회) 등록" />
      <OrganizationRegisterForm
        formData={formData}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onUploadFile={onUploadFile}
        uploadedFile={uploadedFile}
      />
    </Box>
  )
}

export default ExternalOrganizationRegisterView
