import Styled from 'styled-components/native';

export const Container = Styled.View`
  padding: 10px;
  flex: 1;
  gap: 10px;
`;

export const Loading = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Header = Styled.View`
  flex-direction: row;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 8px;
  gap: 10px;
`;

export const HeaderInfomation = Styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const PriceRow = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Thumbnail = Styled.Image`
  width: 100px;
  height: 100px;
`;

export const Title = Styled.Text`
  font-size: 18px;
`;

export const Rating = Styled.Text`
  font-size: 16px;
`;

export const Price = Styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const Body = Styled.View`
  flex: 1;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 8px;
  gap: 20px;
`;

export const Label = Styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Value = Styled.Text`
  font-size: 18px;
  font-weight: 400;
`;

export const Footer = Styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 10px;
  gap: 10px;
`;

