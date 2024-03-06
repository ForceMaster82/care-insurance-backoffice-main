import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React from 'react'
import {
  DETAIL_PATH,
  INTERNAL_MANAGER_PATH,
  REGISTER_PATH,
} from '~constants/route-paths'
import useInternalManagerList from '~hooks/internal-manager/use-internal-manager-list'
import useManagerSearch from '~hooks/use-manager-search'
import usePagination from '~hooks/use-pagination'
import useSuspend from '~hooks/use-suspend'
import Layout from '~templates/layouts/Layout'
import InternalManagerView from '~views/internal-manager'

const InternalManagerPage: NextPage = () => {
  const route = useRouter()
  const {onChangePage, pageNumber} = usePagination()
  const {onChangeKeyword, category, onChangeCategory, query} =
    useManagerSearch('email')

  const internalManagerListResource = useInternalManagerList({
    pageNumber,
    query,
  })

  const suspendMethod = useSuspend('internal')

  const handleOnClickDetail = (id: string): void => {
    route.push(`${INTERNAL_MANAGER_PATH}/${id}${DETAIL_PATH}`)
  }

  const handleOnClickRegister = (): void => {
    route.push(`${INTERNAL_MANAGER_PATH}${REGISTER_PATH}`)
  }

  return (
    <Layout pageCategory="ACCOUNT_MANAGEMENT" pageKey="INTERNAL_MANAGER">
      <InternalManagerView
        category={category}
        internalManagerListResource={internalManagerListResource}
        onChangeCategory={onChangeCategory}
        onChangeKeyword={onChangeKeyword}
        onClickDetail={handleOnClickDetail}
        onClickPage={onChangePage}
        onClickRegister={handleOnClickRegister}
        suspendMethod={suspendMethod}
      />
    </Layout>
  )
}

export default InternalManagerPage
