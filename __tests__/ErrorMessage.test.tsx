import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorMessage from '../src/components/ErrorMessage';

describe('ErrorMessage component', () => {
  it('should render with required props', () => {
    const { getByText, getByTestId } = render(
      <ErrorMessage
        title="Error Title"
        message="Error message text"
      />
    );

    expect(getByText('Error Title')).toBeTruthy();
    expect(getByText('Error message text')).toBeTruthy();
    expect(getByTestId('error-message')).toBeTruthy();
  });

  it('should render with custom icon', () => {
    const { getByText } = render(
      <ErrorMessage
        title="Error"
        message="Message"
        icon="❌"
      />
    );

    expect(getByText('❌')).toBeTruthy();
  });

  it('should render default icon when not provided', () => {
    const { getByText } = render(
      <ErrorMessage
        title="Error"
        message="Message"
      />
    );

    expect(getByText('⚠️')).toBeTruthy();
  });

  it('should render action button when actionText and onAction provided', () => {
    const mockAction = jest.fn();
    const { getByText } = render(
      <ErrorMessage
        title="Error"
        message="Message"
        actionText="Retry"
        onAction={mockAction}
      />
    );

    expect(getByText('Retry')).toBeTruthy();
  });

  it('should call onAction when action button is pressed', () => {
    const mockAction = jest.fn();
    const { getByText } = render(
      <ErrorMessage
        title="Error"
        message="Message"
        actionText="Retry"
        onAction={mockAction}
      />
    );

    const button = getByText('Retry');
    fireEvent.press(button);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('should not render action button when actionText is missing', () => {
    const mockAction = jest.fn();
    const { queryByText } = render(
      <ErrorMessage
        title="Error"
        message="Message"
        onAction={mockAction}
      />
    );

    expect(queryByText('Retry')).toBeNull();
  });

  it('should not render action button when onAction is missing', () => {
    const { queryByText } = render(
      <ErrorMessage
        title="Error"
        message="Message"
        actionText="Retry"
      />
    );

    expect(queryByText('Retry')).toBeNull();
  });

  it('should use custom testID', () => {
    const { getByTestId } = render(
      <ErrorMessage
        title="Error"
        message="Message"
        testID="custom-error"
      />
    );

    expect(getByTestId('custom-error')).toBeTruthy();
  });

  it('should set correct testID on action button', () => {
    const mockAction = jest.fn();
    const { getByTestId } = render(
      <ErrorMessage
        title="Error"
        message="Message"
        actionText="Retry"
        onAction={mockAction}
        testID="custom-error"
      />
    );

    expect(getByTestId('custom-error-action')).toBeTruthy();
  });
});
