import React from 'react';
import { render } from '@testing-library/react-native';
import SkeletonLoader from '../src/components/SkeletonLoader';

describe('SkeletonLoader', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<SkeletonLoader />);
    expect(getByTestId('skeleton-loader')).toBeTruthy();
  });

  it('renders with custom width and height', () => {
    const { getByTestId } = render(
      <SkeletonLoader width={100} height={50} testID="custom-skeleton" />
    );
    const skeleton = getByTestId('custom-skeleton');
    expect(skeleton).toBeTruthy();
    expect(skeleton.props.style).toContainEqual(
      expect.objectContaining({ width: 100, height: 50 })
    );
  });

  it('renders with custom border radius', () => {
    const { getByTestId } = render(
      <SkeletonLoader borderRadius={10} testID="rounded-skeleton" />
    );
    const skeleton = getByTestId('rounded-skeleton');
    expect(skeleton.props.style).toContainEqual(
      expect.objectContaining({ borderRadius: 10 })
    );
  });

  it('applies custom styles', () => {
    const customStyle = { marginTop: 20 };
    const { getByTestId } = render(
      <SkeletonLoader style={customStyle} testID="styled-skeleton" />
    );
    const skeleton = getByTestId('styled-skeleton');
    expect(skeleton.props.style).toContainEqual(
      expect.objectContaining(customStyle)
    );
  });

  it('renders with percentage width', () => {
    const { getByTestId } = render(
      <SkeletonLoader width="80%" testID="percentage-skeleton" />
    );
    const skeleton = getByTestId('percentage-skeleton');
    expect(skeleton.props.style).toContainEqual(
      expect.objectContaining({ width: '80%' })
    );
  });
});
