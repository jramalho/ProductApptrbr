import React from 'react';
import SkeletonLoader from '../SkeletonLoader';
import * as S from './styles';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <S.Container testID="product-detail-skeleton">
      <S.Header>
        <SkeletonLoader width={100} height={100} borderRadius={8} />
        <S.HeaderInfo>
          <SkeletonLoader width="80%" height={18} />
          <SkeletonLoader width="50%" height={16} style={{ marginTop: 10 }} />
          <SkeletonLoader width="40%" height={16} style={{ marginTop: 10 }} />
        </S.HeaderInfo>
      </S.Header>
      <S.Body>
        <SkeletonLoader width="30%" height={18} />
        <SkeletonLoader width="100%" height={16} style={{ marginTop: 10 }} />
        <SkeletonLoader width="90%" height={16} style={{ marginTop: 5 }} />
        <SkeletonLoader width="40%" height={18} style={{ marginTop: 20 }} />
      </S.Body>
      <S.Footer>
        <SkeletonLoader width={150} height={18} />
      </S.Footer>
    </S.Container>
  );
};

export default ProductDetailSkeleton;
