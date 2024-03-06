import React from 'react'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import Layout from '~templates/layouts/Layout'
import CoverageDetailView from '~views/coverage-detail'
import {COVERAGE_PATH, MODIFY_PATH} from '~constants/route-paths'
import useCoverageDetail from '~hooks/coverage/use-coverage-detail'

const CoverageDetailPage: NextPage = () => {
  const route = useRouter()
  const coverageResource = useCoverageDetail()

  const handleOnClickList = (): void => {
    route.push(COVERAGE_PATH)
  }

  const handleOnClickModify = (id: string): void => {
    route.push(`${COVERAGE_PATH}/${id}${MODIFY_PATH}`)
  }
  return (
    <Layout pageCategory="MASTER_DATA" pageKey="COVERAGE">
      <CoverageDetailView
        onClickList={handleOnClickList}
        onClickModify={handleOnClickModify}
        resource={coverageResource}
      />
    </Layout>
  )
}

export default CoverageDetailPage
