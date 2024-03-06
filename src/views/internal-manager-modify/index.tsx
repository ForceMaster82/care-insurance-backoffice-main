import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import InternalManagerModifyForm from './components/InternalManagerModifyForm'
import SubtitleBox from '~components/SubtitleBox'
import {InternalManagerUpdateData} from '~types/form'

interface IInternalManagerModifyViewProps {
  formData: InternalManagerUpdateData
  isLoaded?: boolean
  onCancel?: () => void
  onSubmit: SubmitHandler<InternalManagerUpdateData>
}

const InternalManagerModifyView = ({
  onCancel,
  onSubmit,
  formData,
  isLoaded,
}: IInternalManagerModifyViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox required title="관리자 계정 수정" />
      {isLoaded && (
        <InternalManagerModifyForm
          formData={formData}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </Box>
  )
}

export default InternalManagerModifyView
