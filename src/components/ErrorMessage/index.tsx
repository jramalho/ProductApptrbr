import React from 'react';
import * as S from './styles';

interface ErrorMessageProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  icon?: string;
  testID?: string;
}

/**
 * Reusable error message component with consistent styling
 * Used for displaying errors throughout the app
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  actionText,
  onAction,
  icon = '⚠️',
  testID = 'error-message',
}) => {
  return (
    <S.Container testID={testID}>
      <S.Icon>{icon}</S.Icon>
      <S.Title>{title}</S.Title>
      <S.Message>{message}</S.Message>
      {actionText && onAction && (
        <S.ActionButton onPress={onAction} testID={`${testID}-action`}>
          <S.ActionText>{actionText}</S.ActionText>
        </S.ActionButton>
      )}
    </S.Container>
  );
};

export default ErrorMessage;
