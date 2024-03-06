import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import InternalManagerRegisterForm from './components/InternalManagerRegisterForm'
import SubtitleBox from '~components/SubtitleBox'
import {IInternalManagerCreate} from '~types/dto'

interface IInternalManagerRegisterViewProps {
  formData: IInternalManagerCreate
  onCancel?: () => void
  onSubmit: SubmitHandler<IInternalManagerCreate>
}

const InternalManagerRegisterView = ({
  onCancel,
  onSubmit,
  formData,
}: IInternalManagerRegisterViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox required title="관리자 계정 등록" />
      <InternalManagerRegisterForm
        formData={formData}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

export default InternalManagerRegisterView
