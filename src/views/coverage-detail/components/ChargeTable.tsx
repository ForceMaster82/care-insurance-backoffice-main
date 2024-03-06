import {Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import ListContainer from '~components/List/ListContainer'
import ListItem from '~components/List/ListItem'
import {AnnualCoveredCaregivingCharge} from '~types/dto'
import {formatAmountWithComma} from '~utils/formatter'

const GRID_TEMPLATE_COLUMNS = '80px minmax(200px,1fr) minmax(200px,1fr)'
const TABLE_TITLE_LIST = ['번호', '적용연도', '일일 간병비']

interface IChargeTableProps {
  items: AnnualCoveredCaregivingCharge[]
}

const ChargeTable = ({items}: IChargeTableProps): ReactElement => {
  const validItems = items.filter((chargeInfo) => chargeInfo.caregivingCharge)

  return (
    <ListContainer
      gridTemplate={GRID_TEMPLATE_COLUMNS}
      isDividingLine
      tableBorderColor="borderTertiary"
      tableRowColor="borderSecondary"
      titleList={TABLE_TITLE_LIST}
    >
      {validItems.map((item, index) => (
        <ListItem
          gridTemplate={GRID_TEMPLATE_COLUMNS}
          isDividingLine
          key={`coverage-charge-table-item-${item.caregivingCharge}-${item.targetAccidentYear}-${index}`}
          tableBorderColor="borderTertiary"
        >
          <Typography variant="body4">{validItems.length - index}</Typography>
          <Typography variant="body4">
            {`${item.targetAccidentYear}년`}
          </Typography>

          <Typography variant="body4">
            {formatAmountWithComma(item.caregivingCharge.toString())}
          </Typography>
        </ListItem>
      ))}
    </ListContainer>
  )
}

export default ChargeTable
