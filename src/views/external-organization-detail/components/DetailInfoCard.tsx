import React, {ReactElement} from 'react'
import CardContainer from '~components/Card/CardContainer'
import CardItem from '~components/Card/CardItem'
import CardRow from '~components/Card/CardRow'
import {EXTERNAL_CAREGIVING_ORGANIZATION_TYPE} from '~constants/texts'
import ExternalOrganizationResource from '~models/dto/external-organization/Resource'

interface IDetailInfoCardProps {
  onDownloadBusinessLicenseFile: () => Promise<void>
  resource: ExternalOrganizationResource
}

const DetailInfoCard = ({
  resource,
  onDownloadBusinessLicenseFile,
}: IDetailInfoCardProps): ReactElement => {
  const {
    accountInfo,
    address,
    businessLicenseFileName,
    businessLicenseFileUrl,
    contractName,
    externalCaregivingOrganizationType,
    name,
    phoneNumber,
    profitAllocationRatio,
  } = resource
  return (
    <CardContainer>
      <CardRow>
        <CardItem
          content={
            EXTERNAL_CAREGIVING_ORGANIZATION_TYPE[
              externalCaregivingOrganizationType
            ]
          }
          title="구분"
        />
        <CardItem content={name} title="업체명" />
      </CardRow>
      <CardRow>
        <CardItem content={address} title="주소" />
        <CardItem
          content={businessLicenseFileName}
          onClick={
            businessLicenseFileUrl ? onDownloadBusinessLicenseFile : undefined
          }
          title="사업자등록증"
        />
      </CardRow>
      <CardRow>
        <CardItem content={contractName} title="담당자명" />
        <CardItem content={phoneNumber} title="연락처" />
      </CardRow>
      <CardRow>
        <CardItem content={accountInfo.bank} title="은행명" />
        <CardItem content={accountInfo.accountHolder} title="예금주" />
      </CardRow>
      <CardRow>
        <CardItem content={accountInfo.accountNumber} title="계좌번호" />
        <CardItem content={profitAllocationRatio} title="수익배분율" />
      </CardRow>
    </CardContainer>
  )
}

export default DetailInfoCard
