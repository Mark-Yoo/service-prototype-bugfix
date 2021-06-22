import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import { CardWrapper } from './styles';

const ServicePage = () => {
  const { token } = useSelector((state) => state.postInfo);

  return (
    <CardWrapper>
      <Card token={token}></Card>
    </CardWrapper>
  );
};

export default memo(ServicePage);
