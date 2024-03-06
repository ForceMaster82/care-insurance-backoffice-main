import {Box, type IComboBoxItemData} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import ExternalManagerRegisterForm from './components/ExternalManagerRegisterForm'
import SubtitleBox from '~components/SubtitleBox'
import {ExternalManagerCreateData} from '~types/form'

interface IExternalManagerRegisterViewProps {
  externalOrganizationListOptions: IComboBoxItemData<string>[]
  formData: ExternalManagerCreateData
  onCancel?: () => void
  onSubmit: SubmitHandler<ExternalManagerCreateData>
}

const ExternalManagerRegisterView = ({
  onCancel,
  onSubmit,
  formData,
  externalOrganizationListOptions,
}: IExternalManagerRegisterViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox required title="제휴사 계정 등록" />
      <ExternalManagerRegisterForm
        externalOrganizationListOptions={externalOrganizationListOptions}
        formData={formData}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

export default ExternalManagerRegisterView
