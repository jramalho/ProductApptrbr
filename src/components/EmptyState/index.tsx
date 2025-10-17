import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as S from './styles';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  testID?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📦',
  title,
  message,
  actionText,
  onAction,
  testID = 'empty-state',
}) => {
  return (
    <S.Container testID={testID}>
      <S.IconText>{icon}</S.IconText>
      <S.Title>{title}</S.Title>
      <S.Message>{message}</S.Message>
      {actionText && onAction && (
        <S.ActionButton onPress={onAction} testID={`${testID}-action-button`}>
          <S.ActionButtonText>{actionText}</S.ActionButtonText>
        </S.ActionButton>
      )}
    </S.Container>
  );
};

export default EmptyState;
