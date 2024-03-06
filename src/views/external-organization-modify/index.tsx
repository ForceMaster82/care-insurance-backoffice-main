import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import OrganizationModifyForm from './components/OrganizationModifyForm'
import SubtitleBox from '~components/SubtitleBox'
import {ExternalOrganizationData} from '~types/form'

interface IExternalOrganizationModifyViewProps {
  formData: ExternalOrganizationData
  isLoaded?: boolean
  onCancel?: () => void
  onSubmit: SubmitHandler<ExternalOrganizationData>
  onUploadFile: (file: File | null) => void
}

const ExternalOrganizationModifyView = ({
  onCancel,
  onSubmit,
  formData,
  onUploadFile,
  isLoaded,
}: IExternalOrganizationModifyViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox required title="제휴사(협회) 수정" />
      {isLoaded && (
        <OrganizationModifyForm
          formData={formData}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onUploadFile={onUploadFile}
        />
      )}
    </Box>
  )
}

export default ExternalOrganizationModifyView
