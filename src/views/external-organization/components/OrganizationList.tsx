import {Box, Link, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import ListContainer from '~components/List/ListContainer'
import ListItem from '~components/List/ListItem'
import {EXTERNAL_CAREGIVING_ORGANIZATION_TYPE} from '~constants/texts'
import {IPaginationInfo} from '~types'
import {IExternalOrganization} from '~types/dto'
import {transformIndexToItemOrder} from '~utils/transform'

const GRID_TEMPLATE_COLUMNS = '80px 120px minmax(320px,1fr)'
const TABLE_TITLE_LIST = ['번호', '구분', '업체명']

interface IOrganizationListProps {
  items: IExternalOrganization[]
  onClickOrganizationName: (organizationId: string) => void
  paginationInfo: IPaginationInfo
}

const OrganizationList = ({
  items,
  onClickOrganizationName,
  paginationInfo,
}: IOrganizationListProps): ReactElement => {
  const isOrganizationList = items.length > 0
  return (
    <ListContainer
      gridTemplate={GRID_TEMPLATE_COLUMNS}
      titleList={TABLE_TITLE_LIST}
    >
      {isOrganizationList ? (
        items.map((item, index) => (
          <ListItem
            gridTemplate={GRID_TEMPLATE_COLUMNS}
            key={`external-caregiving-organizations-item-${item.id}-${item.name}`}
          >
            <Typography variant="body4">
              {transformIndexToItemOrder(paginationInfo, index)}
            </Typography>
            <Typography variant="body4">
              {
                EXTERNAL_CAREGIVING_ORGANIZATION_TYPE[
                  item.externalCaregivingOrganizationType
                ]
              }
            </Typography>
            <Link
              color="information"
              onClick={(): void => onClickOrganizationName(item.id)}
            >
              {item.name}
            </Link>
          </ListItem>
        ))
      ) : (
        <Box alignItems="center" backgroundColor="bgPrimary" py="xxl">
          <Typography variant="body4">
            등록된 제휴사(협회)가 존재하지 않습니다.
          </Typography>
        </Box>
      )}
    </ListContainer>
  )
}

export default OrganizationList
