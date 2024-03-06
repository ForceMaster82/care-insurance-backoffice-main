import React, {ReactElement} from 'react'
import CardContainer from '~components/Card/CardContainer'
import CardItem from '~components/Card/CardItem'
import CardRow from '~components/Card/CardRow'
import InternalManagerResource from '~models/dto/internal-manager/Resource'

interface IInfoCardProps {
  resource: InternalManagerResource
}

const InfoCard = ({resource}: IInfoCardProps): ReactElement => {
  const {email, lastLoginDateTime, name, phoneNumber, nickname, role} = resource
  return (
    <CardContainer>
      <CardRow>
        <CardItem content={email} title="아이디(이메일)" />
        <CardItem content={nickname} title="닉네임" />
      </CardRow>
      <CardRow>
        <CardItem content={name} title="담당자명" />
        <CardItem content={phoneNumber} title="연락처" />
      </CardRow>
      <CardRow>
        <CardItem content={role} title="주요업무" />
        <CardItem content={lastLoginDateTime} title="최근 로그인 일시" />
      </CardRow>
    </CardContainer>
  )
}

export default InfoCard
