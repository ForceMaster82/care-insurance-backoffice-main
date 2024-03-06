import {Box, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {Control, useWatch} from 'react-hook-form'
import FormattingInput from '~components/Input/FormattingInput'
import ListContainer from '~components/List/ListContainer'
import ListItem from '~components/List/ListItem'
import {coverageUpdateConstraints} from '~constraints/coverage'
import {CoverageUpdateData} from '~types/form'
import {formatAmountWithComma} from '~utils/formatter'

const GRID_TEMPLATE_COLUMNS = 'minmax(200px,1fr) minmax(200px,1fr)'
const MAIN_TABLE_TITLE_LIST = ['기준연도', '일일 간병비']
const SUB_TABLE_TITLE_LIST = ['적용연도', '일일 간병비']

interface IChargeTableProps {
  control: Control<CoverageUpdateData>
}

const ChargeTable = ({control}: IChargeTableProps): ReactElement => {
  const fieldValues = useWatch({control})
  const {baseYearCharge, applicationYearCharges} = fieldValues
  return (
    <Box gap="xs">
      <ListContainer
        gridTemplate={GRID_TEMPLATE_COLUMNS}
        isDividingLine
        tableBorderColor="borderTertiary"
        tableRowColor="borderSecondary"
        titleList={MAIN_TABLE_TITLE_LIST}
      >
        <ListItem
          gridTemplate={GRID_TEMPLATE_COLUMNS}
          isDividingLine
          tableBorderColor="borderTertiary"
        >
          <Typography variant="body4">
            {`${baseYearCharge?.targetAccidentYear}년`}
          </Typography>
          <Box alignItems="center" flexDirection="row" gap="xxs" width="100%">
            <FormattingInput
              constraints={coverageUpdateConstraints}
              control={control}
              defaultValue="0"
              fieldName="baseYearCharge.caregivingCharge"
              formatter={formatAmountWithComma}
              style={{width: '100%'}}
            />
            <Typography>원</Typography>
          </Box>
        </ListItem>
      </ListContainer>
      <ListContainer
        gridTemplate={GRID_TEMPLATE_COLUMNS}
        isDividingLine
        tableBorderColor="borderTertiary"
        tableRowColor="borderSecondary"
        titleList={SUB_TABLE_TITLE_LIST}
      >
        {applicationYearCharges?.map((item, index) => (
          <ListItem
            gridTemplate={GRID_TEMPLATE_COLUMNS}
            isDividingLine
            key={`coverage-application-year-charge-table-item-${item.targetAccidentYear}-${index}`}
            tableBorderColor="borderTertiary"
          >
            <Typography variant="body4">
              {`${item.targetAccidentYear}년`}
            </Typography>
            <Box alignItems="center" flexDirection="row" gap="xxs" width="100%">
              <FormattingInput
                constraints={coverageUpdateConstraints}
                control={control}
                defaultValue="0"
                fieldName={`applicationYearCharges.${index}.caregivingCharge`}
                formatter={formatAmountWithComma}
                style={{width: '100%'}}
              />
              <Typography>원</Typography>
            </Box>
          </ListItem>
        ))}
      </ListContainer>
    </Box>
  )
}

export default ChargeTable
