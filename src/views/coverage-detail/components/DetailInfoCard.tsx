import React, {ReactElement} from 'react'
import CardContainer from '~components/Card/CardContainer'
import CardItem from '~components/Card/CardItem'
import CardRow from '~components/Card/CardRow'
import {COVERAGE_RENEWAL_TYPE} from '~constants/texts'
import CoverageResource from '~models/dto/coverage/Resource'
import {formatDate} from '~utils/date'

interface IDetailInfoCardProps {
  resource: CoverageResource
}

const DetailInfoCard = ({resource}: IDetailInfoCardProps): ReactElement => {
  const {lastModifiedDateTime, name, renewalType, targetSubscriptionYear} =
    resource

  return (
    <CardContainer>
      <CardRow>
        <CardItem content={COVERAGE_RENEWAL_TYPE[renewalType]} title="구분" />
        <CardItem content={name} title="가입담보명" />
      </CardRow>
      <CardRow>
        <CardItem content={targetSubscriptionYear} title="기준연도" />
        <CardItem
          content={formatDate(lastModifiedDateTime)}
          title="마지막 수정일자"
        />
      </CardRow>
    </CardContainer>
  )
}

export default DetailInfoCard
