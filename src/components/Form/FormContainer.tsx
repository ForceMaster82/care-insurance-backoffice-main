import {Box} from '@caredoc/ui-web'
import React, {forwardRef, PropsWithChildren} from 'react'

interface IFormContainerProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const FormContainer = forwardRef<
  HTMLFormElement,
  PropsWithChildren<IFormContainerProps>
>(({children, onSubmit}, ref) => {
  return (
    <form onSubmit={onSubmit} ref={ref}>
      <Box gap="xs" minWidth="max-content">
        {children}
      </Box>
    </form>
  )
})

export default FormContainer

FormContainer.displayName = 'FormContainer'
