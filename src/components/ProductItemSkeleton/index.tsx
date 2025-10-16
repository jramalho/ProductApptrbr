import React from 'react';
import SkeletonLoader from '../SkeletonLoader';
import * as S from './styles';

const ProductItemSkeleton: React.FC = () => {
  return (
    <S.Container testID="product-item-skeleton">
      <SkeletonLoader width={80} height={80} borderRadius={4} />
      <S.ContentArea>
        <SkeletonLoader width="80%" height={16} />
        <SkeletonLoader width="60%" height={14} style={{ marginTop: 10 }} />
      </S.ContentArea>
      <S.PriceArea>
        <SkeletonLoader width={70} height={14} />
      </S.PriceArea>
    </S.Container>
  );
};

export default ProductItemSkeleton;
