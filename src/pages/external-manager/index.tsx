import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React from 'react'
import {TOTAL_PAGE_SIZE} from '~constants/pagination'
import {
  DETAIL_PATH,
  EXTERNAL_MANAGER_PATH,
  REGISTER_PATH,
} from '~constants/route-paths'
import useExternalManagerList from '~hooks/external-manager/use-external-manager-list'
import useExternalOrganizationList from '~hooks/external-organization/use-external-organization-list'
import useManagerSearch from '~hooks/use-manager-search'
import usePagination from '~hooks/use-pagination'
import useSuspend from '~hooks/use-suspend'
import Layout from '~templates/layouts/Layout'
import ExternalManagerView from '~views/external-manager'

const ExternalManagerPage: NextPage = () => {
  const route = useRouter()
  const externalOrganizationListResource = useExternalOrganizationList({
    externalOrganizationType: 'AFFILIATED',
    pageSize: TOTAL_PAGE_SIZE,
  })
  const {
    onChangeKeyword,
    category,
    onChangeCategory,
    onChangeOrganization,
    organizationId,
    query,
  } = useManagerSearch('email')

  const {onChangePage, pageNumber} = usePagination()

  const externalManagerListResource = useExternalManagerList({
    id: organizationId,
    pageNumber,
    query,
  })

  const suspendMethod = useSuspend('external')

  const handleOnClickDetail = (id: string): void => {
    route.push(`${EXTERNAL_MANAGER_PATH}/${id}${DETAIL_PATH}`)
  }

  const handleOnClickRegister = (): void => {
    route.push(`${EXTERNAL_MANAGER_PATH}${REGISTER_PATH}`)
  }

  return (
    <Layout pageCategory="ACCOUNT_MANAGEMENT" pageKey="EXTERNAL_MANAGER">
      <ExternalManagerView
        category={category}
        externalManagerListResource={externalManagerListResource}
        externalOrganizationResource={externalOrganizationListResource}
        onChangeCategory={onChangeCategory}
        onChangeKeyword={onChangeKeyword}
        onChangeOrganization={onChangeOrganization}
        onClickDetail={handleOnClickDetail}
        onClickPage={onChangePage}
        onClickRegister={handleOnClickRegister}
        organizationId={organizationId}
        suspendMethod={suspendMethod}
      />
    </Layout>
  )
}

export default ExternalManagerPage
