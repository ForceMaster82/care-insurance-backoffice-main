import {CustomColorKey} from '@caredoc/ui-master'
import {Box} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

interface IListCellProps {
  tableRowColor?: CustomColorKey
}

const ListCell = ({
  children,
  tableRowColor = 'bgPrimary',
}: PropsWithChildren<IListCellProps>): ReactElement => {
  return (
    <Box
      alignItems="center"
      backgroundColor={tableRowColor}
      height="100%"
      justifyContent="center"
      px="xs"
      width="100%"
    >
      {children}
    </Box>
  )
}

export default ListCell
