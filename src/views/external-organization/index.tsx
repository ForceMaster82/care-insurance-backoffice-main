import {Box, Button, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import OrganizationList from './components/OrganizationList'
import SearchBar from '~components/SearchBar'
import SubtitleBox from '~components/SubtitleBox'
import Pagination from '~components/Pagination'
import ExternalOrganizationListResource from '~models/dto/external-organization/ListResource'

interface IExternalOrganizationViewProps {
  onChangeKeyword: (value: string) => void
  onClickOrganizationName: (organizationId: string) => void
  onClickPage: (page: number) => void
  onClickRegister: () => void
  resource: ExternalOrganizationListResource | null
}

const ExternalOrganizationView = ({
  onChangeKeyword,
  onClickOrganizationName,
  onClickPage,
  onClickRegister,
  resource,
}: IExternalOrganizationViewProps): ReactElement => {
  return (
    <Box gap="lg">
      <SubtitleBox>
        <SearchBar onChangeKeyword={onChangeKeyword} placeholder="업체명" />
      </SubtitleBox>
      {resource && (
        <Box gap="sm">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            minWidth="max-content"
          >
            <Box alignItems="flex-end" flexDirection="row" gap="xxs">
              <Typography variant="body4">검색결과</Typography>
              <Typography variant="body3">{`${resource.paginationInfo.totalItemCount}건`}</Typography>
            </Box>
            <Button color="primary" onClick={onClickRegister}>
              제휴사(협회) 등록
            </Button>
          </Box>
          <OrganizationList
            items={resource.items}
            onClickOrganizationName={onClickOrganizationName}
            paginationInfo={resource.paginationInfo}
          />
          {resource.items.length > 0 && (
            <Box alignItems="center">
              <Pagination
                currentPageNumber={resource.paginationInfo.currentPageNumber}
                lastPageNumber={resource.paginationInfo.lastPageNumber}
                onClick={onClickPage}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default ExternalOrganizationView
