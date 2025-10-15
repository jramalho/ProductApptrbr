import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import styled from 'styled-components/native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  testID?: string;
  size?: number;
  color?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  testID,
  size = 24,
  color = '#ff6b6b',
}) => {
  return (
    <StyledTouchable onPress={onPress} testID={testID} activeOpacity={0.7}>
      <FontAwesome6
        name="heart"
        iconStyle={isFavorite ? 'solid' : 'regular'}
        size={size}
        color={color}
      />
    </StyledTouchable>
  );
};

const StyledTouchable = styled(TouchableOpacity)`
  padding: 8px;
`;

export default FavoriteButton;
