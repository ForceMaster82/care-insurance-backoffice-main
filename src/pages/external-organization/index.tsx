import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {useCallback} from 'react'

import {
  DETAIL_PATH,
  EXTERNAL_ORGANIZATION_PATH,
  REGISTER_PATH,
} from '~constants/route-paths'
import useExternalOrganizationList from '~hooks/external-organization/use-external-organization-list'
import usePagination from '~hooks/use-pagination'
import useSearch from '~hooks/use-search'
import Layout from '~templates/layouts/Layout'
import ExternalOrganizationView from '~views/external-organization'

const QUERY_CATEGORY = 'externalCaregivingOrganizationName'

const ExternalOrganizationPage: NextPage = () => {
  const route = useRouter()
  const {onChangeKeyword, query} = useSearch(QUERY_CATEGORY)
  const {onChangePage, pageNumber} = usePagination()
  const resource = useExternalOrganizationList({pageNumber, query})

  const handleOnClickOrganizationName = useCallback(
    (organizationId: string): void => {
      route.push(
        `${EXTERNAL_ORGANIZATION_PATH}/${organizationId}${DETAIL_PATH}`,
      )
    },
    [route],
  )

  const handleOnClickRegister = useCallback(() => {
    route.push(`${EXTERNAL_ORGANIZATION_PATH}${REGISTER_PATH}`)
  }, [route])

  return (
    <Layout pageCategory="MASTER_DATA" pageKey="EXTERNAL_ORGANIZATION">
      <ExternalOrganizationView
        onChangeKeyword={onChangeKeyword}
        onClickOrganizationName={handleOnClickOrganizationName}
        onClickPage={onChangePage}
        onClickRegister={handleOnClickRegister}
        resource={resource}
      />
    </Layout>
  )
}

export default ExternalOrganizationPage
