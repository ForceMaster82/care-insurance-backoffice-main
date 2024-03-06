import {Box, type IComboBoxItemData} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import ExternalManagerModifyForm from './components/ExternalManagerModifyForm'
import SubtitleBox from '~components/SubtitleBox'
import {ExternalManagerUpdateData} from '~types/form'

interface IExternalManagerModifyViewProps {
  externalOrganizationListOptions: IComboBoxItemData<string>[]
  formData: ExternalManagerUpdateData
  isLoaded?: boolean
  onCancel?: () => void
  onSubmit: SubmitHandler<ExternalManagerUpdateData>
}

const ExternalManagerModifyView = ({
  onCancel,
  onSubmit,
  formData,
  externalOrganizationListOptions,
  isLoaded,
}: IExternalManagerModifyViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox required title="제휴사 계정 수정" />
      {isLoaded && (
        <ExternalManagerModifyForm
          externalOrganizationListOptions={externalOrganizationListOptions}
          formData={formData}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </Box>
  )
}

export default ExternalManagerModifyView
