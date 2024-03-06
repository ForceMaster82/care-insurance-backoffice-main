import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import DetailInfoCard from './components/DetailInfoCard'
import ChargeTable from './components/ChargeTable'
import SubtitleBox from '~components/SubtitleBox'
import CancelButton from '~components/Button/CancelButton'
import SubmitButton from '~components/Button/SubmitButton'
import CoverageResource from '~models/dto/coverage/Resource'

interface ICoverageDetailViewProps {
  onClickList: () => void
  onClickModify: (id: string) => void
  resource: CoverageResource | null
}

const CoverageDetailView = ({
  onClickList,
  onClickModify,
  resource,
}: ICoverageDetailViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox title="가입담보 상세" />
      {resource && (
        <Box gap="sm">
          <DetailInfoCard resource={resource} />
          <ChargeTable items={resource.annualCoveredCaregivingCharges} />
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <CancelButton onClick={onClickList}>목록으로</CancelButton>
            <SubmitButton onClick={(): void => onClickModify(resource.id)}>
              수정하기
            </SubmitButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CoverageDetailView
