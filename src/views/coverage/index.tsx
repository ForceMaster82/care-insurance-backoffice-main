import {Box, Button, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import CoverageList from './components/CoverageList'
import SearchBar from '~components/SearchBar'
import SubtitleBox from '~components/SubtitleBox'
import Pagination from '~components/Pagination'
import CoverageListResource from '~models/dto/coverage/ListResource'

interface ICoverageViewProps {
  onChangeKeyword: (value: string) => void
  onClickDetail: (id: string) => void
  onClickPage: (page: number) => void
  onClickRegister: () => void
  resource: CoverageListResource | null
}

const CoverageView = ({
  resource,
  onChangeKeyword,
  onClickDetail,
  onClickPage,
  onClickRegister,
}: ICoverageViewProps): ReactElement => {
  return (
    <Box gap="lg">
      <SubtitleBox>
        <SearchBar onChangeKeyword={onChangeKeyword} placeholder="가입담보명" />
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
              10년형 담보 등록
            </Button>
          </Box>
          <CoverageList
            items={resource.items}
            onClickDetail={onClickDetail}
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

export default CoverageView
