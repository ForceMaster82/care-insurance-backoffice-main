import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import InfoCard from './components/InfoCard'
import ManageCard from './components/ManageCard'
import SubtitleBox from '~components/SubtitleBox'
import CancelButton from '~components/Button/CancelButton'
import SubmitButton from '~components/Button/SubmitButton'
import InternalManagerResource from '~models/dto/internal-manager/Resource'

interface IInternalManagerDetailViewProps {
  onClickList: () => void
  onClickModify: (id: string) => void
  resource: InternalManagerResource | null
}

const InternalManagerDetailView = ({
  onClickList,
  onClickModify,
  resource,
}: IInternalManagerDetailViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox title="관리자 계정 상세" />
      {resource && (
        <Box gap="sm">
          <Box gap="xs">
            <InfoCard resource={resource} />
            <ManageCard resource={resource} />
          </Box>
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

export default InternalManagerDetailView
