import React from 'react';
import { Container, InfoText, IconText } from './styles';

interface OfflineIndicatorProps {
  isOffline: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOffline }) => {
  if (!isOffline) {
    return null;
  }

  return (
    <Container testID="offline-indicator">
      <IconText>📶</IconText>
      <InfoText>Showing cached data - You're offline</InfoText>
    </Container>
  );
};

export default OfflineIndicator;
