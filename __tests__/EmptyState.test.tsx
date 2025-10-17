import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmptyState from '../src/components/EmptyState';

describe('EmptyState Component', () => {
  it('renders with required props', () => {
    const { getByTestId, getByText } = render(
      <EmptyState
        title="Test Title"
        message="Test Message"
      />
    );

    expect(getByTestId('empty-state')).toBeTruthy();
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Message')).toBeTruthy();
  });

  it('renders with custom icon', () => {
    const { getByText } = render(
      <EmptyState
        icon="🎉"
        title="Test Title"
        message="Test Message"
      />
    );

    expect(getByText('🎉')).toBeTruthy();
  });

  it('renders default icon when no icon provided', () => {
    const { getByText } = render(
      <EmptyState
        title="Test Title"
        message="Test Message"
      />
    );

    expect(getByText('📦')).toBeTruthy();
  });

  it('renders action button when actionText and onAction provided', () => {
    const mockAction = jest.fn();
    const { getByTestId, getByText } = render(
      <EmptyState
        title="Test Title"
        message="Test Message"
        actionText="Click Me"
        onAction={mockAction}
      />
    );

    const actionButton = getByTestId('empty-state-action-button');
    expect(actionButton).toBeTruthy();
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onAction when action button is pressed', () => {
    const mockAction = jest.fn();
    const { getByTestId } = render(
      <EmptyState
        title="Test Title"
        message="Test Message"
        actionText="Click Me"
        onAction={mockAction}
      />
    );

    const actionButton = getByTestId('empty-state-action-button');
    fireEvent.press(actionButton);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when actionText is missing', () => {
    const mockAction = jest.fn();
    const { queryByTestId } = render(
      <EmptyState
        title="Test Title"
        message="Test Message"
        onAction={mockAction}
      />
    );

    const actionButton = queryByTestId('empty-state-action-button');
    expect(actionButton).toBeNull();
  });

  it('does not render action button when onAction is missing', () => {
    const { queryByTestId } = render(
      <EmptyState
        title="Test Title"
        message="Test Message"
        actionText="Click Me"
      />
    );

    const actionButton = queryByTestId('empty-state-action-button');
    expect(actionButton).toBeNull();
  });

  it('renders with custom testID', () => {
    const { getByTestId } = render(
      <EmptyState
        title="Test Title"
        message="Test Message"
        testID="custom-empty-state"
      />
    );

    expect(getByTestId('custom-empty-state')).toBeTruthy();
  });

  it('renders action button with custom testID prefix', () => {
    const mockAction = jest.fn();
    const { getByTestId } = render(
      <EmptyState
        title="Test Title"
        message="Test Message"
        actionText="Click Me"
        onAction={mockAction}
        testID="custom-empty-state"
      />
    );

    expect(getByTestId('custom-empty-state-action-button')).toBeTruthy();
  });
});
