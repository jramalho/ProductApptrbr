import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 4px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  flex-direction: row;
  margin: 4px 0;
  background-color: #ffffff;
`;

export const ContentArea = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  gap: 10px;
  padding: 0 8px;
`;

export const PriceArea = styled.View`
  width: 90px;
  align-items: flex-end;
`;
