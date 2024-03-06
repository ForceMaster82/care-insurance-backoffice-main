import React, {ReactElement} from 'react'
import CardContainer from '~components/Card/CardContainer'
import CardItem from '~components/Card/CardItem'
import CardRow from '~components/Card/CardRow'
import InternalManagerResource from '~models/dto/internal-manager/Resource'

interface IManageCardProps {
  resource: InternalManagerResource
}

const ManageCard = ({resource}: IManageCardProps): ReactElement => {
  const {suspended, remarks} = resource
  return (
    <CardContainer>
      <CardRow>
        <CardItem content={suspended ? '사용안함' : '사용'} title="사용여부" />
        <CardItem content={remarks} title="메모" />
      </CardRow>
    </CardContainer>
  )
}

export default ManageCard
