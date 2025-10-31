import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import FastImage, { FastImageProps, Priority, ResizeMode } from 'react-native-fast-image';
import * as S from './styles';

interface OptimizedImageProps extends Omit<FastImageProps, 'source'> {
  uri: string;
  fallbackUri?: string;
  resizeMode?: ResizeMode;
  priority?: Priority;
  showPlaceholder?: boolean;
  testID?: string;
}

/**
 * OptimizedImage Component
 * 
 * A wrapper around react-native-fast-image that provides:
 * - Automatic image caching for better performance
 * - Loading placeholder with spinner
 * - Error fallback image support
 * - Progressive image loading
 * - Memory-efficient rendering
 * 
 * @param uri - Image URL to load
 * @param fallbackUri - Optional fallback URL if main image fails
 * @param resizeMode - How to resize the image (default: 'cover')
 * @param priority - Loading priority (default: 'normal')
 * @param showPlaceholder - Show loading placeholder (default: true)
 * @param testID - Test identifier
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  uri,
  fallbackUri,
  resizeMode = FastImage.resizeMode.cover,
  priority = FastImage.priority.normal,
  showPlaceholder = true,
  testID = 'optimized-image',
  style,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentUri, setCurrentUri] = useState<string>(uri);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    
    // Try fallback image if available and not already using it
    if (fallbackUri && currentUri !== fallbackUri) {
      setCurrentUri(fallbackUri);
      setLoading(true);
      setError(false);
    }
  };

  return (
    <View style={style} testID={testID}>
      <FastImage
        {...props}
        style={[style, { width: '100%', height: '100%' }]}
        source={{
          uri: currentUri,
          priority,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onError={handleError}
        testID={`${testID}-image`}
      />
      
      {loading && showPlaceholder && (
        <S.PlaceholderContainer testID={`${testID}-placeholder`}>
          <ActivityIndicator size="small" color="#888" testID={`${testID}-loader`} />
        </S.PlaceholderContainer>
      )}
      
      {error && !fallbackUri && (
        <S.PlaceholderContainer testID={`${testID}-error`}>
          <S.ErrorText>📷</S.ErrorText>
        </S.PlaceholderContainer>
      )}
    </View>
  );
};

export default OptimizedImage;
