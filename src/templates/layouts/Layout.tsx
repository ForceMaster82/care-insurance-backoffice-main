import {Box} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'
import Navigator from '~components/Navigator'
import SideBar from '~components/Sidebar'
import {NAVIGATOR_HEIGHT, SIDEBAR_WIDTH} from '~constants'
import {PageCategoryType, PageKeyType} from '~types'

interface ILayout {
  pageCategory: PageCategoryType
  pageKey: PageKeyType
}

const Layout = ({
  children,
  pageKey,
  pageCategory,
}: PropsWithChildren<ILayout>): ReactElement => {
  return (
    <Box
      height="100vh"
      overflow="hidden"
      style={{
        paddingLeft: `${SIDEBAR_WIDTH}px`,
        paddingTop: `${NAVIGATOR_HEIGHT}px`,
      }}
      width="100vw"
    >
      <Navigator pageCategory={pageCategory} />
      <SideBar pageCategory={pageCategory} pageKey={pageKey} />
      <Box
        minHeight={`calc(100vh - ${NAVIGATOR_HEIGHT}px)`}
        overflowX="hidden"
        overflowY="auto"
        p="sm"
      >
        <Box flexShrink={0} minHeight="100%">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
