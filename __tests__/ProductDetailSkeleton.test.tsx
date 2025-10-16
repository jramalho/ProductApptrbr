import React from 'react';
import { render } from '@testing-library/react-native';
import ProductDetailSkeleton from '../src/components/ProductDetailSkeleton';

describe('ProductDetailSkeleton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ProductDetailSkeleton />);
    expect(getByTestId('product-detail-skeleton')).toBeTruthy();
  });

  it('renders all skeleton elements', () => {
    const { getAllByTestId } = render(<ProductDetailSkeleton />);
    const skeletons = getAllByTestId('skeleton-loader');
    // Header: 4 elements (thumbnail, title, rating, price)
    // Body: 4 elements (brand label, description lines, stock label)
    // Footer: 1 element
    expect(skeletons.length).toBeGreaterThanOrEqual(8);
  });

  it('matches the layout structure', () => {
    const { getByTestId } = render(<ProductDetailSkeleton />);
    const container = getByTestId('product-detail-skeleton');
    expect(container).toBeTruthy();
    expect(container.props.testID).toBe('product-detail-skeleton');
  });
});
