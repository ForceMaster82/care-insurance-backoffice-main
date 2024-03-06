import {Box, Button, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import InternalManagerList from './components/InternalManagerList'
import SearchBar from '~components/SearchBar'
import SubtitleBox from '~components/SubtitleBox'
import Pagination from '~components/Pagination'
import {IUseSuspendReturnType} from '~hooks/use-suspend'
import {managerSearchCategoryOptions} from '~constants/options'
import InternalManagerListResource from '~models/dto/internal-manager/ListResource'

interface IInternalManagerViewProps {
  category?: string
  internalManagerListResource: InternalManagerListResource | null
  onChangeCategory: (value?: string) => void
  onChangeKeyword: (value: string) => void
  onClickDetail: (id: string) => void
  onClickPage: (page: number) => void
  onClickRegister: () => void
  suspendMethod: IUseSuspendReturnType
}

const InternalManagerView = ({
  internalManagerListResource,
  onChangeKeyword,
  onClickDetail,
  onClickPage,
  onClickRegister,
  onChangeCategory,
  suspendMethod,
  category,
}: IInternalManagerViewProps): ReactElement => {
  const {onClickUpdateSuspend, isDisabledUpdate} = suspendMethod

  return (
    <Box gap="lg">
      <SubtitleBox>
        <SearchBar
          category={category}
          categoryOptions={managerSearchCategoryOptions}
          onChangeCategory={onChangeCategory}
          onChangeKeyword={onChangeKeyword}
        />
      </SubtitleBox>
      {internalManagerListResource && (
        <Box gap="sm">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            minWidth="max-content"
          >
            <Box alignItems="flex-end" flexDirection="row" gap="xxs">
              <Typography variant="body4">검색결과</Typography>
              <Typography variant="body3">{`${internalManagerListResource.paginationInfo.totalItemCount}건`}</Typography>
            </Box>
            <Box flexDirection="row" gap="xs" minWidth="max-content">
              <Button
                color="primary"
                disabled={isDisabledUpdate}
                onClick={onClickUpdateSuspend}
                variant="secondary"
              >
                사용여부 변경
              </Button>
              <Button color="primary" onClick={onClickRegister}>
                관리자 계정 등록
              </Button>
            </Box>
          </Box>
          <InternalManagerList
            items={internalManagerListResource.items}
            onClickDetail={onClickDetail}
            paginationInfo={internalManagerListResource.paginationInfo}
            suspendMethod={suspendMethod}
          />
          {internalManagerListResource.items.length > 0 && (
            <Box alignItems="center">
              <Pagination
                currentPageNumber={
                  internalManagerListResource.paginationInfo.currentPageNumber
                }
                lastPageNumber={
                  internalManagerListResource.paginationInfo.lastPageNumber
                }
                onClick={onClickPage}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default InternalManagerView
