import Styled from 'styled-components/native';

export const Container = Styled.Pressable`
  padding: 4px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 4px;
  flex-direction: row;
  margin: 4px 0;
`;

export const TitleRating = Styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  gap: 10px;
  padding: 0 8px;
`;

export const Title = Styled.Text`
  font-weight: 400;
  font-size: 16px;
`;

export const Rating = Styled.Text`
  color: #6e6e6e;
  font-weight: 800;
`;

export const PriceContainer = Styled.View`
  align-items: center;
  gap: 4px;
`;

export const Price = Styled.Text`
  font-weight: 800;
  width: 90px;
  font-size: 14px;
  text-align: center;
`;

export const Thumbnail = Styled.Image.attrs(() => ({
  resizeMode: 'cover',
}))`
  width: 80px;
  height: 80px;
`;
