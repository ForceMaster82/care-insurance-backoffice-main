import {Box, Button, type IButton} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'
import {FORM_BUTTON_WIDTH} from '~constants'

const SubmitButton = ({
  children,
  color = 'primary',
  ...rest
}: PropsWithChildren<IButton>): ReactElement => {
  return (
    <Box width={FORM_BUTTON_WIDTH}>
      <Button color={color} {...rest}>
        {children}
      </Button>
    </Box>
  )
}

export default SubmitButton
