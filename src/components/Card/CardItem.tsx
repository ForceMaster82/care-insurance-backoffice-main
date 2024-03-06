import {Box, Chip, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

interface ICardItemProps {
  content?: string
  onClick?: () => void
  required?: boolean
  title: string
}

const CardItem = ({
  title,
  content,
  onClick,
  required,
  children,
}: PropsWithChildren<ICardItemProps>): ReactElement => {
  return (
    <Box flex={1} gap="xxs">
      <Box flexDirection="row">
        {required && (
          <Typography textColor="negative" variant="body1">
            *
          </Typography>
        )}
        <Typography variant="body1">{title}</Typography>
      </Box>
      {content && (
        <Box alignItems="center" flexDirection="row" gap="xs" onClick={onClick}>
          <Typography variant="body2">{content}</Typography>
          {onClick && (
            <Box minWidth="max-content">
              <Chip color="fontPrimary" size="sm" variant="tertiary">
                다운로드
              </Chip>
            </Box>
          )}
        </Box>
      )}
      <Box>{children}</Box>
    </Box>
  )
}

export default CardItem
