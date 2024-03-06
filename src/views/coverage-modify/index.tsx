import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import CoverageModifyForm from './components/CoverageModifyForm'
import SubtitleBox from '~components/SubtitleBox'
import {CoverageUpdateData} from '~types/form'

interface ICoverageModifyViewProps {
  formData: CoverageUpdateData
  isLoaded?: boolean
  onCancel?: () => void
  onSubmit: SubmitHandler<CoverageUpdateData>
}

const CoverageModifyView = ({
  onCancel,
  onSubmit,
  formData,
  isLoaded,
}: ICoverageModifyViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox required title="가입담보 수정" />
      {isLoaded && (
        <CoverageModifyForm
          formData={formData}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </Box>
  )
}

export default CoverageModifyView
