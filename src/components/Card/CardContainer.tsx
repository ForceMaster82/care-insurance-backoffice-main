import {Box} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

interface ICardContainerProps {}

const CardContainer = ({
  children,
}: PropsWithChildren<ICardContainerProps>): ReactElement => {
  return (
    <Box backgroundColor="bgPrimary" borderRadius="md" gap="sm" p="sm">
      {children}
    </Box>
  )
}

export default CardContainer
