import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import * as S from './styles';

/**
 * NetworkStatusIndicator component displays a banner when device is offline
 * The banner automatically appears/disappears with smooth animations
 */
const NetworkStatusIndicator: React.FC = () => {
  const { isConnected, isInternetReachable } = useNetworkStatus();
  const [slideAnim] = useState(new Animated.Value(-100));
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const offline = isConnected === false || isInternetReachable === false;
    
    if (offline !== isOffline) {
      setIsOffline(offline);
      
      Animated.timing(slideAnim, {
        toValue: offline ? 0 : -100,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [isConnected, isInternetReachable]);

  return (
    <S.Container
      style={{
        transform: [{ translateY: slideAnim }],
      }}
      testID="network-status-indicator"
    >
      <S.StatusText>No Internet Connection</S.StatusText>
      <S.StatusSubtext>Please check your connection and try again</S.StatusSubtext>
    </S.Container>
  );
};

export default NetworkStatusIndicator;
