import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import OptimizedImage from '../src/components/OptimizedImage';

// Mock react-native-fast-image
jest.mock('react-native-fast-image', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: React.forwardRef((props: any, ref: any) => {
      const { onLoadStart, onLoad, onError, testID } = props;
      
      // Simulate image loading lifecycle
      React.useEffect(() => {
        if (onLoadStart) onLoadStart();
        
        // Simulate successful load after a short delay
        const timer = setTimeout(() => {
          if (props.source.uri.includes('error')) {
            if (onError) onError();
          } else {
            if (onLoad) onLoad();
          }
        }, 10);
        
        return () => clearTimeout(timer);
      }, [props.source.uri]);
      
      return React.createElement('Image', { ...props, ref, testID });
    }),
    resizeMode: {
      contain: 'contain',
      cover: 'cover',
      stretch: 'stretch',
      center: 'center',
    },
    priority: {
      low: 'low',
      normal: 'normal',
      high: 'high',
    },
    cacheControl: {
      immutable: 'immutable',
      web: 'web',
      cacheOnly: 'cacheOnly',
    },
  };
});

describe('OptimizedImage', () => {
  it('renders correctly with required props', () => {
    const { getByTestID } = render(
      <OptimizedImage uri="https://example.com/image.jpg" />
    );
    
    expect(getByTestID('optimized-image')).toBeTruthy();
    expect(getByTestID('optimized-image-image')).toBeTruthy();
  });

  it('shows loading placeholder initially', () => {
    const { getByTestID } = render(
      <OptimizedImage uri="https://example.com/image.jpg" />
    );
    
    expect(getByTestID('optimized-image-placeholder')).toBeTruthy();
    expect(getByTestID('optimized-image-loader')).toBeTruthy();
  });

  it('hides loading placeholder after image loads', async () => {
    const { getByTestID, queryByTestID } = render(
      <OptimizedImage uri="https://example.com/image.jpg" />
    );
    
    // Initially shows placeholder
    expect(getByTestID('optimized-image-placeholder')).toBeTruthy();
    
    // Wait for image to load
    await waitFor(() => {
      expect(queryByTestID('optimized-image-placeholder')).toBeNull();
    }, { timeout: 500 });
  });

  it('shows error state when image fails to load and no fallback', async () => {
    const { getByTestID } = render(
      <OptimizedImage uri="https://example.com/error.jpg" />
    );
    
    await waitFor(() => {
      expect(getByTestID('optimized-image-error')).toBeTruthy();
    }, { timeout: 500 });
  });

  it('tries fallback image when main image fails', async () => {
    const fallbackUri = 'https://example.com/fallback.jpg';
    const { queryByTestID } = render(
      <OptimizedImage 
        uri="https://example.com/error.jpg"
        fallbackUri={fallbackUri}
      />
    );
    
    // Wait for error and fallback attempt
    await waitFor(() => {
      // Should show placeholder while loading fallback
      expect(queryByTestID('optimized-image-placeholder')).toBeTruthy();
    }, { timeout: 500 });
  });

  it('hides placeholder when showPlaceholder is false', () => {
    const { queryByTestID } = render(
      <OptimizedImage 
        uri="https://example.com/image.jpg"
        showPlaceholder={false}
      />
    );
    
    expect(queryByTestID('optimized-image-placeholder')).toBeNull();
  });

  it('uses custom testID when provided', () => {
    const { getByTestID } = render(
      <OptimizedImage 
        uri="https://example.com/image.jpg"
        testID="custom-image"
      />
    );
    
    expect(getByTestID('custom-image')).toBeTruthy();
    expect(getByTestID('custom-image-image')).toBeTruthy();
  });

  it('passes style prop correctly', () => {
    const customStyle = { width: 200, height: 200 };
    const { getByTestID } = render(
      <OptimizedImage 
        uri="https://example.com/image.jpg"
        style={customStyle}
      />
    );
    
    const container = getByTestID('optimized-image');
    expect(container.props.style).toEqual(customStyle);
  });

  it('applies correct default resize mode', () => {
    const { getByTestID } = render(
      <OptimizedImage uri="https://example.com/image.jpg" />
    );
    
    const image = getByTestID('optimized-image-image');
    expect(image.props.resizeMode).toBe('cover');
  });

  it('allows custom resize mode', () => {
    const { getByTestID } = render(
      <OptimizedImage 
        uri="https://example.com/image.jpg"
        resizeMode="contain"
      />
    );
    
    const image = getByTestID('optimized-image-image');
    expect(image.props.resizeMode).toBe('contain');
  });

  it('sets cache control to immutable', () => {
    const { getByTestID } = render(
      <OptimizedImage uri="https://example.com/image.jpg" />
    );
    
    const image = getByTestID('optimized-image-image');
    expect(image.props.source.cache).toBe('immutable');
  });

  it('uses normal priority by default', () => {
    const { getByTestID } = render(
      <OptimizedImage uri="https://example.com/image.jpg" />
    );
    
    const image = getByTestID('optimized-image-image');
    expect(image.props.source.priority).toBe('normal');
  });
});
