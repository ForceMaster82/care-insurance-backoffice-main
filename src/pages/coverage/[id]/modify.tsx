import React from 'react'
import {NextPage} from 'next'
import Layout from '~templates/layouts/Layout'
import CoverageModifyView from '~views/coverage-modify'
import useCoverageDetail from '~hooks/coverage/use-coverage-detail'
import useCoverageModify from '~hooks/coverage/use-coverage-modify'

const CoverageModifyPage: NextPage = () => {
  const detailResource = useCoverageDetail()
  const {formData, onSubmit, isLoaded, onCancel} =
    useCoverageModify(detailResource)
  return (
    <Layout pageCategory="MASTER_DATA" pageKey="COVERAGE">
      <CoverageModifyView
        formData={formData}
        isLoaded={isLoaded}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Layout>
  )
}

export default CoverageModifyPage
