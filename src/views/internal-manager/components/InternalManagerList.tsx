import {Box, Link, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import ListContainer from '~components/List/ListContainer'
import ListItem from '~components/List/ListItem'
import {IUseSuspendReturnType} from '~hooks/use-suspend'
import {IPaginationInfo} from '~types'
import {IInternalManager} from '~types/dto'
import {formatDate} from '~utils/date'
import {transformIndexToItemOrder} from '~utils/transform'

const GRID_TEMPLATE_COLUMNS = '80px 80px minmax(200px,1fr) 120px 160px 120px'

const TABLE_TITLE_LIST = [
  '선택',
  '번호',
  '아이디',
  '닉네임',
  '최근 로그인 일시',
  '사용여부',
]

interface IInternalManagerListProps {
  items: IInternalManager[]
  onClickDetail: (id: string) => void
  paginationInfo: IPaginationInfo
  suspendMethod: IUseSuspendReturnType
}

const InternalManagerList = ({
  items,
  onClickDetail,
  paginationInfo,
  suspendMethod,
}: IInternalManagerListProps): ReactElement => {
  const {getIsChecked, onCheckSuspend} = suspendMethod
  const isInternalManager = items.length > 0

  return (
    <ListContainer
      gridTemplate={GRID_TEMPLATE_COLUMNS}
      titleList={TABLE_TITLE_LIST}
    >
      {isInternalManager ? (
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
            <Link
              color="information"
              onClick={(): void => onClickDetail(item.id)}
            >
              {item.email}
            </Link>
            <Typography variant="body4">{item.nickname}</Typography>
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
            등록된 관리자 계정이 존재하지 않습니다.
          </Typography>
        </Box>
      )}
    </ListContainer>
  )
}

export default InternalManagerList
