import {Box, Button, ComboBox, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import ExternalManagerList from './components/ExternalManagerList'
import SearchBar from '~components/SearchBar'
import SubtitleBox from '~components/SubtitleBox'
import Pagination from '~components/Pagination'
import {managerSearchCategoryOptions} from '~constants/options'
import {SUB_TITLE_MAIN_COMBO_BOX_WIDTH} from '~constants'
import {IUseSuspendReturnType} from '~hooks/use-suspend'
import ExternalOrganizationListResource from '~models/dto/external-organization/ListResource'
import ExternalManagerListResource from '~models/dto/\bexternal-manager/ListResource'

interface IExternalManagerViewProps {
  category?: string
  externalManagerListResource: ExternalManagerListResource | null
  externalOrganizationResource: ExternalOrganizationListResource | null
  onChangeCategory: (value?: string) => void
  onChangeKeyword: (value: string) => void
  onChangeOrganization: (value?: string) => void
  onClickDetail: (id: string) => void
  onClickPage: (page: number) => void
  onClickRegister: () => void
  organizationId?: string
  suspendMethod: IUseSuspendReturnType
}

const ExternalManagerView = ({
  externalManagerListResource,
  onChangeKeyword,
  onClickDetail,
  onClickPage,
  onClickRegister,
  onChangeCategory,
  category,
  externalOrganizationResource,
  onChangeOrganization,
  organizationId,
  suspendMethod,
}: IExternalManagerViewProps): ReactElement => {
  const {onClickUpdateSuspend, isDisabledUpdate} = suspendMethod

  const externalOrganizationOptions = [
    {data: undefined, label: '제휴사 전체'},
    ...(externalOrganizationResource?.options || []),
  ]

  return (
    <Box gap="lg">
      <SubtitleBox>
        <Box alignItems="center" flex={1} flexDirection="row" gap="xs">
          <Typography variant="body3">구분</Typography>
          <Box width={SUB_TITLE_MAIN_COMBO_BOX_WIDTH}>
            <ComboBox<string | undefined>
              items={externalOrganizationOptions}
              onSelect={onChangeOrganization}
              value={organizationId}
            />
          </Box>
        </Box>
        <SearchBar
          category={category}
          categoryOptions={managerSearchCategoryOptions}
          onChangeCategory={onChangeCategory}
          onChangeKeyword={onChangeKeyword}
        />
      </SubtitleBox>
      {externalManagerListResource && (
        <Box gap="sm">
          <Box flexDirection="row" justifyContent="space-between">
            <Box
              alignItems="flex-end"
              flexDirection="row"
              gap="xxs"
              minWidth="max-content"
            >
              <Typography variant="body4">검색결과</Typography>
              <Typography variant="body3">{`${externalManagerListResource.paginationInfo.totalItemCount}건`}</Typography>
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
                제휴사 계정 등록
              </Button>
            </Box>
          </Box>
          <ExternalManagerList
            externalOrganizationList={externalOrganizationResource?.items || []}
            items={externalManagerListResource.items}
            onClickDetail={onClickDetail}
            paginationInfo={externalManagerListResource.paginationInfo}
            suspendMethod={suspendMethod}
          />
          {externalManagerListResource.items.length > 0 && (
            <Box alignItems="center">
              <Pagination
                currentPageNumber={
                  externalManagerListResource.paginationInfo.currentPageNumber
                }
                lastPageNumber={
                  externalManagerListResource.paginationInfo.lastPageNumber
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

export default ExternalManagerView
