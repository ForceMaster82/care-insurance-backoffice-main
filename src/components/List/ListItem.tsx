import {CustomColorKey} from '@caredoc/ui-master'
import {Checkbox} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement, ReactNode} from 'react'
import GridTableRow from './GridTableRow'
import ListCell from './ListCell'

const LIST_ITEM_ROW_HEIGHT = 64

interface IListItemProps {
  gridTemplate: string
  isDividingLine?: boolean
  isSelected?: boolean
  onSelect?: () => void
  tableBorderColor?: CustomColorKey
  tableRowColor?: CustomColorKey
}

const ListItem = ({
  gridTemplate,
  children,
  isSelected,
  onSelect,
  tableBorderColor = 'borderSecondary',
  tableRowColor = 'bgPrimary',
  isDividingLine = false,
}: PropsWithChildren<IListItemProps>): ReactElement | null => {
  return (
    <GridTableRow
      backgroundColor={tableBorderColor}
      gridTemplate={gridTemplate}
      height={LIST_ITEM_ROW_HEIGHT}
      isDividingLine={isDividingLine}
    >
      {onSelect && (
        <ListCell tableRowColor={tableRowColor}>
          <Checkbox color="primary" onClick={onSelect} value={isSelected} />
        </ListCell>
      )}
      {Array.isArray(children) &&
        (children as ReactNode[]).map((children, index) => (
          <ListCell
            key={`list-item-row-cell-${index}`}
            tableRowColor={tableRowColor}
          >
            {children}
          </ListCell>
        ))}
    </GridTableRow>
  )
}

export default ListItem
