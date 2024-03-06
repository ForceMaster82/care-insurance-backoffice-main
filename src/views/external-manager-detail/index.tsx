import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import InfoCard from './components/InfoCard'
import ManageCard from './components/ManageCard'
import SubtitleBox from '~components/SubtitleBox'
import CancelButton from '~components/Button/CancelButton'
import SubmitButton from '~components/Button/SubmitButton'
import {ExternalManagerResource} from '~models/dto/\bexternal-manager/Resource'

interface IExternalManagerDetailViewProps {
  externalManagerResource: ExternalManagerResource | null
  onClickList: () => void
  onClickModify: (id: string) => void
  organizationName: string
}

const ExternalManagerDetailView = ({
  onClickList,
  onClickModify,
  organizationName,
  externalManagerResource,
}: IExternalManagerDetailViewProps): ReactElement => {
  return (
    <Box gap="sm">
      <SubtitleBox title="제휴사 계정 상세" />
      {externalManagerResource && (
        <Box gap="sm">
          <Box gap="xs">
            <InfoCard
              organizationName={organizationName}
              resource={externalManagerResource}
            />
            <ManageCard resource={externalManagerResource} />
          </Box>
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <CancelButton onClick={onClickList}>목록으로</CancelButton>
            <SubmitButton
              onClick={(): void => onClickModify(externalManagerResource.id)}
            >
              수정하기
            </SubmitButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ExternalManagerDetailView
