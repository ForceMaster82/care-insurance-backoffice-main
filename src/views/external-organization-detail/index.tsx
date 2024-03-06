import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import DetailInfoCard from './components/DetailInfoCard'
import SubtitleBox from '~components/SubtitleBox'
import ExternalOrganizationResource from '~models/dto/external-organization/Resource'
import CancelButton from '~components/Button/CancelButton'
import SubmitButton from '~components/Button/SubmitButton'

interface IExternalOrganizationDetailViewProps {
  onClickList: () => void
  onClickModify: (id: string) => void
  onDownloadBusinessLicenseFile: () => Promise<void>
  resource: ExternalOrganizationResource | null
}

const ExternalOrganizationDetailView = ({
  onClickList,
  onClickModify,
  onDownloadBusinessLicenseFile,
  resource,
}: IExternalOrganizationDetailViewProps): ReactElement | null => {
  if (!resource) {
    return null
  }

  return (
    <Box gap="sm">
      <SubtitleBox title="제휴사(협회) 상세" />
      <DetailInfoCard
        onDownloadBusinessLicenseFile={onDownloadBusinessLicenseFile}
        resource={resource}
      />
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
  )
}

export default ExternalOrganizationDetailView
