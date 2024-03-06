import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React from 'react'
import {COVERAGE_PATH, DETAIL_PATH, REGISTER_PATH} from '~constants/route-paths'
import useCoverageList from '~hooks/coverage/use-coverage-list'
import usePagination from '~hooks/use-pagination'
import useSearch from '~hooks/use-search'
import Layout from '~templates/layouts/Layout'
import CoverageView from '~views/coverage'

const QUERY_CATEGORY = 'name'

const CoveragePage: NextPage = () => {
  const route = useRouter()
  const {onChangeKeyword, query} = useSearch(QUERY_CATEGORY)
  const {onChangePage, pageNumber} = usePagination()
  const resource = useCoverageList({pageNumber, query})

  const handleOnClickDetail = (id: string): void => {
    route.push(`${COVERAGE_PATH}/${id}${DETAIL_PATH}`)
  }

  const handleOnClickRegister = (): void => {
    route.push(`${COVERAGE_PATH}${REGISTER_PATH}`)
  }

  return (
    <Layout pageCategory="MASTER_DATA" pageKey="COVERAGE">
      <CoverageView
        onChangeKeyword={onChangeKeyword}
        onClickDetail={handleOnClickDetail}
        onClickPage={onChangePage}
        onClickRegister={handleOnClickRegister}
        resource={resource}
      />
    </Layout>
  )
}

export default CoveragePage
