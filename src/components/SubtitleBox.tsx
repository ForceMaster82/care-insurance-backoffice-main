import {Box, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

const SUBTITLE_HEIGHT = 64

interface ISubtitleBoxProps {
  required?: boolean
  title?: string
}

const SubtitleBox = ({
  children,
  title,
  required = false,
}: PropsWithChildren<ISubtitleBoxProps>): ReactElement => {
  return (
    <Box
      alignItems="center"
      backgroundColor="bgPrimary"
      borderRadius="md"
      flexDirection="row"
      height={SUBTITLE_HEIGHT}
      justifyContent={
        title ? 'space-between' : children ? 'flex-end' : 'space-between'
      }
      minWidth="max-content"
      px="sm"
    >
      {children ||
        (title && <Typography variant="heading6">{title}</Typography>)}
      {required && (
        <Box alignItems="center" flexDirection="row">
          <Typography textColor="negative" variant="caption1">
            *
          </Typography>
          <Typography textColor="fontSecondary" variant="caption1">
            표시는 필수값 입력 항목입니다.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default SubtitleBox
