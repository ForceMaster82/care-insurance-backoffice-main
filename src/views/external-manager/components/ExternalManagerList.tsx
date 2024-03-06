import {Box, Link, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import ListContainer from '~components/List/ListContainer'
import ListItem from '~components/List/ListItem'
import {IUseSuspendReturnType} from '~hooks/use-suspend'
import {IPaginationInfo} from '~types'
import {IExternalManager, IExternalOrganization} from '~types/dto'
import {formatDate} from '~utils/date'
import {
  transformIndexToItemOrder,
  transformOrganizationIdToName,
} from '~utils/transform'

const GRID_TEMPLATE_COLUMNS =
  '80px 80px minmax(160px,1fr) minmax(200px,1fr) minmax(160px,1fr) 160px 120px'
const TABLE_TITLE_LIST = [
  '선택',
  '번호',
  '제휴사',
  '아이디',
  '담당자명',
  '최근 로그인 일시',
  '사용여부',
]

interface IExternalManagerListProps {
  externalOrganizationList: IExternalOrganization[]
  items: IExternalManager[]
  onClickDetail: (id: string) => void
  paginationInfo: IPaginationInfo
  suspendMethod: IUseSuspendReturnType
}

const ExternalManagerList = ({
  items,
  onClickDetail,
  paginationInfo,
  suspendMethod,
  externalOrganizationList,
}: IExternalManagerListProps): ReactElement => {
  const {getIsChecked, onCheckSuspend} = suspendMethod
  const isExternalManager = items.length > 0

  return (
    <ListContainer
      gridTemplate={GRID_TEMPLATE_COLUMNS}
      titleList={TABLE_TITLE_LIST}
    >
      {isExternalManager ? (
        items.map((item, index) => (
          <ListItem
            gridTemplate={GRID_TEMPLATE_COLUMNS}
            isSelected={getIsChecked(item.id)}
            key={`external-managers-item-${item.id}-${item.name}`}
            onSelect={(): void => onCheckSuspend(item.id, item.suspended)}
          >
            <Typography variant="body4">
              {transformIndexToItemOrder(paginationInfo, index)}
            </Typography>
            <Typography variant="body4">
              {transformOrganizationIdToName(
                externalOrganizationList,
                item.externalCaregivingOrganizationId,
              )}
            </Typography>
            <Link
              color="information"
              onClick={(): void => onClickDetail(item.id)}
            >
              {item.email}
            </Link>
            <Typography variant="body4">{item.name}</Typography>
            <Typography variant="body4">
              {formatDate(item.lastLoginDateTime)}
            </Typography>
            <Typography variant="body4">
              {item.suspended ? '사용안함' : '사용'}
            </Typography>
          </ListItem>
        ))
      ) : (
        <Box alignItems="center" backgroundColor="bgPrimary" py="xxl">
          <Typography variant="body4">
            등록된 제휴사 계정이 존재하지 않습니다.
          </Typography>
        </Box>
      )}
    </ListContainer>
  )
}

export default ExternalManagerList
