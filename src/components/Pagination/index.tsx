import {Box, Icon, Typography} from '@caredoc/ui-web'
import {Colors, CustomColorKey} from '@caredoc/ui-master'

import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react'
import {createDisplayedPageList} from './utils'

const PAGINATION_HEIGHT = 40
const NUMBER_BOX_WIDTH = 40
const NAVIGATOR_BOX_WIDTH = 44
const DEFAULT_PAGE_RANGE_DISPLAYED = 5
const ACTIVE_COLOR: CustomColorKey = 'primary'
const INACTIVE_BORDER_COLOR: CustomColorKey = 'borderTertiary'
const INACTIVE_FONT_COLOR: CustomColorKey = 'fontTertiary'
const INACTIVE_ICON_COLOR: keyof Colors = 'n400'

interface IPaginationItemProps {
  isActive?: boolean
  navigator?: 'left' | 'right'
  onClick: () => void
  width?: number
}

interface IPaginationProps {
  currentPageNumber?: number
  lastPageNumber: number
  onClick?: (page: number) => void
  pageLimit?: number
}

const PaginationItem = ({
  children,
  onClick,
  width = NUMBER_BOX_WIDTH,
  isActive = false,
  navigator,
}: PropsWithChildren<IPaginationItemProps>): ReactElement => {
  const borderWidth = useMemo(() => {
    const itemSideWidth = isActive ? '1px' : '0.5px'
    if (navigator === 'left') {
      return `1px 0.5px 1px 1px`
    }
    if (navigator === 'right') {
      return `1px 1px 1px 0.5px`
    }
    return `1px ${itemSideWidth} `
  }, [isActive, navigator])

  return (
    <Box
      alignItems="center"
      borderColor={isActive ? ACTIVE_COLOR : INACTIVE_BORDER_COLOR}
      borderStyle="solid"
      height="100%"
      justifyContent="center"
      onClick={onClick}
      style={{borderWidth}}
      width={width}
    >
      {navigator === 'left' ? (
        <Icon fill={INACTIVE_ICON_COLOR} name="chevron-left" />
      ) : navigator === 'right' ? (
        <Icon fill={INACTIVE_ICON_COLOR} name="chevron-right" />
      ) : (
        <Typography
          textColor={isActive ? ACTIVE_COLOR : INACTIVE_FONT_COLOR}
          variant="body3"
        >
          {children}
        </Typography>
      )}
    </Box>
  )
}

const Pagination = (props: IPaginationProps): ReactElement => {
  const {
    currentPageNumber: _currentPageNumber = 1,
    lastPageNumber,
    onClick,
    pageLimit = DEFAULT_PAGE_RANGE_DISPLAYED,
  } = props

  const [currentPageNumber, setCurrentPageNumber] = useState(_currentPageNumber)

  const displayedPageList = useMemo(() => {
    return createDisplayedPageList(currentPageNumber, lastPageNumber, pageLimit)
  }, [currentPageNumber, lastPageNumber, pageLimit])

  const currentFirstPageNumber = useMemo(
    () => displayedPageList[0],
    [displayedPageList],
  )

  const handleOnClickPage = useCallback(
    (page: number): void => {
      setCurrentPageNumber(page)
      onClick?.(page)
    },
    [onClick],
  )

  const handleOnClickPrevNavigator = useCallback(() => {
    const isFirstPageRange = currentFirstPageNumber === 1
    if (isFirstPageRange) {
      return
    }

    const navigationTargetPage = currentFirstPageNumber - pageLimit
    handleOnClickPage(navigationTargetPage)
  }, [currentFirstPageNumber, pageLimit, handleOnClickPage])

  const handleOnClickNextNavigator = useCallback(() => {
    const currentLastPageNumber =
      displayedPageList[displayedPageList.length - 1]
    const isLastPageRange = currentLastPageNumber === lastPageNumber
    if (isLastPageRange) {
      return
    }

    const navigationTargetPage = currentFirstPageNumber + pageLimit
    handleOnClickPage(navigationTargetPage)
  }, [
    displayedPageList,
    lastPageNumber,
    currentFirstPageNumber,
    pageLimit,
    handleOnClickPage,
  ])

  return (
    <Box
      backgroundColor="bgPrimary"
      flexDirection="row"
      height={PAGINATION_HEIGHT}
      width="fit-content"
    >
      <PaginationItem
        navigator="left"
        onClick={handleOnClickPrevNavigator}
        width={NAVIGATOR_BOX_WIDTH}
      />
      {displayedPageList.map((page) => {
        return (
          <PaginationItem
            isActive={page === currentPageNumber}
            key={`pagination-item-${page}`}
            onClick={(): void => handleOnClickPage(page)}
          >
            {page}
          </PaginationItem>
        )
      })}
      <PaginationItem
        navigator="right"
        onClick={handleOnClickNextNavigator}
        width={NAVIGATOR_BOX_WIDTH}
      />
    </Box>
  )
}

export default Pagination
