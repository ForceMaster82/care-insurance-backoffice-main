import {Box, Link, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import ListContainer from '~components/List/ListContainer'
import ListItem from '~components/List/ListItem'
import {COVERAGE_RENEWAL_TYPE} from '~constants/texts'
import {IPaginationInfo} from '~types'
import {ICoverage} from '~types/dto'
import {formatDate} from '~utils/date'
import {transformIndexToItemOrder} from '~utils/transform'

const GRID_TEMPLATE_COLUMNS = '80px 120px minmax(200px,1fr) 200px'
const TABLE_TITLE_LIST = ['번호', '구분', '가입담보명', '마지막 수정일자']

interface ICoverageListProps {
  items: ICoverage[]
  onClickDetail: (id: string) => void
  paginationInfo: IPaginationInfo
}

const CoverageList = ({
  items,
  onClickDetail,
  paginationInfo,
}: ICoverageListProps): ReactElement => {
  const isCoverage = items.length > 0
  return (
    <ListContainer
      gridTemplate={GRID_TEMPLATE_COLUMNS}
      titleList={TABLE_TITLE_LIST}
    >
      {isCoverage ? (
        items.map((item, index) => (
          <ListItem
            gridTemplate={GRID_TEMPLATE_COLUMNS}
            key={`coverage-item-${item.id}-${item.name}`}
          >
            <Typography variant="body4">
              {transformIndexToItemOrder(paginationInfo, index)}
            </Typography>
            <Typography variant="body4">
              {COVERAGE_RENEWAL_TYPE[item.renewalType]}
            </Typography>
            <Link
              color="information"
              onClick={(): void => onClickDetail(item.id)}
            >
              {item.name}
            </Link>
            <Typography variant="body4">
              {formatDate(item.lastModifiedDateTime)}
            </Typography>
          </ListItem>
        ))
      ) : (
        <Box alignItems="center" backgroundColor="bgPrimary" py="xxl">
          <Typography variant="body4">
            등록된 가입담보가 존재하지 않습니다.
          </Typography>
        </Box>
      )}
    </ListContainer>
  )
}

export default CoverageList
