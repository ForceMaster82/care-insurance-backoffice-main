import React from 'react'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {useQueryClient} from '@tanstack/react-query'
import Layout from '~templates/layouts/Layout'
import ExternalOrganizationDetailView from '~views/external-organization-detail'
import {EXTERNAL_ORGANIZATION_PATH, MODIFY_PATH} from '~constants/route-paths'
import useExternalOrganizationDetail from '~hooks/external-organization/use-external-organization-detail'
import {IResponse} from '~utils/fetch'
import {IExternalOrganizationDetail} from '~types/dto'

const ExternalOrganizationDetailPage: NextPage = () => {
  const route = useRouter()
  const queryClient = useQueryClient()
  const resource = useExternalOrganizationDetail()
  const handleOnClickList = (): void => {
    route.push(EXTERNAL_ORGANIZATION_PATH)
  }

  const handleOnClickModify = (id: string): void => {
    route.push(`${EXTERNAL_ORGANIZATION_PATH}/${id}${MODIFY_PATH}`)
  }

  const handleOnDownloadBusinessLicenseFile = async (): Promise<void> => {
    const organizationId = (route.query?.id as string | undefined) || ''
    /** 사업자등록증 URL은 S3 presigned로 처리되어있으므로 일정시간 이후 권한이 만료된다. 따라서 핸들러에서 URL을 갱신시켜준다. */
    await queryClient.invalidateQueries([
      'external-organization-detail',
      organizationId,
    ])
    const detailData = queryClient.getQueryData<
      IResponse<IExternalOrganizationDetail>
    >(['external-organization-detail', organizationId])
    if (detailData?.body.businessLicenseFileUrl) {
      window.open(detailData.body.businessLicenseFileUrl)
    }
  }

  return (
    <Layout pageCategory="MASTER_DATA" pageKey="EXTERNAL_ORGANIZATION">
      <ExternalOrganizationDetailView
        onClickList={handleOnClickList}
        onClickModify={handleOnClickModify}
        onDownloadBusinessLicenseFile={handleOnDownloadBusinessLicenseFile}
        resource={resource}
      />
    </Layout>
  )
}

export default ExternalOrganizationDetailPage
