import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React from 'react'
import useCoverageRegister from '~hooks/coverage/use-coverage-register'
import Layout from '~templates/layouts/Layout'
import CoverageRegisterView from '~views/coverage-register'

const CoverageRegisterPage: NextPage = () => {
  const route = useRouter()
  const {formData, onSubmit, onCancel} = useCoverageRegister()
  return (
    <Layout pageCategory="MASTER_DATA" pageKey="COVERAGE">
      <CoverageRegisterView
        formData={formData}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Layout>
  )
}

export default CoverageRegisterPage
