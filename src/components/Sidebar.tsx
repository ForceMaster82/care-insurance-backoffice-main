import {CustomColorKey, zIndices} from '@caredoc/ui-master'
import {Box, Divider, Icon, Typography} from '@caredoc/ui-web'
import {useRouter} from 'next/router'
import React, {ReactElement, useMemo} from 'react'
import {NAVIGATOR_HEIGHT, SIDEBAR_ITEM_HEIGHT, SIDEBAR_WIDTH} from '~constants'
import {sidebarItemMap} from '~constants/options'
import {PageCategoryType, PageKeyType, SideBarItemType} from '~types'
const VerticalDivider = ({color}: {color: CustomColorKey}): ReactElement => (
  <Box border="1px solid" borderColor={color} height="100%" width={1} />
)

interface ISidebarItem {
  item: SideBarItemType
  pageKey: PageKeyType
}

const SidebarItem = ({pageKey, item}: ISidebarItem): ReactElement => {
  const route = useRouter()
  const isFocused = useMemo(
    () => item.pageKey === pageKey,
    [item.pageKey, pageKey],
  )

  const handleOnClickItem = (): void => {
    route.push(item.path)
  }

  return (
    <Box
      backgroundColor={isFocused ? 'bgSecondary' : 'bgPrimary'}
      height={SIDEBAR_ITEM_HEIGHT}
      onClick={handleOnClickItem}
    >
      <Box
        alignItems="center"
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        px="sm"
      >
        <Typography
          textColor={isFocused ? 'fontPrimary' : 'fontSecondary'}
          variant="body3"
        >
          {item.title}
        </Typography>
        <Icon
          fill={isFocused ? 'fontPrimary' : 'fontSecondary'}
          name="chevron-right"
          size="xs"
        />
      </Box>
      <Divider color="borderPrimary" />
    </Box>
  )
}

interface ISideBar {
  pageCategory: PageCategoryType
  pageKey: PageKeyType
}
const SideBar = ({pageCategory, pageKey}: ISideBar): ReactElement => {
  return (
    <Box
      backgroundColor="bgPrimary"
      flexDirection="row"
      height={`calc(100vh - ${NAVIGATOR_HEIGHT}px)`}
      left={0}
      position="fixed"
      top={`${NAVIGATOR_HEIGHT}px`}
      width={SIDEBAR_WIDTH}
      zIndex={zIndices.navigation}
    >
      <Box flex={1}>
        {sidebarItemMap[pageCategory].map((item) => (
          <SidebarItem
            item={item}
            key={`insurance-GNB-sidebarItem-${item.pageKey}-${item.title}`}
            pageKey={pageKey}
          />
        ))}
      </Box>
      <VerticalDivider color="borderSecondary" />
    </Box>
  )
}

export default SideBar
