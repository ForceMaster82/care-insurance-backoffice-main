import React from 'react'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import Layout from '~templates/layouts/Layout'
import InternalManagerModifyView from '~views/internal-manager-modify'
import useInternalManagerDetail from '~hooks/internal-manager/use-internal-manager-detail'
import useInternalManagerModify from '~hooks/internal-manager/use-internal-manager-modify'

const InternalManagerModifyPage: NextPage = () => {
  const router = useRouter()
  const internalManagerId = router.query?.id as string | undefined

  const detailResource = useInternalManagerDetail({id: internalManagerId})
  const {formData, onSubmit, onCancel, isLoaded} =
    useInternalManagerModify(detailResource)

  return (
    <Layout pageCategory="ACCOUNT_MANAGEMENT" pageKey="INTERNAL_MANAGER">
      <InternalManagerModifyView
        formData={formData}
        isLoaded={isLoaded}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Layout>
  )
}

export default InternalManagerModifyPage
