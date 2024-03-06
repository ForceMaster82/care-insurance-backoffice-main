import React, {ReactElement} from 'react'
import CardContainer from '~components/Card/CardContainer'
import CardItem from '~components/Card/CardItem'
import CardRow from '~components/Card/CardRow'
import {ExternalManagerResource} from '~models/dto/\bexternal-manager/Resource'

interface IInfoCardProps {
  organizationName: string
  resource: ExternalManagerResource
}

const InfoCard = ({
  resource,
  organizationName,
}: IInfoCardProps): ReactElement => {
  const {email, lastLoginDateTime, name, phoneNumber} = resource
  return (
    <CardContainer>
      <CardRow>
        <CardItem content={organizationName} title="제휴사" />
        <CardItem content={email} title="아이디(이메일)" />
      </CardRow>
      <CardRow>
        <CardItem content={name} title="담당자명" />
        <CardItem content={phoneNumber} title="연락처" />
      </CardRow>
      <CardRow>
        <CardItem content={lastLoginDateTime} title="최근 로그인 일시" />
      </CardRow>
    </CardContainer>
  )
}

export default InfoCard
