import React, {ReactElement, useMemo} from 'react'
import {
  Box,
  Chip,
  Divider,
  Icon,
  Image,
  Link,
  TabItem,
  Typography,
} from '@caredoc/ui-web'
import {useRouter} from 'next/router'
import {zIndices} from '@caredoc/ui-master'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {LOGO_SIZE, NAVIGATOR_HEIGHT} from '~constants'
import {
  getUserIdFromToken,
  removeAccessToken,
  removeRefreshToken,
} from '~utils/manage-token'
import {NavigationItemType, PageCategoryType} from '~types'
import {navigationItemList} from '~constants/options'
import {formatDate} from '~utils/date'
import {IUser} from '~types/dto'
import {EXTERNAL_ORGANIZATION_PATH} from '~constants/route-paths'
import {fetcher, IResponse} from '~utils/fetch'
import {apiPath} from '~constants/api-paths'
import {ORGANIZATION_TYPE_NAME} from '~constants/texts'

// eslint-disable-next-line no-magic-numbers
const USER_INFO_STALE_TIME = 60 * 60 * 1000
interface INavigatorItem {
  item: NavigationItemType
  pageCategory: PageCategoryType
}

const NavigatorItem = ({pageCategory, item}: INavigatorItem): ReactElement => {
  const route = useRouter()
  const isFocused = useMemo(
    () => item.category === pageCategory,
    [item.category, pageCategory],
  )

  const handleOnClickNavigatorItem = (): void => {
    if (isFocused) {
      return
    }
    route.push(item.path)
  }

  return (
    <TabItem focused={isFocused} onClick={handleOnClickNavigatorItem} size="md">
      {item.title}
    </TabItem>
  )
}

interface INavigator {
  pageCategory: PageCategoryType
}

const Navigator = ({pageCategory}: INavigator): ReactElement => {
  const route = useRouter()
  const userId = getUserIdFromToken()

  const queryClient = useQueryClient()

  const {data} = useQuery<IResponse<IUser>>(
    ['userInfo'],
    () => fetcher<IUser>(apiPath.users.identified.common(userId)),
    {
      enabled: Boolean(userId),
      keepPreviousData: true,
      staleTime: USER_INFO_STALE_TIME,
    },
  )
  const {
    id = '',
    lastLoginDateTime = new Date().toString(),
    name = '',
    organizations = [],
  } = {...data?.body}

  const handleOnClickLogo = (): void => {
    route.push(EXTERNAL_ORGANIZATION_PATH)
  }
  const handleOnLogOut = (): void => {
    // eslint-disable-next-line no-alert
    if (confirm('로그아웃 하시겠습니까?')) {
      removeAccessToken()
      removeRefreshToken()
      queryClient.clear()
      route.push('/account/login')
    }
  }
  const handleOnChangePassword = (): void => {
    route.push('/account/password-change')
  }

  return (
    <Box>
      <Box
        backgroundColor="bgPrimary"
        flexDirection="row"
        height={NAVIGATOR_HEIGHT}
        justifyContent="space-between"
        left={0}
        minWidth="max-content"
        position="fixed"
        px="sm"
        top={0}
        width="100%"
        zIndex={zIndices.navigation}
      >
        <Box alignItems="center" flexDirection="row" gap="lg">
          <Box onClick={handleOnClickLogo}>
            <Image
              alt="insurance-backoffice-logo"
              height={LOGO_SIZE}
              src="/images/BI.svg"
              width={LOGO_SIZE}
            />
          </Box>
          <Box flexDirection="row">
            {navigationItemList.map((navigationItem) => (
              <NavigatorItem
                item={navigationItem}
                key={`insurance-backoffice-GNB-${navigationItem.title}`}
                pageCategory={pageCategory}
              />
            ))}
          </Box>
        </Box>
        <Box flexDirection="row" gap="sm">
          <Box justifyContent="center">
            <Box alignItems="center" flexDirection="row" gap="xs">
              <Typography variant="subtitle1">{name}</Typography>
              <Chip color="fontPrimary" variant="secondary">
                {ORGANIZATION_TYPE_NAME[organizations[0]?.organizationType]}
              </Chip>
            </Box>
            <Typography variant="caption4">
              {`최근 로그인: ${formatDate(
                lastLoginDateTime,
                'yyyy-MM-dd hh:mm',
              )}`}
            </Typography>
          </Box>
          <Box alignItems="flex-start" gap="xs" justifyContent="center">
            <Link
              color="fontSecondary"
              onClick={handleOnChangePassword}
              size="xs"
            >
              <Box alignItems="center" flexDirection="row" gap="xxs">
                비밀번호 변경
                <Icon fill="fontSecondary" name="chevron-right" />
              </Box>
            </Link>
            <Link color="fontSecondary" onClick={handleOnLogOut} size="xs">
              <Box alignItems="center" flexDirection="row" gap="xxs">
                로그아웃
                <Icon fill="fontSecondary" name="chevron-right" />
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider color="borderPrimary" />
    </Box>
  )
}

export default Navigator
