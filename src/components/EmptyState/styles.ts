import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 300px;
`;

export const IconText = styled.Text`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 8px;
`;

export const Message = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 24px;
  line-height: 20px;
  max-width: 300px;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 12px 24px;
  border-radius: 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ActionButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
