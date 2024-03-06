import React from 'react'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import Layout from '~templates/layouts/Layout'
import InternalManagerDetailView from '~views/internal-manager-detail'
import {INTERNAL_MANAGER_PATH, MODIFY_PATH} from '~constants/route-paths'
import useInternalManagerDetail from '~hooks/internal-manager/use-internal-manager-detail'

const InternalManagerDetailPage: NextPage = () => {
  const route = useRouter()
  const internalManagerId = route.query?.id as string | undefined

  const internalManagerResource = useInternalManagerDetail({
    id: internalManagerId,
  })
  const handleOnClickList = (): void => {
    route.push(INTERNAL_MANAGER_PATH)
  }

  const handleOnClickModify = (id: string): void => {
    route.push(`${INTERNAL_MANAGER_PATH}/${id}${MODIFY_PATH}`)
  }
  return (
    <Layout pageCategory="ACCOUNT_MANAGEMENT" pageKey="INTERNAL_MANAGER">
      <InternalManagerDetailView
        onClickList={handleOnClickList}
        onClickModify={handleOnClickModify}
        resource={internalManagerResource}
      />
    </Layout>
  )
}

export default InternalManagerDetailPage
