import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 10px;
  flex: 1;
  gap: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  gap: 10px;
  background-color: #ffffff;
`;

export const HeaderInfo = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Body = styled.View`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  gap: 20px;
  background-color: #ffffff;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  gap: 10px;
  background-color: #ffffff;
`;
