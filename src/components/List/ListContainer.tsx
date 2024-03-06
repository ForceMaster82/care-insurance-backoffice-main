import {Box, Checkbox, Typography} from '@caredoc/ui-web'
import {CustomColorKey} from '@caredoc/ui-master'
import React, {PropsWithChildren, ReactElement} from 'react'
import GridTableRow from './GridTableRow'
import ListCell from './ListCell'

const LIST_TITLE_ROW_HEIGHT = 58

interface IListContainerProps {
  gridTemplate: string
  isDividingLine?: boolean
  isSelectedBatch?: boolean
  onSelectBatch?: () => void
  tableBorderColor?: CustomColorKey
  tableRowColor?: CustomColorKey
  titleList: string[]
}

interface IListTitleProps extends IListContainerProps {
  isDividingLine: boolean
  tableBorderColor: CustomColorKey
  tableRowColor: CustomColorKey
}

const ListTitle = ({
  gridTemplate,
  titleList,
  isSelectedBatch,
  onSelectBatch,
  tableBorderColor,
  tableRowColor,
  isDividingLine,
}: IListTitleProps): ReactElement => {
  return (
    <GridTableRow
      backgroundColor={tableBorderColor}
      gridTemplate={gridTemplate}
      height={LIST_TITLE_ROW_HEIGHT}
      isDividingLine={isDividingLine}
    >
      {onSelectBatch && (
        <ListCell tableRowColor={tableRowColor}>
          <Checkbox
            color="primary"
            onClick={onSelectBatch}
            value={isSelectedBatch}
          />
        </ListCell>
      )}
      {titleList.map((title, index) => (
        <ListCell
          key={`list-title-item-${title}-${index}`}
          tableRowColor={tableRowColor}
        >
          <Typography variant="body3">{title}</Typography>
        </ListCell>
      ))}
    </GridTableRow>
  )
}

const ListContainer = ({
  children,
  gridTemplate,
  titleList,
  isSelectedBatch,
  onSelectBatch,
  tableBorderColor = 'borderSecondary',
  tableRowColor = 'bgPrimary',
  isDividingLine = false,
}: PropsWithChildren<IListContainerProps>): ReactElement => {
  return (
    <Box
      backgroundColor={tableBorderColor}
      border={isDividingLine ? '1px solid' : undefined}
      borderColor={isDividingLine ? 'borderTertiary' : undefined}
      borderRadius="md"
      gap={1}
      overflowX="auto"
    >
      <ListTitle
        gridTemplate={gridTemplate}
        isDividingLine={isDividingLine}
        isSelectedBatch={isSelectedBatch}
        onSelectBatch={onSelectBatch}
        tableBorderColor={tableBorderColor}
        tableRowColor={tableRowColor}
        titleList={titleList}
      />
      {children}
    </Box>
  )
}

export default ListContainer
