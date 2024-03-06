import {CustomColorKey} from '@caredoc/ui-master'
import {Box, type IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

interface IProps extends Omit<IBox, 'display' | 'gap'> {
  backgroundColor?: CustomColorKey
  gridTemplate: string
  isDividingLine?: boolean
  placeItems?: 'stretch' | 'start' | 'center' | 'end'
}
const GridTableRow = (props: PropsWithChildren<IProps>): ReactElement => {
  const {
    children,
    gridTemplate,
    placeItems = 'center',
    isDividingLine = false,
    ...rest
  } = props

  return (
    <Box
      display="grid"
      gap={isDividingLine ? 1 : undefined}
      style={{
        gridTemplateColumns: `${gridTemplate}`,
        placeItems,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default GridTableRow
