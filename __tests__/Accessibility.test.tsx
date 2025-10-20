import React from 'react';
import { render } from '@testing-library/react-native';
import ProductItem from '../src/components/ProductItem';
import SortButton from '../src/components/SortButton';

describe('Accessibility Features', () => {
  describe('ProductItem Accessibility', () => {
    const mockAction = jest.fn();
    const defaultProps = {
      title: 'Test Product',
      price: 99.99,
      rating: 4.5,
      thumbnail: 'https://example.com/image.jpg',
      action: mockAction,
    };

    it('should have proper accessibility role for the container', () => {
      const { getByRole } = render(<ProductItem {...defaultProps} />);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should have descriptive accessibility label combining all product info', () => {
      const { getByLabelText } = render(<ProductItem {...defaultProps} />);
      expect(getByLabelText(/Test Product, priced at \$99\.99, rating 4\.5 out of 5/)).toBeTruthy();
    });

    it('should have accessibility hint for user guidance', () => {
      const { getByA11yHint } = render(<ProductItem {...defaultProps} />);
      expect(getByA11yHint('Double tap to view product details')).toBeTruthy();
    });

    it('should have proper accessibility role for product image', () => {
      const { getByLabelText } = render(<ProductItem {...defaultProps} />);
      expect(getByLabelText('Test Product product image')).toBeTruthy();
    });

    it('should format price correctly in accessibility label', () => {
      const { getByLabelText } = render(
        <ProductItem {...defaultProps} price={10.5} />
      );
      expect(getByLabelText(/priced at \$10\.50/)).toBeTruthy();
    });

    it('should describe rating in accessible format', () => {
      const { getByLabelText } = render(<ProductItem {...defaultProps} />);
      expect(getByLabelText('4.5 out of 5 stars')).toBeTruthy();
    });

    it('should make the container accessible with all required props', () => {
      const { getByRole } = render(<ProductItem {...defaultProps} />);
      const container = getByRole('button');
      
      expect(container).toBeTruthy();
      expect(container.props.accessible).toBe(true);
    });
  });

  describe('SortButton Accessibility', () => {
    const mockAction = jest.fn();
    const defaultProps = {
      name: 'Price',
      icon: 'arrow-up',
      active: false,
      action: mockAction,
    };

    it('should have proper accessibility role', () => {
      const { getByRole } = render(<SortButton {...defaultProps} />);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should have descriptive accessibility label', () => {
      const { getByLabelText } = render(<SortButton {...defaultProps} />);
      expect(getByLabelText('Sort by Price')).toBeTruthy();
    });

    it('should have appropriate accessibility hint when inactive', () => {
      const { getByA11yHint } = render(<SortButton {...defaultProps} />);
      expect(getByA11yHint('Double tap to sort by Price')).toBeTruthy();
    });

    it('should have appropriate accessibility hint when active', () => {
      const { getByA11yHint } = render(
        <SortButton {...defaultProps} active={true} />
      );
      expect(getByA11yHint('Currently sorting by Price. Double tap to remove sorting.')).toBeTruthy();
    });

    it('should have accessibility state indicating selection status', () => {
      const { getByRole } = render(<SortButton {...defaultProps} active={true} />);
      const button = getByRole('button');
      
      expect(button.props.accessibilityState).toEqual({ selected: true });
    });

    it('should have accessibility state false when not active', () => {
      const { getByRole } = render(<SortButton {...defaultProps} active={false} />);
      const button = getByRole('button');
      
      expect(button.props.accessibilityState).toEqual({ selected: false });
    });

    it('should hide child text from accessibility tree to avoid duplication', () => {
      const { getByText } = render(<SortButton {...defaultProps} />);
      const textElement = getByText('Price');
      
      expect(textElement.props.importantForAccessibility).toBe('no-hide-descendants');
    });
  });

  describe('Screen Reader Compatibility', () => {
    it('ProductItem should work with TalkBack/VoiceOver', () => {
      const mockAction = jest.fn();
      const { getByRole } = render(
        <ProductItem
          title="Accessible Product"
          price={49.99}
          rating={4.2}
          thumbnail="https://example.com/img.jpg"
          action={mockAction}
        />
      );

      const button = getByRole('button');
      expect(button.props.accessible).toBe(true);
      expect(button.props.accessibilityRole).toBe('button');
      expect(button.props.accessibilityLabel).toContain('Accessible Product');
      expect(button.props.accessibilityLabel).toContain('$49.99');
      expect(button.props.accessibilityLabel).toContain('4.2');
    });

    it('SortButton should work with TalkBack/VoiceOver', () => {
      const mockAction = jest.fn();
      const { getByRole } = render(
        <SortButton
          name="Rating"
          icon="star"
          active={false}
          action={mockAction}
        />
      );

      const button = getByRole('button');
      expect(button.props.accessible).toBe(true);
      expect(button.props.accessibilityRole).toBe('button');
      expect(button.props.accessibilityLabel).toBe('Sort by Rating');
      expect(button.props.accessibilityHint).toContain('Double tap');
    });
  });

  describe('Accessibility Props Validation', () => {
    it('ProductItem should have all required accessibility props', () => {
      const mockAction = jest.fn();
      const { getByRole } = render(
        <ProductItem
          title="Test"
          price={10}
          rating={5}
          thumbnail="img.jpg"
          action={mockAction}
        />
      );

      const container = getByRole('button');
      expect(container.props).toHaveProperty('accessible');
      expect(container.props).toHaveProperty('accessibilityRole');
      expect(container.props).toHaveProperty('accessibilityLabel');
      expect(container.props).toHaveProperty('accessibilityHint');
    });

    it('SortButton should have all required accessibility props', () => {
      const mockAction = jest.fn();
      const { getByRole } = render(
        <SortButton
          name="Test"
          icon="arrow-up"
          active={false}
          action={mockAction}
        />
      );

      const button = getByRole('button');
      expect(button.props).toHaveProperty('accessible');
      expect(button.props).toHaveProperty('accessibilityRole');
      expect(button.props).toHaveProperty('accessibilityLabel');
      expect(button.props).toHaveProperty('accessibilityHint');
      expect(button.props).toHaveProperty('accessibilityState');
    });
  });
});
