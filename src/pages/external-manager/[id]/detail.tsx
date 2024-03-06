import React from 'react'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import Layout from '~templates/layouts/Layout'
import ExternalManagerDetailView from '~views/external-manager-detail'
import {transformOrganizationIdToName} from '~utils/transform'
import {EXTERNAL_MANAGER_PATH, MODIFY_PATH} from '~constants/route-paths'
import useExternalOrganizationList from '~hooks/external-organization/use-external-organization-list'
import {TOTAL_PAGE_SIZE} from '~constants/pagination'
import {EMPTY_VALUE_TEXT} from '~constants/texts'
import useExternalManagerDetail from '~hooks/external-manager/use-external-manager-detail'

const ExternalManagerDetailPage: NextPage = () => {
  const route = useRouter()
  const externalOrganizationListResource = useExternalOrganizationList({
    pageSize: TOTAL_PAGE_SIZE,
  })

  const externalManagerResource = useExternalManagerDetail()

  const organizationName =
    externalOrganizationListResource && externalManagerResource
      ? transformOrganizationIdToName(
          externalOrganizationListResource.items,
          externalManagerResource.externalCaregivingOrganizationId,
        )
      : EMPTY_VALUE_TEXT

  const handleOnClickList = (): void => {
    route.push(EXTERNAL_MANAGER_PATH)
  }

  const handleOnClickModify = (id: string): void => {
    route.push(`${EXTERNAL_MANAGER_PATH}/${id}${MODIFY_PATH}`)
  }
  return (
    <Layout pageCategory="ACCOUNT_MANAGEMENT" pageKey="EXTERNAL_MANAGER">
      <ExternalManagerDetailView
        externalManagerResource={externalManagerResource}
        onClickList={handleOnClickList}
        onClickModify={handleOnClickModify}
        organizationName={organizationName}
      />
    </Layout>
  )
}

export default ExternalManagerDetailPage
