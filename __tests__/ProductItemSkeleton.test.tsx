import React from 'react';
import { render } from '@testing-library/react-native';
import ProductItemSkeleton from '../src/components/ProductItemSkeleton';

describe('ProductItemSkeleton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ProductItemSkeleton />);
    expect(getByTestId('product-item-skeleton')).toBeTruthy();
  });

  it('renders all skeleton elements', () => {
    const { getAllByTestId } = render(<ProductItemSkeleton />);
    const skeletons = getAllByTestId('skeleton-loader');
    expect(skeletons.length).toBe(3); // thumbnail, title, price
  });

  it('matches the layout structure', () => {
    const { getByTestId } = render(<ProductItemSkeleton />);
    const container = getByTestId('product-item-skeleton');
    expect(container).toBeTruthy();
    expect(container.props.testID).toBe('product-item-skeleton');
  });
});
