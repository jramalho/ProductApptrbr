import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ff6b6b;
  padding: 12px 16px;
  z-index: 9999;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const StatusText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2px;
`;

export const StatusSubtext = styled.Text`
  color: #ffffff;
  font-size: 12px;
  text-align: center;
`;
