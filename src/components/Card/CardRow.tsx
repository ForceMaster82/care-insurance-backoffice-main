import {Box} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

const gridTemplate = 'minmax(200px,1fr) minmax(200px,1fr)'

interface ICardRowProps {}

const CardRow = ({
  children,
}: PropsWithChildren<ICardRowProps>): ReactElement => {
  return (
    <Box
      display="grid"
      flexDirection="row"
      gap="sm"
      style={{
        gridTemplateColumns: `${gridTemplate}`,
      }}
    >
      {children}
    </Box>
  )
}

export default CardRow
