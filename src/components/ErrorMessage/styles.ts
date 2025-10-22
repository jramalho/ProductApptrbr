import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #fff;
`;

export const Icon = styled.Text`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

export const Message = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 24px;
  line-height: 20px;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: #007AFF;
  padding-horizontal: 32px;
  padding-vertical: 12px;
  border-radius: 8px;
`;

export const ActionText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
