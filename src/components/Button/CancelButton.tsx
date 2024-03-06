import {Box, Button, type IButton} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'
import {FORM_BUTTON_WIDTH} from '~constants'

const CancelButton = ({
  children,
  color = 'fontSecondary',
  variant = 'tertiary',
  ...rest
}: PropsWithChildren<IButton>): ReactElement => {
  return (
    <Box backgroundColor="bgPrimary" width={FORM_BUTTON_WIDTH}>
      <Button color={color} variant={variant} {...rest}>
        {children}
      </Button>
    </Box>
  )
}

export default CancelButton
