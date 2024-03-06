import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler} from 'react-hook-form'
import CoverageRegisterForm from './components/CoverageRegisterForm'
import SubtitleBox from '~components/SubtitleBox'
import {CoverageCreateData} from '~types/form'

interface ICoverageRegisterViewProps {
  formData: CoverageCreateData
  onCancel?: () => void
  onSubmit: SubmitHandler<CoverageCreateData>
}

const CoverageRegisterView = ({
  onCancel,
  onSubmit,
  formData,
}: ICoverageRegisterViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox required title="가입담보 등록" />
      <CoverageRegisterForm
        formData={formData}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

export default CoverageRegisterView
