import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: #333;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #666;
  margin-bottom: 12px;
  text-align: center;
`;

export const EmptySubtext = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
  line-height: 24px;
`;
